import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";

export default class IconItemSnowParticle extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.timeout = props.timeout || 0
		this.angle = props.angle || Math.PI * 0.5
		this.speed = 1.5
		this.diffSpeed = this.speed * 0.8
		this.alpha = this.getAlpha()
		this.step  = this.getStep()
		this.r     = this.getRadius()
	}

	getAlpha() {
		return IconHelper.getRandomIntegerRange(0.2, 1 ,2)
	}

	getStep() {
		return {
			x: Math.cos(this.angle) * this.getSpeed(),
			y: Math.sin(this.angle) * this.getSpeed()
		}
	}

	getSpeed() {
		return this.speed - this.diffSpeed + this.alpha * this.diffSpeed
	}

	getRadius() {
		return 1 + this.alpha
	}

	reset(x = 0, y = 0, angle = Math.PI * 0.5) {
		this.x = x
		this.y = y
		this.alpha = this.getAlpha()
		this.r = this.getRadius()
		this.angle = angle
		this.step  = this.getStep()
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.rotate(this.angle)

		this.ctx.beginPath()
		this.ctx.arc(0, 0, this.r, 0, Math.PI * 2)
		this.ctx.fillStyle = `rgba(255, 255, 255, ${ this.alpha })`
		this.ctx.fill()

		this.ctx.restore()
	}

	update(delta) {
		this.x += this.step.x * delta
		this.y += this.step.y * delta
	}
}