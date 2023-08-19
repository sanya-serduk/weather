<template>
    <div class="weather-current" ref="card">
        <div class="weather-current__header" ref="info">
            <div class="weather-current__info">
                <div class="weather-current__info-time">{{ weatherInfo.time }}</div>
                <div class="weather-current__info-city">{{ weatherInfo.city }}</div>
                <div class="weather-current__info-date">{{ weatherInfo.date }}</div>
            </div>
            <button-menu/>
        </div>
        <div class="weather-current__content">
            <div class="weather-current__temp" ref="temp">
                <weather-icon
                    class="weather-current__temp-icon"
                    :code="weather.current.icon"
                    :animate="isActive"
                />
                <div class="weather-current__temp-value">{{ weather.current.temp }}°</div>
                <div class="weather-current__temp-buttons">

                    <template v-for="temp in tempUnitButtons">
                        <div
                            class="weather-current__temp-button"
                            :class="{ 'active': temp.value === store_userSettings.weatherUnits.temp.current }"
                            @click="store_changeUserSetting({ path: 'weatherUnits/temp', value: temp.value })"
                        >
                            {{ temp.name }}
                        </div>
                    </template>

                </div>
                <div class="weather-current__temp-condition">{{ weather.current.description }}</div>
            </div>
            <div class="weather-current__props" ref="props">

                <template v-for="prop in weatherProps" :key="prop.name">
                    <div class="weather-current__prop">
                        <div class="weather-current__prop-name">{{ prop.name }}</div>
                        <div class="weather-current__prop-value">{{ prop.value }}</div>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
import ButtonMenu from "@/components/ButtonMenu";
import { mapActions, mapGetters } from 'vuex'
import gsap from "gsap"

export default {
    name: "WeatherCardCurrent",
    components: { ButtonMenu },

    props: {
        weather: {
            type: Object,
            required: true
        },
        isActive: {
            type: Boolean,
            required: false
        }
    },

    computed: {
        ...mapGetters({
            store_userSettings: 'settings/userSettings',
            store_symbolsOfCurrentUserSettings: 'settings/symbolsOfCurrentUserSettings'
        }),

        tempUnitButtons() {
            const temp = this.store_userSettings.weatherUnits.temp
            return [
                {
                    name: temp.symbol.metric,
                    value: temp.types.metric,
                },
                {
                    name: temp.symbol.imperial,
                    value: temp.types.imperial,
                },
            ]
        },

        weatherInfo() {
            const { city } = this.weather
            const { time, date } = this.weather.current
            return {
                time: time,
                city: city.name,
                date: `${ date.weekday }, ${ date.monthday } ${ date.year }`
            }
        },

        weatherProps() {
            const { tempFeelsLike, windSpeed, pressure, humidity, visibility, clouds } = this.weather.current
            const symbol = this.store_symbolsOfCurrentUserSettings.weatherUnits
            const symbolPressure = symbol.pressure.replace('мм рт.ст.', 'мм')

            return [
                { name: 'Ощущается',  value: tempFeelsLike + '°'                     },
                { name: 'Ветер',      value: windSpeed     + ' ' + symbol.windSpeed  },
                { name: 'Давление',   value: pressure      + ' ' + symbolPressure    },
                { name: 'Влажность',  value: humidity      + '%'                     },
                { name: 'Видимость',  value: visibility    + ' ' + symbol.visibility },
                { name: 'Облачность', value: clouds        + '%'                     },
            ]
        }
    },

    methods: {
        ...mapActions({
            store_changeUserSetting: 'settings/changeUserSetting'
        }),

        animate({ show, direction }) {
            const { card, temp, props, info } = this.$refs
            const items = [temp, props, info]
            const timeline = gsap.timeline()

            timeline.set(card, { x: 200 * (!direction - 0.5) * !show + '%' })
            timeline.from(items, {
                x : direction ? card.clientWidth : -card.clientWidth,
                duration   : 0.6,
                stagger    : 0.15,
                delay      : show ? 0.7 : 0,
                ease       : show ? 'power1.out' : 'power1.in'
            })

            if (show) {
                timeline.call(() => this.$emitter.emit('weather-card__day-is-changing', show))
            }
        },

        changePosition({ prev, next, direction }) {
            const { timestamp } = this.weather.current
            if (next === timestamp) this.animate({ show: true,  direction })
            if (prev === timestamp) this.animate({ show: false, direction })
        }
    },

    mounted() {
        this.$emitter.on(`weather-card__change-day_${ this.weather.id }`, this.changePosition)
    },

    beforeUnmount() {
        this.$emitter.off(`weather-card__change-day_${ this.weather.id }`, this.changePosition)
    }
}
</script>

