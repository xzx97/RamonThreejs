import * as THREE from "three"
import Experience from "../Experience"
import AxesHelper from "../Utils/AxesHelper"
import Environments from "./Environments"
import InfoPanel from "./InfoPanel"
import Base from "./Base"
import Huoqie from "./Huoqie"
import LiftingDevice from "./LiftingDevice"
import Billets from "./Billets"
import Message from "./Message"

// 单例模式变量
var instance = null

/**
 * World 是整个物体世界的集合，所有物体都应该在 World 创建，
 * 由 World 去管理、驱动他们。
 * 
 * Experience 项目不直接与物体打交道，而是只引用 World，
 * 来生成环境、物体等元素
 */
export default class World {
	constructor(experience) {

		// 单例模式
		if (instance) {
			return instance
		}
		instance = this

		// 绑定 Experience 项目
		this.bindExperience(experience)
		this.setGlobalClippingPlane()

		this.msg = new Message()

		// 添加环境
		this.environments = new Environments()

		// 模型集合，World 中的所有模型都放在 models 里面
		this.models = {}

		this.models["Base"] = new Base()
		this.models["Huoqie"] = new Huoqie()
		this.models["LiftingDevice"] = new LiftingDevice()
		// 资源加载完成后，开始生成 World 中的物体
		this.resources.on("sourceReady", (name) => {
			if (this.models["Base"].modelList.includes(name)) {
				this.models["Base"].loadModel(name)
			}
			if (this.models["Huoqie"].modelList.includes(name)) {
				this.models["Huoqie"].loadModel(name)
			}
			if (this.models["LiftingDevice"].modelList.includes(name)) {
				this.models["LiftingDevice"].loadModel(name)
			}
		})

		// 加载钢坯
		// 1 流钢坯
		var billet1 = new Billets()
		this.models["Billet1"] = billet1

		// 2 流钢坯
		var billet2 = new Billets()
		billet2.setPos(-20, 4.5, 8.7)
		this.models["Billet2"] = billet2

		// 添加坐标轴
		this.axeshelper = new AxesHelper(3)
		this.scene.add(this.axeshelper)

		if (this.debug.active) {
			this.setDebug()
		}

		// mqtt 消息响应
		this.msg.on("movement", (e) => {
			this.mqttResponse(e)
		})
	}

	/**
	 * 绑定 Experience 项目
	 * @param {Experience} experience 
	 */
	bindExperience(experience) {
		this.experience = experience
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.renderer = this.experience.renderer
	}

	// 解析 MQTT 消息并进行相应动作
	mqttResponse(msg) {
		// console.log(msg)
		// 判断要控制的设备 -> 执行对应的指令

		// lift1 -> 1流1切
		if (msg.data["dev"] == "Lift1") {
			if ( msg.data["signal"] == "up" ) {
				this.models["LiftingDevice"].moveUp(this.models["LiftingDevice"].Lift1)
			} else if (msg.data["signal"] == "down") {
				this.models["LiftingDevice"].moveDown(this.models["LiftingDevice"].Lift1)
			}
		}
		// lift2 -> 2流1切
		if (msg.data["dev"] == "Lift2") {
			if ( msg.data["signal"] == "up" ) {
				this.models["LiftingDevice"].moveUp(this.models["LiftingDevice"].Lift2)
			} else if (msg.data["signal"] == "down") {
				this.models["LiftingDevice"].moveDown(this.models["LiftingDevice"].Lift2)
			}
		}

		if (msg.data["dev"] == "Huoqie1") {
			if (msg.data["signal"] == "move") {
				this.models["Huoqie"].move("1", msg.data["relativePos"])
			}
			if (msg.data["signal"] == "cutDone") {
				// 获取火切机位置
				var huoqiePosX = this.models["Huoqie"].models["Huoqie1"].position.x
				this.models["Billet1"].cutDone(huoqiePosX)
				// 火切机回退
				this.models["Huoqie"].moveAnimation1.clear()
				this.models["Huoqie"].move("1", 0);
			}
		}

		// 2流暂未放钢坯，切割指令需要之后测试
		if (msg.data["dev"] == "Huoqie2") {
			if (msg.data["signal"] == "move") {
				this.models["Huoqie"].move("2", msg.data["relativePos"])
			}
			if (msg.data["signal"] == "cutDone") {
				// 获取火切机位置
				var huoqiePosX = this.models["Huoqie"].models["Huoqie2"].position.x
				this.models["Billet2"].cutDone(huoqiePosX)
				// 火切机回退
				this.models["Huoqie"].moveAnimation2.clear()
				this.models["Huoqie"].move("2", 0);
			}
		}

		if (msg.data["dev"] == "Billet1") {
			if (msg.data["signal"] == "run") {
				this.models["Billet1"].moveTimeline.play()
			} else if (msg.data["signal"] == "pause") {
				this.models["Billet1"].moveTimeline.pause()
			}
		} else if (msg.data["dev"] == "Billet2") {
			if (msg.data["signal"] == "run") {
				this.models["Billet2"].moveTimeline.play()
			} else if (msg.data["signal"] == "pause") {
				this.models["Billet2"].moveTimeline.pause()
			}
		}
	}

