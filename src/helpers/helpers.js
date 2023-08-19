export default {
	distance(a, b = { x: 0, y: 0 }) {
		return Math.hypot(a.x - b.x, a.y - b.y)
	},

	getRandomInRange(from, to, fixed) {
		return (Math.random() * (to - from) + from).toFixed(fixed) * 1
	},

	randomInteger(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min))
	},

	arrShuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr
	},

	getUniqueID() {
		return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
	}
}