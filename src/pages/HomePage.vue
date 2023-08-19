<template>
    <div class="main">
        <div class="main__welcome" :class="welcomeClasses">
            <scroll-container class-bar-y="main__scrollbar-y" :dynamic-size="true">
                <div class="main__welcome-content main__wrapper">
                    <welcome-card/>
                </div>
            </scroll-container>
        </div>
        <div class="main__weather" :class="weatherClasses">
            <scroll-container class-bar-y="main__scrollbar-y"  :dynamic-size="true">
                <div class="main__weather-content main__wrapper">
                    <div class="main__weather-left" @transitionend.self="handlerWeatherLeftTransitionend">
                        <weather-card-list/>
                    </div>
                    <div class="main__weather-right">
                        <weather-menu/>
                    </div>
                </div>
            </scroll-container>
        </div>
    </div>
</template>

<script>
import ScrollContainer from "@/components/ScrollContainer";
import WelcomeCard from "@/components/WelcomeCard";
import WeatherCardList from "@/components/WeatherCardList";
import WeatherMenu from "@/components/WeatherMenu";
import pageLoaderMixin from "@/mixins/pageLoaderMixin";
import { mapActions, mapGetters } from "vuex";
import store from "@/store";

export default {
    name: 'HomePage',
    components: { ScrollContainer, WelcomeCard, WeatherCardList, WeatherMenu },
    mixins: [ pageLoaderMixin ],

    computed: {
        ...mapGetters({
            store_weatherList: 'weather/list',
            store_weatherBasket: 'weather/basket'
        }),

        numWeatherCards() {
            return this.store_weatherList.length - this.store_weatherBasket.length
        },

        welcomeClasses() {
            return {
                'active': !this.numWeatherCards && this.pageLoader_showPage
            }
        },

        weatherClasses() {
            return {
                'active': this.numWeatherCards && this.pageLoader_showPage
            }
        },
    },

    methods: {
        ...mapActions({
            store_weatherAddBasket: 'weather/addBasket',
            store_weatherClearBasket: 'weather/clearBasket'
        }),

        handlerWeatherLeftTransitionend(e) {
            if (e.propertyName !== 'opacity') {
                return
            }

            this.store_weatherClearBasket()
        },

        handlerWeatherRemoveLast(id) {
            this.$emitter.emit('menu-close')
            this.store_weatherAddBasket(id)
        }
    },

    mounted() {
        this.$emitter.on('weather-remove-last', this.handlerWeatherRemoveLast)
        this.$emitter.emit('page-loader__page-loaded', true)
    },

    beforeUnmount() {
        this.$emitter.off('weather-remove-last', this.handlerWeatherRemoveLast)
    },

    beforeRouteEnter(to, from, next) {
        store.getters['localstorage/loaded']
            ? next()
            : store.dispatch('localstorage/init').then(() => next())
    },

    beforeRouteLeave(to, from, next) {
        this.pageLoader_beforeRouteLeave(to, from, next)
    }
}
</script>

<style lang="scss">
.main {
    $ease: cubic-bezier(0.39, 0.58, 0.57, 1);
    $duration: 0.8s;
    $paddingWrapper: 20px;

    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 100%;
    align-items: start;
    width: 100%;
    height: 100%;





    // wrapper





    &__wrapper {
        max-width: 1920px;
        margin: 0 auto;
        padding:
            calc(#{ $paddingWrapper } + #{ $safeAreaTop })
            calc(#{ $paddingWrapper } + #{ $safeAreaRight })
            calc(#{ $paddingWrapper } + #{ $safeAreaBottom })
            calc(#{ $paddingWrapper } + #{ $safeAreaLeft });

        @include w_768 {
            padding: 0;
        }
    }




    // welcome





    &__welcome {
        grid-area: 1/1/1/1;
        width: 100%;
        height: 100%;
        visibility: hidden;
        transition: visibility $duration;

        &.active {
            visibility: visible;
        }
    }

    &__welcome-content {
        display: grid;
        align-items: center;
        justify-items: center;
        width: 100vw;
        height: 100%;
        opacity: 0;
        transform: scale(0.8);
        transition-property: transform, opacity;
        transition-duration: $duration;
        transition-timing-function: $ease;
        will-change: transform, opacity;

        @include w_980 {
            transform: translateX(100%);
        }

        @include w_768 {
            padding: $safeAreaTop $safeAreaRight $safeAreaBottom $safeAreaLeft;
        }

        @include w_560 {
            align-items: start;
        }
    }

    &__welcome.active &__welcome-content {
        opacity: 1;
        transform: none;
    }





    // weather





    &__weather {
        grid-area: 1/1/1/1;
        width: 100%;
        height: 100%;
        visibility: hidden;
        transition: visibility $duration;

        &.active {
            visibility: visible;
        }
    }

    &__weather-content {
        display: grid;
        grid-template-columns: minmax(50%, 800px) minmax(320px, 1fr);
        grid-template-rows: 1fr;
        gap: 20px;
        align-items: start;
        width: 100vw;

        @include w_980 {
            grid-template-columns: auto 100%;
            gap: 0;
            align-items: unset;
        }
    }

    &__weather-left,
    &__weather-right {
        display: flex;
        align-items: center;
        min-height: calc(var(--vh, 100vh) - #{ $paddingWrapper * 2 } - #{ $safeAreaTop } - #{ $safeAreaBottom });
        opacity: 0;
        transition-property: transform, opacity;
        transition-duration: $duration;
        transition-timing-function: $ease;
        will-change: transform, opacity;
    }

    &__weather-left {
        transform: translateX(-200px);
        z-index: 1;

        @include w_980 {
            grid-row: 1;
            grid-column: 2;
            transform: translateX(-100%);
        }

        @include w_768 {
            min-height: auto;
        }
    }

    &__weather-right {
        transform: translateX(200px);

        @include w_980 {
            grid-row: 1;
            grid-column: 1;
            min-height: auto;
            opacity: 1;
            transform: none;
            transition: none;
            will-change: auto;
        }
    }

    &__weather.active &__weather-left,
    &__weather.active &__weather-right {
        opacity: 1;
        transform: none;
    }





    // scrollbar





    &__scrollbar-y {
        transform: translateX(100%);
        transition-property: transform;
        transition-duration: .3s;
        transition-timing-function: $ease;

        @include w_980 {
            top: calc(35px + #{ $safeAreaTop });
            bottom: calc(35px + #{ $safeAreaBottom });
            right: $safeAreaRight;
        }

        @include w_768 {
            visibility: hidden !important;
        }
    }

    &__welcome.active &__scrollbar-y,
    &__weather.active &__scrollbar-y {
        transform: none;
        transition-delay: $duration;
    }
}
</style>