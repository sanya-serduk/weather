import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";

export default class IconItemRainDrop extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.w = 2
		this.h = 6
		this.speed     = props.speed   || 4
		this.timeout   = props.timeout || 0
		this.diffSpeed = this.speed * 0.8
		this.alpha     = this.getAlpha()
		this.stepY     = this.getStepY()
	}

	getAlpha() {
		return IconHelper.getRandomIntegerRange(0.2, 1, 1)
	}

	getStepY() {
		return this.speed - this.diffSpeed + this.alpha * this.diffSpeed
	}

	reset(x = 0, y = 0) {
		this.x = x
		this.y = y
		this.alpha = this.getAlpha()
		this.stepY = this.getStepY()
	}

	draw() {
		this.ctx.fillStyle = `rgba(156, 196, 255, ${ this.alpha })`
		this.ctx.fillRect(this.x, this.y, this.w, this.h)
	}

	update(delta) {
		this.y += this.stepY * delta
	}
}