	/**
	 * 设置 Debug 面板，在网址后添加 "/#debug" 即可开启
	 * 网页右上角的 debug 面板。
	 * 
	 * 函数中给面板添加了2个可折叠文件夹，control 和  material
	 * 分别用来调整动画开关和辊道线框颜色
	 */
	setDebug() {
		// this.debug.debugObject["Animate"] = false
		var Liu1Folder = this.debug.ui.addFolder("第一流")
		this.debug.debugObject["1liu"] = {}

		var Liu2Folder = this.debug.ui.addFolder("第二流")
		this.debug.debugObject["2liu"] = {}

		/**
		 * 升降装置动画
		 */
		this.debug.debugObject["1liu"]["Lift1"] = false
		this.debug.debugObject["2liu"]["Lift2"] = false

		Liu1Folder.add(this.debug.debugObject["1liu"], "Lift1")
		.onFinishChange(()=> {
			if (this.debug.debugObject["1liu"]["Lift1"]) {
				this.models["LiftingDevice"].moveUp(this.models["LiftingDevice"].Lift1)
			} else {
				this.models["LiftingDevice"].moveDown(this.models["LiftingDevice"].Lift1)
			}
		})

		Liu2Folder.add(this.debug.debugObject["2liu"], "Lift2")
		.onFinishChange(()=> {
			if (this.debug.debugObject["2liu"]["Lift2"]) {
				this.models["LiftingDevice"].moveUp(this.models["LiftingDevice"].Lift2)
			} else {
				this.models["LiftingDevice"].moveDown(this.models["LiftingDevice"].Lift2)
			}
		})
		
		/**
		 * 火切机动画
		 */
		this.debug.debugObject["1liu"]["Huoqie1"] = 0
		this.debug.debugObject["2liu"]["Huoqie2"] = 0

		// 1流1切
		Liu1Folder
		.add(this.debug.debugObject["1liu"], "Huoqie1")
		.min(0)
		.onFinishChange(() => {
			this.models["Huoqie"].move("1", this.debug.debugObject["1liu"]["Huoqie1"])
		})

		// 2流1切
		Liu2Folder
		.add(this.debug.debugObject["2liu"], "Huoqie2")
		.min(0)
		.onFinishChange(() => {
			this.models["Huoqie"].move("2", this.debug.debugObject["2liu"]["Huoqie2"])
		})

		// 1流钢坯运动
		this.debug.debugObject["1liu"]["billetMove"] = false
		Liu1Folder
		.add(this.debug.debugObject["1liu"], "billetMove")
		.onFinishChange(() => {
			// billetMove 为 true 时，钢坯向前运动
			if (this.debug.debugObject["1liu"]["billetMove"]) {
				this.models["Billet1"].moveTimeline.play()
			// billetMove 为 false 时，钢坯停止运动
			} else {
				this.models["Billet1"].moveTimeline.pause()
			}
		})
		// 2流钢坯运动
		this.debug.debugObject["2liu"]["billetMove"] = false
		Liu2Folder
		.add(this.debug.debugObject["2liu"], "billetMove")
		.onFinishChange(() => {
			// billetMove 为 true 时，钢坯向前运动
			if (this.debug.debugObject["2liu"]["billetMove"]) {
				this.models["Billet2"].moveTimeline.play()
			// billetMove 为 false 时，钢坯停止运动
			} else {
				this.models["Billet2"].moveTimeline.pause()
			}
		})

		// 1流切割完成
		this.debug.debugObject["1liu"]["cutDone1"] = false
		Liu1Folder
		.add(this.debug.debugObject["1liu"], "cutDone1")
		.onFinishChange(() => {
			// 若 "cutDone" 信号勾选，则调用 Billets 类中的 cutDone() 函数
			if (this.debug.debugObject["1liu"]["cutDone1"]) {
				// 调用 Billets 的 cutDone 函数，进行切割，长钢坯回退，生成新钢坯并加速往前
				var huoqiePosX = this.models["Huoqie"].models["Huoqie1"].position.x
				this.models["Billet1"].cutDone(huoqiePosX)
				// 火切机回退
				this.models["Huoqie"].moveAnimation1.clear()
				this.models["Huoqie"].move("1", 0);
				// this.models["Huoqie"].endCut(this.models["Huoqie"].models["Huoqie2"])
				// 火切机前进切割动画回退
			}
		})

		// 2流切割完成
		this.debug.debugObject["2liu"]["cutDone2"] = false
		Liu2Folder
		.add(this.debug.debugObject["2liu"], "cutDone2")
		.onFinishChange(() => {
			// 若 "cutDone" 信号勾选，则调用 Billets 类中的 cutDone() 函数
			if (this.debug.debugObject["2liu"]["cutDone2"]) {
				// 调用 Billets 的 cutDone 函数，进行切割，长钢坯回退，生成新钢坯并加速往前
				var huoqiePosX = this.models["Huoqie"].models["Huoqie2"].position.x
				this.models["Billet2"].cutDone(huoqiePosX)
				// 火切机回退
				this.models["Huoqie"].moveAnimation2.clear()
				this.models["Huoqie"].move("2", 0);
				// this.models["Huoqie"].endCut(this.models["Huoqie"].models["Huoqie2"])
				// 火切机前进切割动画回退
			}
		})

	}

