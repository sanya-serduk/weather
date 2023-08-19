import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";

export default class IconItemLightningParticle extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.roughness = 2
		this.minHeight = 5
		this.h = 50
		this.alpha = 1
		this.speedOrigin = this.h / 5
		this.speed = this.speedOrigin
		this.numPointsActive = 1
		this.pos = { x: 0, y: 0 }
		this.points = this.createPoints()
		this.destroyed = false
	}

	createPoints() {
		let maxDifference = 15
		let height = this.h
		let points = [
			{ x: IconHelper.getRandomInteger(-10, 10), y: 0 },
			{ x: IconHelper.getRandomInteger(-10, 10), y: height }
		]

		while(height > this.minHeight) {
			const newPoints = []

			for (let i = 0; i < points.length - 1; i++) {
				newPoints.push(points[i], {
					x: ((points[i].x + points[i+1].x) / 2) + IconHelper.getRandomInteger(-1, 1) * maxDifference,
					y: (points[i].y + points[i+1].y) / 2
				})
			}

			newPoints.push(points.pop())
			points = newPoints
			maxDifference /= this.roughness
			height /= 2
		}

		return points
	}

	draw() {
		this.ctx.beginPath()
		this.ctx.moveTo(this.points[0].x, this.points[0].y)

		for (let i = 1; i < this.points.length; i++) {
			if (i <= this.numPointsActive) {
				this.ctx.lineTo(this.points[i].x, this.points[i].y)
				continue
			}

			if (i === this.numPointsActive + 1) {
				const dist = IconHelper.distance(this.pos, this.points[i])

				if (dist === 0) {
					this.ctx.lineTo(this.points[i].x, this.points[i].y)
					this.numPointsActive = i
					continue
				}

				const angle = Math.atan2(this.points[i].y - this.pos.y, this.points[i].x - this.pos.x)
				const speed = dist < this.speed ? dist : this.speed
				this.pos.x += Math.cos(angle) * speed
				this.pos.y += Math.sin(angle) * speed
				this.ctx.lineTo(this.pos.x, this.pos.y)

				if (dist < this.speed) {
					this.numPointsActive = i
				}
			}
		}

		this.ctx.lineWidth = 2
		this.ctx.strokeStyle = `rgba(216, 241, 253, ${ this.alpha })`
		this.ctx.shadowBlur = 10
		this.ctx.shadowColor = `rgba(216, 241, 253, ${ this.alpha })`
		this.ctx.stroke()
	}

	update(delta) {
		this.speed = this.speedOrigin * delta

		if (this.points.length - 1 === this.numPointsActive) {
			this.alpha -= 0.1 * delta
		}

		if (this.alpha <= 0) {
			this.destroyed = true
		}
	}
}