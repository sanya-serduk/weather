import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";
import IconItemSnowParticle from "./IconItemSnowParticle";

export default class IconItemSnow extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.w = 40
		this.h = 60
		this.angleFrom = Math.PI * 0.45
		this.angleTo   = Math.PI * 0.55
		this.particles = Array.from({ length: 20 }, () => {
			return new IconItemSnowParticle(ctx, {
				x: this.randomX,
				y: 0,
				timeout: IconHelper.getRandomInteger(0, 100),
				angle: this.randomAngle
			})
		})
	}

	get randomX() {
		return IconHelper.getRandomInteger(-this.w / 2, this.w / 2)
	}

	get randomAngle() {
		return IconHelper.getRandomIntegerRange(this.angleFrom, this.angleTo, 2)
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.particles.forEach(particle => particle.draw())
		this.ctx.restore()
	}

	update(delta) {
		this.particles.forEach(particle => {
			if (particle.timeout > 0) {
				particle.timeout -= delta
			} else {
				if (particle.alpha < 0) {
					particle.reset(this.randomX, 0, this.randomAngle)
				} else {
					particle.update(delta)
					particle.alpha -= (particle.y > this.h - 10) ? 0.05 * delta : 0
				}
			}
		})
	}
}