<style lang="scss">
.weather-current {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;

    &__header {
        display: flex;
        justify-content: space-between;
        will-change: transform;

        & > * + * {
            margin-left: 10px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 60px 0;
    }

    &__info {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto 1fr;
        row-gap: 2px;
        column-gap: 10px;
        margin-left: 3px;

        @include w_560 {
            row-gap: 0;
        }
    }

    &__info-time {
        grid-row: 1 / -1;
        font-size: 40px;
        font-weight: 100;
        line-height: 0.9em;

        @include w_560 {
            font-size: 32px;
        }

        @include w_360 {
            font-size: 29px;
        }
    }

    &__info-city {
        font-size: 16px;
        font-weight: 500;

        @include w_560 {
            font-size: 12px;
        }

        @include w_360 {
            font-size: 11px;
        }
    }

    &__info-date {
        font-size: 12px;
        font-weight: 300;
        color: rgba(#fff, 0.6);
        text-transform: capitalize;

        @include w_360 {
            font-size: 11px;
        }
    }





    // temp





    &__temp {
        display: grid;
        grid-template-rows: 0.75em auto;
        grid-template-columns: 1fr 128px minmax(200px, auto) 128px 1fr;
        align-items: center;
        justify-items: center;
        align-content: start;
        row-gap: 20px;
        font-size: 100px;
        margin: 0 10px;
        will-change: transform;

        @include w_560 {
            font-size: 80px;
            grid-template-columns: 1fr 70px minmax(150px, auto) 70px 1fr;
        }

        @include w_360 {
            font-size: 60px;
            grid-template-columns: 1fr 50px minmax(100px, auto) 50px 1fr;
            row-gap: 12px;
        }
    }

    &__temp-icon {
        grid-column: 2;
        width: 256px;
        height: 256px;

        @include w_560 {
            width: 180px;
            height: 180px;
        }

        @include w_360 {
            width: 132px;
            height: 132px;
        }
    }

    &__temp-value {
        grid-column: 3;
        font-weight: 300;
        text-indent: 0.38em;
    }

    &__temp-buttons {
        grid-column: 4;
        height: 100%;
        margin-top: -14px;
    }

    &__temp-button {
        font-size: 0.25em;
        line-height: 0.75em;
        color: rgba(#fff, 0.4);
        padding: 8px 16px;
        transition: color .2s;
        cursor: pointer;

        &:hover, &.active {
            color: #fff;
        }

        &.active {
            cursor: auto;
        }
    }

    &__temp-condition {
        font-size: 0.16em;
        grid-column: 1 / -1;
        text-align: center;

        @include w_360 {
            font-size: 0.22em;
        }
    }





    // props





    &__props {
        display: grid;
        grid-template-rows: repeat(2, minmax(100px, 1fr));
        grid-template-columns: repeat(3, minmax(160px, 200px));
        gap: 1px;
        margin: 40px 20px 0 20px;
        overflow: hidden;
        will-change: transform;

        @include w_560 {
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, minmax(100px, 160px));
            margin: 30px 10px 0 10px;
        }

        @include w_360 {
            grid-template-rows: repeat(3, minmax(70px, 1fr));
            grid-template-columns: repeat(2, minmax(auto, 140px));
        }
    }

    &__prop {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(#000, 0.1);
        margin: -1px;
        padding: 15px;
    }

    &__prop-name {
        font-size: 11px;
        color: rgba(#fff, 0.5);
        margin-bottom: 2px;

        @include w_560 {
            font-size: 10px;
        }
    }

    &__prop-value {
        font-size: 28px;
        white-space: nowrap;

        @include w_560 {
            font-size: 18px;
        }
    }
}
</style>