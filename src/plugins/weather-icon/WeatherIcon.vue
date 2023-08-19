<template>
    <canvas ref="canvas"/>
</template>

<script>
import IconApp from "./icon-app/IconApp";
import weatherIconTicker from "./WeatherIconTicker";

export default {
    name: "WeatherIcon",

    props: {
        code: {
            type: String,
            required: true
        },
        animate: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            icon: null,
            iconUpdate: null
        }
    },

    mounted() {
        this.icon = new IconApp(this.$refs.canvas, this.code, this.animate)
        this.iconUpdate = this.icon.update.bind(this.icon)
        weatherIconTicker.add(this.iconUpdate)
    },

    beforeUnmount() {
        weatherIconTicker.remove(this.iconUpdate)
    },

    watch: {
        code() {
            this.icon.changeCode(this.code)
        },

        animate() {
            this.icon.changeAnimate(this.animate)
        }
    }
}
</script>