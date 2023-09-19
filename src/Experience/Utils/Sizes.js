import EventEmitter from "./EventEmitter"

/**
 * Name: 画面大小组件
 *
 * Usages: 
 * 用于提供画面大小信息和窗口调整函数
 * 因为浏览器窗口大小调整后，Camera 和 Renderer 组件也要相应调整，
 * 所以该类在窗口调整后能触发事件，让 Camera 和 Renderer 也调整
 */
class Sizes extends EventEmitter{
	constructor() {

		// 初始化父类，EventEmitter
		super()

		// 根据窗口信息赋值 width、height 和 pixelRatio
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)

		// 监听窗口 resize 事件
		window.addEventListener("resize", () => {

			// 每次 resize 后重新赋值宽高值和像素值
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.pixelRatio = Math.min(window.devicePixelRatio, 2)

			// 发布 resize 事件，
			// 因为 Camera 和 Renderer 都需要随着窗口大小变化而调整
			// 在 Experience 中有该事件的相应集合
			this.trigger("resize")

		})

	}
}

export default Sizes