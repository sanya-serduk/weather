import Icon from "./Icon";
import IconItemCloud from "./items/IconItemCloud";
import IconItemRain from "./items/IconItemRain";

export default class IconCloudsRain extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.cloudFront = new IconItemCloud(ctx)
		this.cloudBack  = new IconItemCloud(ctx, { x: 10, y: -20, color: "#B7D2EE" })
		this.rain       = new IconItemRain(ctx,  { x: 5,  y: 15 })
	}

	draw() {
		this.cloudBack.draw()
		this.rain.draw()
		this.cloudFront.draw()

	}

	update(delta) {
		this.rain.update(delta)
	}
}