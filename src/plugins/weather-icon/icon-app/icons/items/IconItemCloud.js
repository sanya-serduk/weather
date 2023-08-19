import IconItem from "./IconItem";
import IconHelper from "../../IconHelper";

export default class IconItemCloud extends IconItem {
	constructor(ctx, props = {}) {
		super(ctx, props)
		this.color = props.color || "#ffffff"
		this.shadowColors = [
			{ offset: 0, color: 'rgba(0, 0, 0, 0.1)' },
			{ offset: 1, color: 'rgba(0, 0, 0, 0)'   },
		]
		this.circle = {
			L: { x: -27, y:  9,  r: 21, start: Math.PI / 2,    end: -Math.PI / 4 },
			R: { x:  32, y:  14, r: 16, start: Math.PI * 1.25, end:  Math.PI / 2  },
			T: { x:  4,  y: -6,  r: 24, start: 0,              end:  Math.PI * 2  },
			D: { x:  0,  y:  0,  r: 24, start: 0,              end:  Math.PI * 2  }
		}
		this.shadowLeft = this.getShadowGradient(-13, -5, 0, -8, -8, 24, this.ctx)
		this.shadowRight = this.getShadowGradient(22, 0, 0, 16, -7, 24, this.ctx)
	}

	getShadowGradient(x1, y1, r1, x2, y2, r2) {
		return IconHelper.createRadialGradient(this.ctx, {
			x1, y1, r1, x2, y2, r2, colors: this.shadowColors
		})
	}

	draw() {
		const { L, R, T, D } = this.circle
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.scale(this.scale, this.scale)

		this.ctx.beginPath()
		this.ctx.arc(L.x, L.y, L.r, L.start, L.end)
		this.ctx.arc(R.x, R.y, R.r, R.start, R.end)
		this.ctx.lineTo(L.x, L.y + L.r)
		this.ctx.fillStyle = this.color
		this.ctx.fill()

		this.ctx.beginPath()
		this.ctx.arc(L.x, L.y, L.r, D.start, D.end)
		this.ctx.fillStyle = this.shadowLeft
		this.ctx.fill()

		this.ctx.beginPath()
		this.ctx.arc(R.x, R.y, R.r, D.start, D.end)
		this.ctx.fillStyle = this.shadowRight
		this.ctx.fill()

		this.ctx.beginPath()
		this.ctx.arc(T.x, T.y, T.r, T.start, T.end)
		this.ctx.fillStyle = this.color
		this.ctx.fill()

		this.ctx.restore()
	}
}