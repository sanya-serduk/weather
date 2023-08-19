import IconItemCloud from "./items/IconItemCloud";
import Icon from "./Icon";

export default class IconClouds extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.cloudFront = new IconItemCloud(ctx)
		this.cloudBack = new IconItemCloud(ctx, { x: 10, y: -20, color: "#B7D2EE" })
		this.animation = false
	}

	draw() {
		this.cloudBack.draw()
		this.cloudFront.draw()
	}
}