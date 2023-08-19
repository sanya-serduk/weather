<template>
    <div class="menu" :class="{ 'active': isOpen }">
        <div class="menu__wrapper">
            <div class="menu__back" @click="close"></div>
            <div class="menu__wrapper-content">
                <div class="menu__btn-close">
                    <svg-inline name="close"/>
                </div>
                <div class="menu__content">
                    <scroll-container
                        class-wrapper="menu__scroll-wrapper"
                        class-inner="menu__scroll-inner"
                        :show-bar="false"
                    >
                        <div class="menu__scroll-content">
                            <search-form class="menu__search"/>
                            <card-settings class="menu__settings"/>
                            <div class="menu__cities" ref="cities">
                                <TransitionGroup
                                    name="menu__cities"
                                    @before-enter="before"
                                    @before-leave="before"
                                    @enter="onEnter"
                                    @leave="onLeave"
                                >

                                    <template v-for="weather in store_weatherList" :key="weather.id">
                                        <menu-city-button
                                            :weather="weather"
                                            :is-active="weather.id === store_weatherActiveID"
                                        />
                                    </template>

                                </TransitionGroup>
                            </div>
                        </div>
                    </scroll-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScrollContainer from "@/components/ScrollContainer";
import SearchForm from "@/components/SearchForm";
import CardSettings from "@/components/CardSettings";
import MenuCityButton from "@/components/MenuCityButton";
import { mapGetters } from "vuex";
import gsap from "gsap";
import SvgInline from "@/components/SvgInline";

export default {
    name: "WeatherMenu",
    components: { SvgInline, ScrollContainer, MenuCityButton, CardSettings, SearchForm },

    data() {
        return {
            isOpen: false
        }
    },

    computed: {
        ...mapGetters({
            store_weatherList: 'weather/list',
            store_weatherActiveID: 'weather/activeID'
        })
    },

    methods: {
        open() {
            this.isOpen = true
        },

        close() {
            this.isOpen = false
        },

        before() {
            gsap.set(this.$refs.cities, { height: this.$refs.cities.clientHeight })
        },

        onLeave(el, done) {
            const elPosition = el.getBoundingClientRect()
            const parentPosition = this.$refs.cities.getBoundingClientRect()

            gsap.timeline({ defaults: { duration: 0.8 }, onComplete: done })
                .fromTo(el, {
                    position: 'absolute',
                    top: elPosition.top - parentPosition.top,
                    left: elPosition.left - parentPosition.left,
                    width: elPosition.width,
                    height: elPosition.height
                }, {
                    scale: 0.5,
                    opacity: 0
                })
                .to(this.$refs.cities, {
                    height: 'auto',
                    clearProps: true
                }, 0)
        },

        onEnter(el, done) {
            if (this.store_weatherList.length === 1) {
                gsap.set(this.$refs.cities, { clearProps: 'all' })
                done()
                return
            }

            gsap.timeline({ defaults: { duration: 0.8 }, onComplete: done })
                .fromTo(el, {
                    scale: 0.5,
                    opacity: 0,
                    animationIterationCount: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    clearProps: true
                })
                .to(this.$refs.cities, {
                    height: 'auto',
                    clearProps: true
                }, 0)
        }
    },

    mounted() {
        this.$emitter.on('menu-open', this.open)
        this.$emitter.on('menu-close', this.close)
    },

    beforeUnmount() {
        this.$emitter.off('menu-open', this.open)
        this.$emitter.off('menu-close', this.close)
    }
}
</script>

