<template>
    <div class="weather" ref="card">
        <div class="weather__content">
            <weather-card-current
                class="weather__content-item"
                :weather="weather"
                :isActive="timestamp === weather.current.timestamp && enableChangeDay && weather.id === store_weatherActiveID"
            />

            <template v-for="future in weather.forecast" :key="future.timestamp">
                <weather-card-future
                    class="weather__content-item"
                    :timestamp="future.timestamp"
                    :weather="future"
                    :id="weather.id"
                    :city="weather.city"
                    :isActive="timestamp === future.timestamp && enableChangeDay && weather.id === store_weatherActiveID"
                />
            </template>

        </div>
        <div class="weather__forecast" ref="forecast">
            <scroll-container
                class-bar-x="weather__forecast-scrollbar-x"
                @scroll="handlerScrollForecast"
                ref="forecastScrollContainer"
            >
                <div class="weather__forecast-items" ref="forecastItems">
                    <weather-card-forecast
                        class="weather__forecast-item"
                        name="Сейчас"
                        :date="weather.current.date.monthday"
                        :icon="weather.current.icon"
                        :temp-max="weather.current.temp"
                        :isActive="timestamp === weather.current.timestamp && weather.id === store_weatherActiveID"
                        :isActiveIcon="weather.id === store_weatherActiveID"
                        @click="changeDay(weather.current.timestamp)"
                    />

                    <template v-for="future in weather.forecast" :key="future.timestamp">
                        <weather-card-forecast
                            class="weather__forecast-item"
                            :name="future.date.weekday"
                            :date="future.date.monthday"
                            :icon="future.icon"
                            :temp-min="future.tempMin"
                            :temp-max="future.tempMax"
                            :isActive="timestamp === future.timestamp && weather.id === store_weatherActiveID"
                            :isActiveIcon="weather.id === store_weatherActiveID"
                            @mousedown.left="changeDay(future.timestamp)"
                        />
                    </template>

                </div>
            </scroll-container>
            <div
                class="weather__forecast-arrow-left"
                data-arrow="left"
                @click="handlerArrowForecast"
                ref="forecastArrowLeft"
            ></div>
            <div
                class="weather__forecast-arrow-right"
                data-arrow="right"
                @click="handlerArrowForecast"
                ref="forecastArrowRight"
            ></div>
        </div>
    </div>
</template>

<script>
import ScrollContainer from "@/components/ScrollContainer";
import WeatherCardFuture from "@/components/WeatherCardFuture";
import WeatherCardCurrent from "@/components/WeatherCardCurrent";
import WeatherCardForecast from "@/components/WeatherCardForecast";
import { mapGetters } from "vuex";

export default {
    name: "WeatherCard",
    components: { ScrollContainer, WeatherCardFuture, WeatherCardCurrent, WeatherCardForecast },

    props: {
        weather: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            timestamp: null,
            enableChangeDay: true
        }
    },

    computed: {
        ...mapGetters({
            store_weatherActiveID: 'weather/activeID'
        })
    },

    methods: {
        handlerScrollForecast() {
            const scrollPosition = this.$refs.forecastScrollContainer.getScroll()
            scrollPosition.x > 0
                ? this.$refs.forecastArrowLeft.classList.add('active')
                : this.$refs.forecastArrowLeft.classList.remove('active')

            scrollPosition.x < this.$refs.forecastItems.clientWidth - this.$refs.forecastScrollContainer.$el.clientWidth
                ? this.$refs.forecastArrowRight.classList.add('active')
                : this.$refs.forecastArrowRight.classList.remove('active')
        },

        handlerArrowForecast(e) {
            if (!e.target.dataset.hasOwnProperty('arrow'))
                return

            const arrow = e.target.dataset.arrow
            const stepX = this.$refs.forecastItems.clientWidth / (this.weather.forecast.length + 1) + 2
            this.$refs.forecastScrollContainer.scrollBy(arrow === 'left' ? -stepX : stepX, 0)
        },

        changeDay(timestamp) {
            if (!this.enableChangeDay || this.timestamp === timestamp)
                return

            this.$emitter.emit(`weather-card__change-day_${ this.weather.id }`, {
                prev: this.timestamp,
                next: timestamp,
                direction: timestamp > this.timestamp
            })
            this.timestamp = timestamp
            this.setEnableChangeDay(false)
        },

        setEnableChangeDay(value) {
            this.enableChangeDay = value
        }
    },

    mounted() {
        this.$emitter.on('weather-card__day-is-changing', this.setEnableChangeDay)
        this.timestamp = this.weather.current.timestamp
        window.addEventListener('resize', this.handlerScrollForecast)
        this.handlerScrollForecast()
    },

    beforeUnmount() {
        this.$emitter.off('weather-card__day-is-changing', this.setEnableChangeDay)
        this.$emitter.all.delete(`weather-card__change-day_${ this.weather.id }`)
        window.removeEventListener('resize', this.handlerScrollForecast)
    }
}
</script>

<style lang="scss">
.weather {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
    background-color: rgba($colorBlue, 0.95);
    width: 100%;
    min-width: 600px;
    max-width: 800px;
    border: 1px solid rgba(#000, 0.5);
    box-shadow: 0 0 20px -10px #000;
    border-radius: $borderRadiusLarge;
    overflow: hidden;

    @include w_980 {
        max-width: none;
    }

    @include w_768 {
        background-color: unset;
        min-width: auto;
        min-height: var(--vh, 100vh);
        border: none;
        border-radius: 0;
        box-shadow: none;
        padding: $safeAreaTop $safeAreaRight $safeAreaBottom $safeAreaLeft;
    }

    &__content {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
    }

    &__content-item {
        grid-area: 1/1/1/1;
        padding: 20px 20px 0 20px;

        @include w_768 {
            padding: 10px 10px 0 10px;
        }
    }

    &__forecast {
        position: relative;
        padding: 20px;

        @include w_768 {
            padding: 10px;
        }
    }

    &__forecast-items {
        display: flex;
    }

    &__forecast-item {
        & + & {
            margin-left: 10px;
        }
    }

    &__forecast-arrow-left,
    &__forecast-arrow-right {
        display: none;
        position: absolute;
        top: 50%;
        background-color: #fff;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        box-shadow: 0 0 20px -10px #000;
        transform: translateY(-50%);
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition-property: visibility, opacity, box-shadow;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;

        @media (hover: hover) and (pointer: fine) {
            display: block;
        }

        &.active {
            opacity: 1;
            visibility: inherit;
        }

        &:hover {
            box-shadow: 0 0 20px -5px #000;
        }

        &:before,
        &:after {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            background-color: $colorGrayBlue;
            width: 7px;
            height: 2px;
        }
    }

    &__forecast-arrow-left {
        left: 30px;

        @include w_560 { left: 15px; }
        @include w_360 { left: 5px; }

        &:before,
        &:after  { transform-origin: left; }
        &:before { transform: translate(-50%, -50%) rotate(-50deg); }
        &:after  { transform: translate(-50%, -50%) rotate(50deg); }
    }

    &__forecast-arrow-right {
        right: 30px;

        @include w_560 { right: 15px; }
        @include w_360 { right: 5px; }

        &:before,
        &:after  { transform-origin: right; }
        &:before { transform: translate(-50%, -50%) rotate(50deg); }
        &:after  { transform: translate(-50%, -50%) rotate(-50deg); }
    }

    &__forecast-scrollbar-x {
        bottom: -14px;

        @include w_768 {
            bottom: -9px;
            height: 13px;
        }
    }
}
</style>