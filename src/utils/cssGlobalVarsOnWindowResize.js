const elHead = document.head
const elStyle = document.createElement('style')
const vars = [
	{
		name: 'vh',
		value: () => {
			return `${ document.documentElement.clientHeight }px`
		}
	},
	{
		name: 'vw',
		value: () => {
			return `${ document.documentElement.clientWidth }px`
		}
	}
]

function update() {
	const cssText = vars.reduce((acc, curr) => {
		return acc + `--${ curr.name }:${ curr.value() };`
	}, '')

	elStyle.textContent = `:root{${ cssText }}`
}

update()
elHead.insertBefore(elStyle, elHead.querySelector('style, link'))
window.addEventListener('resize', update)