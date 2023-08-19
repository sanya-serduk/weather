export default class IconItem {
	constructor(ctx, props = {}) {
		this.ctx = ctx
		this.x = props.x || 0
		this.y = props.y || 0
		this.scale = props.scale || 1
	}

	draw() {}
	update() {}
}