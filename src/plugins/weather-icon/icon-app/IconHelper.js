export default class IconHelper {
	static createLinearGradient(ctx, { x1, y1, x2, y2, colors }) {
		const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
		colors.forEach(item => gradient.addColorStop(item.offset, item.color))
		return gradient
	}

	static createRadialGradient(ctx, { x1, y1, r1, x2, y2, r2, colors }) {
		const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
		colors.forEach(item => gradient.addColorStop(item.offset, item.color))
		return gradient
	}

	static getRandomInteger(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min))
	}

	static getRandomIntegerRange(from, to, fixed) {
		return (Math.random() * (to - from) + from).toFixed(fixed) * 1
	}

	static distance(a, b = { x: 0, y: 0 }) {
		return Math.hypot(a.x - b.x, a.y - b.y)
	}
}