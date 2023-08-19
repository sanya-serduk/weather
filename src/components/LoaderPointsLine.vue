<template>
    <div class="loader-points-line" :class="{ 'active': isActive }">
        <div class="loader-points-line__point" :class="[classPoint]" @animationiteration="animationiteration"></div>
        <div class="loader-points-line__point" :class="[classPoint]"></div>
        <div class="loader-points-line__point" :class="[classPoint]"></div>
    </div>
</template>

<script>
export default {
    name: "LoaderPointsLine",

    props: {
        play: { type: Boolean, required: true },
        classPoint: { type: String, default: '' }
    },

    data() {
        return {
            isActive: false,
            timeLastIteration: Date.now(),
            animationDuration: 1500,
            animationTimeout: 300
        }
    },

    methods: {
        animationiteration() {
            const diffTimeIteration = Math.abs(Date.now() - this.timeLastIteration - this.animationDuration)
            this.setTimeLastIteration()

            if (!this.play && diffTimeIteration <= this.animationTimeout) {
                this.$emit('animation-end')
                this.isActive = false
            }
        },

        setTimeLastIteration() {
            this.timeLastIteration = Date.now()
        }
    },

    mounted() {
        this.isActive = this.play
        this.setTimeLastIteration()
    },

    watch: {
        play(value) {
            if (!value) return
            this.isActive = true
            this.setTimeLastIteration()
        }
    }
}
</script>

<style lang="scss">
.loader-points-line {
    display: flex;

    &__point {
        background-color: #fff;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        box-shadow: 0 0 5px -2px #000;
        margin: 0 -2px;
        transform: scale(0);
        opacity: 0.5;
        animation-name: loader-points-line;
        animation-duration: 1.5s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-play-state: paused;
        will-change: transform, opacity;

        &:nth-child(1) { animation-delay: 0.1s }
        &:nth-child(2) { animation-delay: 0.25s }
        &:nth-child(3) { animation-delay: 0.4s }
    }

    &.active &__point {
        animation-play-state: running;
    }

    @keyframes loader-points-line {
        20%  { transform: scale(0); opacity: 0.5 }
        50%  { transform: scale(1); opacity: 1 }
        80%  { transform: scale(0); opacity: 0.5 }
    }
}
</style>