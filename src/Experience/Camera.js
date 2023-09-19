import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// 单例变量
let instance = null

/**
 * 相机组件 和 控制器组件
 *
 * 其中 OrbitControls 就是通过键鼠控制相机，从而实现对场景进行
 * 平移、旋转和缩放操作的，所以将相机和控制器放在一起
 */
class Camera {
	constructor(experience) {

		// 单例模式
		if (instance) {
			return this
		}
		instance = this

		/**
		 * instance 和 controls 是相机和控制器实例
		 * 分别在 setInstance 和 setControls 中才赋值
		 *
		 * 要注意的是这里的 this.instance 和 instance 的区别
		 * this.instance 是相机实例，而 instance 是单例模式的全局变量
		 * 命名上看起来有冲突，但单例模式全局变量的instance是不对外暴露的，
		 * 在使用上不会有冲突
		 */
		this.instance = null
		this.controls = null

		/**
		 * 绑定 Experience 项目
		 */
		this.bindExperience(experience)

		// 相机与控制器初始化
		this.setInstance()
		this.setControls()
	}

	// 相机初始化要绑定的组件
	bindExperience(experience) {
		this.experience = experience
		this.canvas = this.experience.canvas
		this.scene = this.experience.scene
		this.sizes = this.experience.sizes
	}

	/**
	 * 相机初始化函数
	 */
	setInstance() {

		// 初始化相机
		this.instance = new THREE.PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			1000
		)

		// 设置相机位置
		this.instance.position.set(10, 10, 10)

		// 将相机加入场景
		this.scene.add(this.instance)

	}

	/**
	 * 控制器初始化
	 */
	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		
		// 允许阻尼，可以理解为拖拽操作的惯性，
		// 开启后拖拽视角会相对丝滑，带一点惯性
		this.controls.enableDamping = true
	}

	/**
	 * 每次窗口 resize，Camera 需要更新的内容
	 */
	resize() {
		// 更新相机的长宽比
		this.instance.aspect = this.sizes.width / this.sizes.height
		
		// 更新相机的投影矩阵
		this.instance.updateProjectionMatrix()
	}

	/*
	 * 每次渲染，控制器都需要更新
	 */
	update() {
		this.controls.update()
	}

}

export default Camera