import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";
import IconItemLightningParticle from "./IconItemLightningParticle";

export default class IconItemLightning extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.lightning = new IconItemLightningParticle(ctx)
		this.timeout = IconHelper.getRandomInteger(0, 500) // 500
	}

	draw() {
		if (this.timeout > 0) {
			return
		}

		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.lightning.draw()
		this.ctx.restore()
	}

	reset() {
		this.lightning = new IconItemLightningParticle(this.ctx)
		this.timeout = IconHelper.getRandomInteger(0, 250) // 250
	}

	update(delta) {
		if (this.timeout > 0) {
			this.timeout -= delta
			return
		}

		this.lightning.destroyed
			? this.reset()
			: this.lightning.update(delta)
	}
}