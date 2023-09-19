import EventEmitter from "./EventEmitter"

class Time extends EventEmitter {
	constructor() {
		super()

		// 开始计时的事件
		this.startTime = Date.now()
		// 当前事件, 初始化为当前时间
		this.currentTime = this.startTime
		// 项目启动到现在流逝的事件
		this.elapsedTime = 0
		// 每一次更新的时间间隔
		this.deltaTime = 0

		/**
		 * window.requestAnimationFrame 是浏览器专门用来流畅执行动画的api，
		 * 以往要流畅实现动画需要setInterval 固定时间间隔实行，但由于JavaScript
		 * 是单线程的，setInterval方法并不可靠，会造成画面卡顿，
		 * 而 window.requestAnimationFrame 是专门为动画开放的底层接口，省掉了这部分担心
		 *
		 * window.requestAnimationFrame 需要循环调用，才能让动画循环播放下去
		 *
		 */
		window.requestAnimationFrame(() => {
			this.tick()
		})
	}

	/**
	 * 每一帧要做的事情都在 tick 函数内完成
	 *
	 * 但要注意 tick 函数内部触发了 "tick" 事件，
	 * 所以由 "tick" 触发的回调函数也会在一帧内完成 
	 *
	 */
	tick() {
		// 每一帧获取新的当前事件
		const currentTime = Date.now()

		// 计算每一帧之间的事件间隔
		this.deltaTime = currentTime - this.currentTime
		this.currentTime = currentTime
		
		// 计算第一帧开始到当前帧的总时长
		this.elapsedTime = this.currentTime - this.startTime

		// 触发 tick 事件, 在 Experience 中有该事件的响应集合
		this.trigger("tick")

		// 循环调用
		window.requestAnimationFrame(() => {
			this.tick()
		})
	}
}

export default Time