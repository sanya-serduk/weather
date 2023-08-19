import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";
import IconItemRainDrop from "./IconItemRainDrop"

export default class IconItemRain extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.w = 50
		this.h = 50
		this.vh = 40
		this.num = 50
		this.cx = this.w / 2
		this.direction = props.direction || 1
		this.angle = 0.2 * this.direction
		this.drops = Array.from({ length: this.num }, () => {
			return new IconItemRainDrop(ctx, {
				x: this.randomX,
				y: 0,
				timeout: IconHelper.getRandomInteger(0, 100)
			})
		})
	}

	get randomX() {
		return IconHelper.getRandomInteger(-this.cx, this.cx)
	}

	draw() {
		this.ctx.translate(this.x, this.y)
		this.ctx.rotate(this.angle)
		this.drops.forEach(drop => drop.draw())
		this.ctx.rotate(-this.angle)
		this.ctx.translate(-this.x, -this.y)
	}

	update(delta) {
		this.drops.forEach(drop => {
			if (drop.timeout > 0) {
				drop.timeout -= delta
			} else {
				if (drop.alpha > 0) {
					if (drop.y > this.vh) {
						drop.alpha -= 0.1 * delta
					}

					drop.update(delta)
				} else {
					drop.reset(this.randomX, 0)
				}
			}
		})
	}
}