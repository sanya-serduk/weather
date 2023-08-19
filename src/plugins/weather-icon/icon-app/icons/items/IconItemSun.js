import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";

export default class IconItemSun extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.angle = 0
		this.stepAngle = 0.002

		this.colors = [
			{ offset: 0, color: "#FFCE47" },
			{ offset: 1, color: "#FFB300" }
		]

		this.bodySetting = {
			radius: 27,
			style: IconHelper.createLinearGradient(this.ctx, {
				x1: 0, y1: -27/2, x2: 0, y2: 27/2, colors: this.colors
			})
		}

		this.raySetting = {
			w: 16,
			h: 8,
			min: { w: 8, h: 8 },
			origin: { w: 16, h: 8 },
			step: 0.0004,
			dist: 40,
			num: 7,
			style: IconHelper.createLinearGradient(this.ctx, {
				x1: 0, y1: -4, x2: 0, y2: 4, colors: this.colors
			})
		}

		this.rays = Array.from({ length: this.raySetting.num }, (v, k) => {
			const angle = Math.PI * 2 / this.raySetting.num * k
			return {
				x: Math.cos(angle) * this.raySetting.dist,
				y: Math.sin(angle) * this.raySetting.dist,
				w: this.raySetting.w,
				h: this.raySetting.h,
				angle: angle,
				counter: 0
			}
		})
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.scale(this.scale, this.scale)
		this.ctx.rotate(this.angle)

		this.ctx.beginPath()
		this.ctx.arc(0, 0, this.bodySetting.radius, 0, Math.PI * 2)
		this.ctx.fillStyle = this.bodySetting.style
		this.ctx.fill()

		this.ctx.lineWidth = this.raySetting.h
		this.ctx.lineCap = 'round'
		this.ctx.strokeStyle = this.raySetting.style

		this.rays.forEach(item => {
			const drawX = (this.raySetting.origin.w - item.w) / 2
			this.ctx.translate(item.x, item.y)
			this.ctx.rotate(item.angle)

			this.ctx.beginPath()
			this.ctx.moveTo(drawX, 0)
			this.ctx.lineTo(drawX + item.w, 0)
			this.ctx.stroke()

			this.ctx.rotate(-item.angle)
			this.ctx.translate(-item.x, -item.y)
		})

		this.ctx.restore()
	}

	update(delta) {
		this.angle += this.stepAngle * delta
		this.rays.forEach((item, i) => {
			item.counter += this.raySetting.step * IconHelper.getRandomIntegerRange(1, 50) * delta
			item.w = this.raySetting.min.w
				+ Math.abs(Math.sin(item.counter - i))
				* (this.raySetting.origin.w - this.raySetting.min.w)
		})
	}
}