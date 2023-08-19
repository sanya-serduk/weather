import Icon from "./Icon";
import IconItemSun from "./items/IconItemSun";
import IconItemCloud from "./items/IconItemCloud";

export default class IconSunCloud extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.sun = new IconItemSun(ctx, { x: 30, y: -17, scale: 0.8 })
		this.cloud = new IconItemCloud(ctx)
	}

	draw() {
		this.sun.draw()
		this.cloud.draw()
	}

	update(delta) {
		this.sun.update(delta)
	}
}