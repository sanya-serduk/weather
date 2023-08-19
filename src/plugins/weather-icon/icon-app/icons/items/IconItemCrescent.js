import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";

export default class IconItemCrescent extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.radius = 32
		this.gradient = IconHelper.createLinearGradient(this.ctx, {
			x1 : -this.radius/2,
			y1 : -this.radius/2,
			x2 : this.radius/2,
			y2 : this.radius/2,
			colors : [
				{ offset: 0, color: "#FFCE47" },
				{ offset: 1, color: "#FFB300" }
			]
		})
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.scale(this.scale, this.scale)

		this.ctx.beginPath()
		this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
		this.ctx.fillStyle = this.gradient
		this.ctx.fill()

		this.ctx.globalCompositeOperation = "destination-out"

		this.ctx.beginPath()
		this.ctx.ellipse(-12, -12, this.radius, this.radius-8, -Math.PI * 0.25, 0, Math.PI * 2)
		this.ctx.fillStyle = "#fff"
		this.ctx.fill()

		this.ctx.restore()
	}
}