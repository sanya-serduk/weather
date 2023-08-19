import IconManager from "./IconManager";

export default class IconApp {
	constructor(element, code, animate = true) {
		this.code = code
		this.animate = animate
		this.cnv = element
		this.ctx = this.cnv.getContext('2d')
		this.originSize = { w: 256, h: 256 }
		this.cnv.width = this.originSize.w
		this.cnv.height = this.originSize.h
		this.cx = this.cnv.width / 2
		this.cy = this.cnv.height / 2
		this.scale = 1
		this.styleCss = getComputedStyle(this.cnv)
		this.iconManager = new IconManager(this.ctx, code)
		this.init()
	}

	init() {
		this.updateSize()
		this.updateView()
	}

	get icon() {
		return this.iconManager.icon
	}

	get checkAnimate() {
		return this.animate
			&& this.icon.animate
			&& this.scale > 0
	}

	get checkVisible() {
		return this.styleCss.visibility !== 'hidden'
			&& this.styleCss.display !== 'none'
	}

	get checkResize() {
		return this.cnv.width  !== this.cnv.clientWidth
			|| this.cnv.height !== this.cnv.clientHeight
	}

	get checkCodeChange() {
		return this.code !== this.iconManager.code
	}

	changeIcon() {
		this.iconManager.change(this.code)
	}

	changeAnimate(value) {
		this.animate = value
	}

	changeCode(value) {
		this.code = value
	}

	updateSize() {
		this.cnv.width = this.cnv.clientWidth
		this.cnv.height = this.cnv.clientHeight
		this.cx = this.cnv.width / 2
		this.cy = this.cnv.height / 2
		this.scale = Math.min(this.cnv.width / this.originSize.w, this.cnv.height / this.originSize.h)
	}

	updateView(delta = 1) {
		this.ctx.setTransform(1, 0, 0, 1, 0, 0)
		this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height)
		this.ctx.translate(this.cx, this.cy)
		this.ctx.scale(this.scale, this.scale)
		this.icon.update(delta)
		this.icon.draw()
	}

	update(delta = 1) {
		if (!this.checkVisible) {
			return
		}

		if (this.checkCodeChange) {
			this.changeIcon()

			if (this.checkResize) {
				this.updateSize()
			}

			this.updateView(delta)
		} else {
			if (this.checkResize) {
				this.updateSize()
				this.updateView(delta)
			} else {
				if (!this.checkAnimate) {
					return
				}

				this.updateView(delta)
			}
		}
	}
}