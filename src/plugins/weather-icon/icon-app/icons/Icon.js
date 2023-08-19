export default class Icon {
	constructor(ctx, props = {}) {
		this.ctx = ctx
		this.x = props.x || 0
		this.y = props.y || 0
		this.scale = props.scale || 1
		this.animation = true
	}

	get animate() {
		return this.animation
	}

	draw() {}
	update() {}
}