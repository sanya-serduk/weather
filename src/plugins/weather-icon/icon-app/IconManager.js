import ICON_LIST from "@/plugins/weather-icon/icon-app/ICON_LIST";

export default class IconManager {
	constructor(ctx, code) {
		this.ctx = ctx
		this.codeCurrent = code
		this.iconCurrent = null
		this.update()
	}

	get icon() {
		return this.iconCurrent
	}

	get animate() {
		return this.iconCurrent.animate
	}

	get code() {
		return this.codeCurrent
	}

	change(code) {
		this.codeCurrent = code
		this.update()
	}

	update() {
		const Icon = ICON_LIST[this.codeCurrent] || ICON_LIST["default"]
		this.iconCurrent = new Icon(this.ctx)
	}
}