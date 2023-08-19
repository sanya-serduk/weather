import Icon from "./Icon";
import IconItemCrescent from "./items/IconItemCrescent";

export default class IconCrescent extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.crescent = new IconItemCrescent(ctx, { x: 0, y: -5 })
		this.animation = false
	}

	draw() {
		this.crescent.draw()
	}
}