<template>
    <div ref="svg"></div>
</template>

<script>
export default {
    name: "SvgInline",

    props: {
        name: {
            type: String,
            required: true
        }
    },

    mounted() {
        try {
            const parser = new DOMParser()
            const svgText = require(`@/assets/img/svg-inline/${ this.name }.svg`)
            const svgDocument = parser.parseFromString(svgText, "text/html")
            const svgNode = svgDocument.getElementsByTagName('svg')[0]

            for (const attr of this.$refs.svg.attributes) {
                svgNode.setAttribute(attr.name, attr.value)
            }

            this.$refs.svg.replaceWith(svgNode)
        } catch (e) {
            console.error(e)
        }
    }
}
</script>