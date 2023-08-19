const cityTypeAbbreviations = [
	{ type: 'посёлок городского типа',                    abbr: 'пгт' },
	{ type: 'садоводческое некоммерческое товарищество',  abbr: 'снт' },
	{ type: 'дачное некоммерческое товарищество',         abbr: 'днт' },
	{ type: 'коттеджный поселок',                         abbr: 'кп'  }
]

function strReplaceOnPattern(str, pattern) {
	return pattern.reduce((result, item) => result.replace(new RegExp(item.type, 'gi'), item.abbr), str)
}

export default data => {
	return {
		id          : Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
		name        : strReplaceOnPattern(data.name, cityTypeAbbreviations),
		description : data.description,
		coord       : data.coord
	}
}