import Icon from "./Icon";
import IconItemCrescent from "./items/IconItemCrescent";
import IconItemCloud from "./items/IconItemCloud";

export default class IconCrescentCloud extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.crescent = new IconItemCrescent(ctx, { x: -33, y: -25, scale: 0.8 })
		this.cloud = new IconItemCloud(this.ctx)
		this.animation = false
	}

	draw() {
		this.crescent.draw()
		this.cloud.draw()
	}
}