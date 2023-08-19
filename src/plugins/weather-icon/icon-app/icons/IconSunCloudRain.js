import Icon from "./Icon"
import IconItemSun from "./items/IconItemSun"
import IconItemCloud from "./items/IconItemCloud"
import IconItemRain from "./items/IconItemRain"

export default class IconSunCloudRain extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.cloud = new IconItemCloud(ctx)
		this.sun   = new IconItemSun(ctx,  { x: 30, y: -17, scale: 0.8 })
		this.rain  = new IconItemRain(ctx, { x: 5,  y: 15 })
	}

	draw() {
		this.sun.draw()
		this.rain.draw()
		this.cloud.draw()
	}

	update(delta) {
		this.sun.update(delta)
		this.rain.update(delta)
	}
}