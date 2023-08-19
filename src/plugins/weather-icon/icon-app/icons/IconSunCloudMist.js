import Icon from "./Icon";
import IconItemSun from "./items/IconItemSun";
import IconItemCloud from "./items/IconItemCloud";
import IconItemMist from "./items/IconItemMist";

export default class IconSunCloudMist extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.cloud = new IconItemCloud(ctx)
		this.sun   = new IconItemSun(ctx,  { x: 30, y: -17, scale: 0.8 })
		this.mist  = new IconItemMist(ctx, { x: 5,  y: 55 })
	}

	draw() {
		this.sun.draw()
		this.cloud.draw()
		this.mist.draw()
	}

	update(delta) {
		this.sun.update(delta)
		this.mist.update(delta)
	}
}