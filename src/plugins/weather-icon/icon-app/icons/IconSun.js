import Icon from "./Icon";
import IconItemSun from "./items/IconItemSun";

export default class IconSun extends Icon {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.sun = new IconItemSun(ctx)
	}

	draw() {
		this.sun.draw()
	}

	update(delta) {
		this.sun.update(delta)
	}
}