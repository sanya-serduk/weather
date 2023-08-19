<template>
    <div class="weather-card-list">

        <template v-for="card in store_weatherList" :key="card.id">
            <weather-card
                class="weather-card-list__item"
                :class="{ 'active': card.id === store_weatherActiveID }"
                :style="!animationIsAllowed ? 'animation-duration: unset' : ''"
                :weather="card"
                @animationend.self="animationend"
            />
        </template>

    </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "WeatherCardList",
    components: { WeatherCard },

    data() {
        return {
            cityIsChanging: false,
            animationIsAllowed: false
        }
    },

    computed: {
        ...mapGetters({
            store_weatherList: 'weather/list',
            store_weatherActiveID: 'weather/activeID'
        })
    },

    methods: {
        ...mapActions({
            store_weatherRemove: 'weather/remove',
            store_weatherChange: 'weather/change',
            store_weatherAddBasket: 'weather/addBasket',
            store_weatherClearBasket: 'weather/clearBasket'
        }),

        animationend(e) {
            this.cityIsChanging = false
            this.store_weatherClearBasket()
        },

        handlerWeatherChange(id) {
            if (this.cityIsChanging) {
                return
            }

            this.store_weatherChange(id)
            this.$emitter.emit('menu-close')
        },

        handlerWeatherRemove(id) {
            if (this.store_weatherList.length === 1) {
                this.$emitter.emit('weather-remove-last', id)
            } else {
                if (id === this.store_weatherActiveID) {
                    const next = this.store_weatherList.find(item => item.id !== this.store_weatherActiveID)
                    this.store_weatherAddBasket(id)
                    this.store_weatherChange(next.id)
                } else {
                    this.store_weatherRemove(id)
                }
            }
        }
    },

    mounted() {
        this.$emitter.on('weather-change', this.handlerWeatherChange)
        this.$emitter.on('weather-remove', this.handlerWeatherRemove)
    },

    beforeUnmount() {
        this.$emitter.off('weather-change', this.handlerWeatherChange)
        this.$emitter.off('weather-remove', this.handlerWeatherRemove)
    },

    watch: {
        store_weatherActiveID(newVal, val) {
            this.animationIsAllowed = this.cityIsChanging = !!(newVal && val)
        }
    },
}
</script>

<style lang="scss">
.weather-card-list {
    $ease: cubic-bezier(0.2, 0, 0.5, 1);
    $duration: 0.9s;

    display: grid;
    grid-template-columns: 100%;
    justify-items: center;
    align-items: start;
    width: 100%;

    &__item {
        grid-area: 1/1/1/1;
        visibility: hidden;
        animation-name: weather-card-list__item-hide;
        animation-duration: $duration;
        animation-timing-function: $ease;
        transition: visibility $duration;
        will-change: transform, opacity;

        @include w_980 {
            animation-duration: unset;
            transition: none;
            will-change: auto;
        }

        &.active {
            visibility: visible;
            animation-name: weather-card-list__item-show;
        }

        &:not(.active) {
            @include w_980 {
                height: 0;
            }
        }
    }
}

@keyframes weather-card-list__item-show {
    from {
        opacity: 0;
        transform: translateX(20%) scale(0.8);
    }
}

@keyframes weather-card-list__item-hide {
    to {
        opacity: 0;
        transform: translateX(-60%);
    }
}
</style>