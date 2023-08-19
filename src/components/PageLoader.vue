<template>
    <div class="page-loader" :class="{ 'active': !end }">
        <loader-points-line :play="!stopped" @animation-end="loaderEnd"/>
    </div>
</template>

<script>
import LoaderPointsLine from "@/components/LoaderPointsLine";

export default {
    name: "PageLoader",
    components: { LoaderPointsLine },

    data() {
        return {
            stopped: false,
            init: false,
            end: false,
        }
    },

    methods: {
        loaderEnd() {
            if (!this.stopped) return
            this.end = true
            this.$emitter.emit('page-loader__loader-loaded', true)
        },

        setPageLoaded(value) {
            this.stopped = value
            this.end = false
        }
    },

    mounted() {
        this.init = true
        this.$emitter.on('page-loader__page-loaded', this.setPageLoaded)
    },

    beforeUnmount() {
        this.$emitter.off('page-loader__page-loaded', this.setPageLoaded)
    }
}
</script>

<style lang="scss">
.page-loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(#000, 0.5);
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: 0.8s;
    will-change: opacity;

    @include w_768 {
        background-color: rgba(#000, 0.2);
    }

    &.active {
        opacity: 1;
        visibility: visible;
    }
}
</style>