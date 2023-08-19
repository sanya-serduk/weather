import Icon from "./Icon";
import IconItemCrescent from "./items/IconItemCrescent";
import IconItemCloud from "./items/IconItemCloud";
import IconItemRain from "./items/IconItemRain";

export default class IconCrescentCloudRain extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.cloud    = new IconItemCloud(ctx)
		this.crescent = new IconItemCrescent(ctx, { x: -33, y: -25, scale: 0.8 })
		this.rain     = new IconItemRain(ctx,     { x: 5,   y: 15 })
	}

	draw() {
		this.crescent.draw()
		this.rain.draw()
		this.cloud.draw()
	}

	update(delta) {
		this.rain.update(delta)
	}
}