	// autoRun() {
	// 	this.models["Billet1"].moveTimeline.play()
	// }

	/**
	 * 设置全局的 clipping 平面
	 * 
	 * 平面正方向为可见区域，负方向不可见。
	 * 在此处用于实现钢坯源头源源不断的效果，实际上是有限长度的钢坯，
	 * 切割过后，将位置回退，生成新钢坯作为别切割的部分快速往前
	 */
	setGlobalClippingPlane() {
		/**
		 * 确定平面位置和正方向，如何准确确定平面与切割方向 -- 空间几何中平面相关内容
		 * 简单来说，空间平面方程一般式 Ax + By + Cz + D = 0，
		 * 向量 {A, B, C} 是平面的单位法向量，作为下面函数 Vector3(A,B,C) 的参数，
		 * D 对应下面 THREE.Plane() 函数的第二个参数 20
		 */
		this.globalPlane = [new THREE.Plane(new THREE.Vector3(1, 0, 0), 20)]
		this.renderer.instance.clippingPlanes = this.globalPlane
		this.renderer.instance.localClippingEnabled = true
	}

	/**
	 * World.update() 会在 Experience.update 中调用，
	 * 每一帧都会执行 update 函数，我们把由 mesh.position 
	 * 或 mesh.rotation 实现的动画逻辑在 update() 中调用
	 * 
	 * 但若是 gsap 动画就不需要放在 update 中更新，因为 gsap 动画会自动
	 * 每一帧都执行。gsap只需要触发并规定动画持续时间即可，不需写在update中
	 * 手动刷新每一帧。
	 */

	update() {
	}
}