<style lang="scss">
.menu {
    $ease: ease;
    $duration: 0.4s;
    $closeWidth_980: 130px;
    $closeWidth_768: 70px;
    $closeWidth_560: 60px;
    $closeWidth_360: 40px;

    width: 100%;
    max-width: 600px;
    min-width: 260px;
    height: 100%;
    margin: 0 auto;

    @include w_980 {
        width: 0;
        height: 0;
        min-width: auto;
        transition: width $duration $ease;
        will-change: width;
    }

    &.active {
        @include w_980 {
            width: $closeWidth_980;
        }

        @include w_768 {
            width: $closeWidth_768;
        }

        @include w_560 {
            width: $closeWidth_560;
        }

        @include w_360 {
            width: $closeWidth_360;
        }
    }

    &:not(.active) canvas {
        @include w_980 {
            visibility: hidden;
            transition: visibility $duration;
        }
    }

    &__wrapper {
        height: 100%;

        @include w_980 {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            transition: transform $duration $ease;
            will-change: transform;
            z-index: 2;
        }
    }

    &.active &__wrapper {
        @include w_980 {
            transform: translateX(0%);
        }
    }

    &__scroll-wrapper {
        overflow: initial;

        @include w_980 {
            overflow: hidden;
        }
    }

    &__scroll-inner {
        overflow: initial;

        @include w_980 {
            overflow: scroll;
        }
    }

    &__wrapper-content {
        width: 100%;
        height: 100%;

        @include w_980 {
            position: absolute;
            top: 0;
            left: 0;
            width: calc(100% - #{ $closeWidth_980 } - #{ $safeAreaRight });
        }

        @include w_768 {
            width: calc(100% - #{ $closeWidth_768 } - #{ $safeAreaRight });
        }

        @include w_560 {
            width: calc(100% - #{ $closeWidth_560 } - #{ $safeAreaRight });
        }

        @include w_360 {
            width: calc(100% - #{ $closeWidth_360 } - #{ $safeAreaRight });
        }
    }

    &__back {
        display: none;

        @include w_980 {
            display: block;
            position: absolute;
            top: 0;
            right: -100%;
            bottom: 0;
            left: 0;
            background-color: #fff;
            opacity: 0;
            visibility: hidden;
            transition-property: opacity, visibility;
            transition-duration: $duration;
            transition-timing-function: $ease;
            will-change: opacity;
        }
    }

    &.active &__back {
        @include w_980 {
            visibility: visible;
            opacity: 0.3;
        }
    }

    &__btn-close {
        display: none;

        @include w_980 {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: $closeWidth_980;
            height: 115px;
            transition: transform $duration $ease;
            pointer-events: none;
            will-change: transform;
        }

        @include w_768 {
            width: $closeWidth_768;
            height: 55px;
        }

        @include w_560 {
            width: $closeWidth_560;
            height: 50px;
        }

        @include w_360 {
            width: $closeWidth_360;
            height: $closeWidth_360;
        }

        & svg {
            fill: $colorGrayBlue;
            width: 30px;
            height: 30px;
        }
    }

    &.active &__btn-close {
        @include w_980 {
            transform: translateX(100%);
        }
    }

    &__content {
        height: 100%;
        min-height: 100%;

        @include w_980 {
            background-color: $colorGrayBlue;
        }
    }

    &__scroll-content {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr auto;
        align-content: center;
        gap: 15px;

        @include w_980 {
            grid-template-rows: repeat(3, auto);
            grid-template-columns: 1fr;
            align-content: start;
            padding:
                calc(15px + #{ $safeAreaTop })
                15px
                calc(15px + #{ $safeAreaBottom })
                calc(15px + #{ $safeAreaLeft });
        }

        @include w_360 {
            gap: 10px;
            padding:
                calc(10px + #{ $safeAreaTop })
                10px
                calc(10px + #{ $safeAreaBottom })
                calc(10px + #{ $safeAreaLeft });
        }
    }

    &__search {
        flex: 1;
        z-index: 1;
    }

    &__cities {
        position: relative;
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        grid-auto-rows: max-content;
        align-items: start;
        gap: 15px;
        will-change: height;

        @include w_980 {
            grid-template-columns: 1fr 1fr;
        }

        @include w_768 {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
    }

    &__settings {
        z-index: 1;

        @include w_980 {
            grid-row: 3;
            z-index: auto;
        }
    }
}

.menu__cities-move {
    transition: 0.8s cubic-bezier(0.5, 1, 0.89, 1);
}

.menu__cities-leave-active {
    transition: none;
}
</style>