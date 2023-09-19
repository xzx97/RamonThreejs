import * as THREE from "three"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import LabelRenderer from "./LabelRenderer"
import Resources from "./Utils/Resources"
import Debug from "./Utils/Debug"
import Sources from "./Sources"
import World from "./World/World"

let instance = null

class Experience {

	/**
	 * 构造函数
	 *
	 * 需要传入 canvas 画布，用于呈现该项目场景
	 *
	 */
	constructor(canvas) {

		/**
		 * 单例模式写法
		 *
		 * 首次调用时，instance 为 null，下面的if语句不会执行，
		 * 而会将类的 this 赋值给 instance . 从此，instance 就不再是 null，
		 * 而是该类的 this 指针。接着开始执行后面的初始化操作
		 *
		 * 以后每次调用，都会因为 instance 不为 null，而只执行 if 语句，就返回。
		 * 不会再执行初始化操作。使得在不同的地方调用时，保证整个项目都只有一个 Experience
		 *
		 * 该方式在项目中被大量使用，因为很多组件是需要保持全局唯一，能够共享访问的。
		 */

		if (instance) {
			return instance
		}
		instance = this

		/**
		 * 加载一系列组件
		 */

		// 渲染的画布，从构造函数传入
		this.canvas = canvas
		// 场景组件，由 Threejs 库生成
		this.scene = new THREE.Scene()
		// 窗口组件
		this.sizes = new Sizes()
		// 相机组件
		this.camera = new Camera(instance)
		// 渲染器组件
		this.renderer = new Renderer(instance)
		// 标签渲染
		this.labelRenderer = new LabelRenderer(instance)
		// 计时组件
		this.time = new Time()
		// Debug 组件
		this.debug = new Debug()
		// 资源列表
		// 资源加载组件
		this.resources = new Resources(Sources)
		// 世界组件，抽象的物体集合概念，所有物体添加到 World 中
		this.world = new World(instance)

		/**
		 * 监听 resize 事件，由 Size 类监听
		 * windows.addEventListener("resize") 时触发
		 */
		// 监听 resize 事件
		this.sizes.on("resize", () => {
			this.resize()
		})

		/**
		 * 监听 tick 事件，由 Time 类调用
		 * window.requestAnimationFrame 时触发
		 */ 
		this.time.on("tick", () =>{
			this.update()
		})
	}

	/**
	 * resize 事件相应函数
	 *
	 * 每次窗口 resize , Camera 和 Renderer 也需要相应 resize
	 */
	resize() {
		this.camera.resize()
		this.renderer.resize()
		this.labelRenderer.resize()
	}

	/**
	 * 每一帧需要 update 的内容
	 *
	 * Camera、Renderer 和 World 都需要相应 Update 
	 */
	update() {
		this.camera.update()
		this.renderer.update()
		this.labelRenderer.update()
		this.world.update()
	}
}

export default Experience