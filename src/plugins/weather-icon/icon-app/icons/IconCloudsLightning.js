import Icon from "./Icon";
import IconItemLightning from "./items/IconItemLightning";
import IconItemCloud from "./items/IconItemCloud";
import IconItemRain from "./items/IconItemRain";

export default class IconCloudsLightning extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.cloudFront = new IconItemCloud(ctx)
		this.cloudBack  = new IconItemCloud(ctx,     { x: 10,  y: -20, color: "#B7D2EE" })
		this.lightning  = new IconItemLightning(ctx, { x: 0, y: 35 })
		this.rain       = new IconItemRain(ctx,      { x: 5,   y: 15 })
	}

	draw() {
		this.lightning.draw()
		this.rain.draw()
		this.cloudBack.draw()
		this.cloudFront.draw()
	}

	update(delta) {
		this.lightning.update(delta)
		this.rain.update(delta)
	}
}