import gsap from "gsap";

class WeatherIconTicker {
	constructor() {
		if (WeatherIconTicker.instance) {
			return WeatherIconTicker.instance
		}

		WeatherIconTicker.instance = this

		this.fps = 60
		this.fpsInterval = 1000 / this.fps
		this.maxDelta = 1.2
		this.updates = new Set()
		this.listener = this.update.bind(this)
		this.active = true
		this.init()
	}

	init() {
		gsap.ticker.add(this.listener)
	}

	destroy() {
		gsap.ticker.remove(this.listener)
	}

	start() {
		this.active = true
	}

	stop() {
		this.active = false
	}

	add(fn) {
		this.updates.add(fn)
	}

	remove(fn) {
		this.updates.delete(fn)
	}

	update(time, deltaTime, frame) {
		if (!this.active) {
			return
		}

		const delta = Math.min(deltaTime / this.fpsInterval, this.maxDelta)
		this.updates.forEach(update => update(delta))
	}
}

const weatherIconTicker = new WeatherIconTicker()
export default weatherIconTicker