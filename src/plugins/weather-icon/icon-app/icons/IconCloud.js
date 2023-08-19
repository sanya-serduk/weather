import Icon from "./Icon"
import IconItemCloud from "./items/IconItemCloud"

export default class IconCloud extends Icon {
	constructor(ctx, options = {}) {
		super(ctx, options)
		this.cloud = new IconItemCloud(ctx)
		this.animation = false
	}

	draw() {
		this.cloud.draw()
	}
}