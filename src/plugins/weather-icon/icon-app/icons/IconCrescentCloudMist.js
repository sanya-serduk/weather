import Icon from "./Icon";
import IconItemCrescent from "./items/IconItemCrescent";
import IconItemCloud from "./items/IconItemCloud";
import IconItemMist from "./items/IconItemMist";

export default class IconCrescentCloudMist extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.cloud    = new IconItemCloud(ctx)
		this.crescent = new IconItemCrescent(ctx, { x: -33, y: -25, scale: 0.8 })
		this.mist     = new IconItemMist(ctx,     { x: 0,   y: 55 })
	}

	draw() {
		this.crescent.draw()
		this.cloud.draw()
		this.mist.draw()
	}

	update(delta) {
		this.mist.update(delta)
	}
}