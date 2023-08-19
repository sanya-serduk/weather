import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";

export default class IconItemMist extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)

		this.settingParticles = {
			num: 20,
			radius: 35,
			speed: 0.2,
			color: IconHelper.createRadialGradient(ctx, {
				x1: 0, y1: 0, r1: 0, x2: 0, y2: 0, r2: 35,
				colors: [
					{ offset: 0, color: "rgba(255,255,255,0.05)" },
					{ offset: 1, color: "rgba(255,255,255,0)" },
				]
			})
		}

		this.particles = Array.from({ length: this.settingParticles.num }, () => {
			const x = IconHelper.getRandomInteger(-30, 30)
			const y = IconHelper.getRandomInteger(-25, 25)
			return {
				x, y,
				startPoint : { x, y },
				endPoint : this.getRandomPosition({ x, y }),
			}
		})
	}

	getRandomPosition(startPoint) {
		return {
			x: startPoint.x + IconHelper.getRandomInteger(-15, 15),
			y: startPoint.y + IconHelper.getRandomInteger(-15, 15)
		}
	}

	draw() {
		this.ctx.fillStyle = this.settingParticles.color

		this.particles.forEach(particle => {
			this.ctx.translate(this.x + particle.x, this.y + particle.y)
			this.ctx.beginPath()
			this.ctx.arc(0, 0, this.settingParticles.radius, 0, Math.PI * 2)
			this.ctx.fill()
			this.ctx.translate(-(this.x + particle.x), -(this.y + particle.y))
		})
	}

	update(delta) {
		this.particles.forEach(particle => {
			const dist = IconHelper.distance(particle, particle.endPoint)

			if (dist > 0) {
				const speed = this.settingParticles.speed * delta
				const x = particle.endPoint.x - particle.x
				const y = particle.endPoint.y - particle.y
				particle.x += dist > speed ? x / dist * speed : x
				particle.y += dist > speed ? y / dist * speed : y
			} else {
				particle.endPoint = this.getRandomPosition(particle.startPoint)
			}
		})
	}
}