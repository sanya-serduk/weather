import Icon from "./Icon";
import IconItemCloud from "./items/IconItemCloud";
import IconItemSnow from "./items/IconItemSnow";

export default class IconCloudSnow extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.cloudFront = new IconItemCloud(ctx)
		this.cloudBack  = new IconItemCloud(ctx, { x: 10, y: -20, color: "#B7D2EE" })
		this.snow       = new IconItemSnow(ctx,  { x: 0,  y: 15 })
	}

	draw() {
		this.snow.draw()
		this.cloudBack.draw()
		this.cloudFront.draw()
	}

	update(delta) {
		this.snow.update(delta)
	}
}