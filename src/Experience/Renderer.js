import * as THREE from "three"

/**
 * 渲染器组件
 */
class Renderer {
	constructor(experience) {

		// 渲染器实例
		this.instance = null

		this.bindExperience(experience)

		this.setInstance()
	}

	// 设置 Renderer 需要的组件和信息
	bindExperience(experience) {
		this.experience = experience
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera

	}

	/**
	 * 初始化渲染器实例
	 */
	setInstance() {
		/**
		 * 渲染器初始化
		 * canvas: 渲染的画布
		 * antialias: 抗锯齿
		 */
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		})

		/**
		 * 渲染器大小和像素设置
		 */
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(this.sizes.pixelRatio)

	}

	/**
	 * 窗口 resize 后，也要更新 Renderer 的 Size 和 PixelRatio
	 */
	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(this.sizes.pixelRatio)
	}

	/**
	 * 更新渲染，每一帧更新都要执行该函数对画面进行渲染
	 */
	update() {
		this.instance.render(this.scene, this.camera.instance)
	}
}

export default Renderer