<template>
    <div class="weather-future" ref="card">
        <div class="weather-future__header" ref="title">
            <div class="weather-future__info">
                <div class="weather-future__info-city">{{ weatherInfo.city }}</div>
                <div class="weather-future__info-date">{{ weatherInfo.date }}</div>
            </div>
            <button-menu/>
        </div>
        <div class="weather-future__content">
            <div class="weather-future__periods">

                <template v-for="period in weather.periods" :key="period.timestamp">
                    <div
                        class="weather-future__summary"
                        :class="{ 'active': activePeriod === period.name }"
                        :data-period="period.name"
                        :ref="activePeriod === period.name ? 'summaryActive' : 'summary'"
                        @click="changePeriod"
                    >
                        <div class="weather-future__summary-title">{{ period.name }}</div>
                        <div class="weather-future__summary-temp">
                            <span class="weather-future__summary-temp-min">{{ period.tempMin }}°</span>
                            <span class="weather-future__summary-temp-max">{{ period.tempMax }}°</span>
                        </div>
                        <div class="weather-future__summary-desc">{{ period.description }}</div>
                        <div class="weather-future__summary-arrow" :class="{ 'active': summaryButtons[period.name] }"></div>
                        <div class="weather-future__summary-icon">
                            <weather-icon
                                class="weather-future__summary-canvas"
                                :code="period.icon"
                                :animate="isActive"
                            />
                        </div>
                    </div>
                    <div class="weather-future__details" :data-period="period.name" ref="details">
                        <div class="weather-future__details-wrapper">
                            <scroll-container class-bar-y="weather-future__details-scrollbar-y">
                                <div class="weather-future__details-content">

                                    <template v-for="time in period.timeList" :key="time.time">
                                        <div class="weather-future__detail">
                                            <div class="weather-future__detail-time">{{ time.time }}</div>

                                            <template v-for="detail in detailsPeriod" :key="detail.name">
                                                <div class="weather-future__detail-item">
                                                    <div class="weather-future__detail-name">
                                                        {{ detail.name }}
                                                    </div>
                                                    <div class="weather-future__detail-value">
                                                        {{ time[detail.value] + detail.symbol }}
                                                    </div>
                                                </div>
                                            </template>

                                        </div>
                                    </template>

                                </div>
                            </scroll-container>
                        </div>
                    </div>
                </template>

                <div class="weather-future__summary-back" ref="summaryBack"></div>
                <div class="weather-future__detail-back" ref="detailsBack"></div>
            </div>
        </div>
    </div>
</template>

<script>
import ScrollContainer from "@/components/ScrollContainer";
import ButtonMenu from "@/components/ButtonMenu";
import { mapGetters } from "vuex";
import gsap from "gsap";
import helpers from "@/helpers/helpers";

export default {
    name: "WeatherCardFuture",
    components: { ScrollContainer, ButtonMenu },
    props: {
        weather:   { type: Object, required: true },
        id:        { type: String, required: true },
        city:      { type: Object, required: true },
        timestamp: { required: true },
        isActive:  { default: true },
    },

    data() {
        return {
            activePeriod: false,
            summaryButtons: {}
        }
    },

    computed: {
        ...mapGetters({
            store_symbolsOfCurrentUserSettings: 'settings/symbolsOfCurrentUserSettings'
        }),

        weatherInfo() {
            const { date } = this.weather
            return {
                city: this.city.name,
                date: `${ date.weekday }, ${ date.monthday } ${ date.year }`
            }
        },

        detailsPeriod() {
            const { windSpeed, pressure, visibility } = this.store_symbolsOfCurrentUserSettings.weatherUnits
            return [
                { name: 'Температура', value: 'temp',          symbol: '°'              },
                { name: 'Ощущается',   value: 'tempFeelsLike', symbol: '°'              },
                { name: 'Ветер',       value: 'windSpeed',     symbol: ' ' + windSpeed  },
                { name: 'Давление',    value: 'pressure',      symbol: ' ' + pressure   },
                { name: 'Влажность',   value: 'humidity',      symbol: '%'              },
                { name: 'Видимость',   value: 'visibility',    symbol: ' ' + visibility },
                { name: 'Облачность',  value: 'clouds',        symbol: '%'              },
            ]
        }
    },

    methods: {
        animate({ show, direction }) {
            const { card, title, summary, summaryActive, summaryBack, details, detailsBack } = this.$refs
            const activeDetails = details.find(el => el.dataset.period === this.activePeriod)
            const items = helpers.arrShuffle([title, ...summary])
            const activeItems = window.innerWidth >= 560
                ? [summaryActive, activeDetails, detailsBack, summaryBack]
                : [summaryActive, activeDetails]
            const staggerItems = 0.3 / items.length
            const timeoutItems = direction ? 0 : staggerItems
            const timeoutActiveItems = direction ? 0.3 : 0
            const delay = show ? 0.7 : 0
            const timeline = gsap.timeline({
                defaults: {
                    duration: 0.6,
                    ease: show ? 'power1.out' : 'power1.in',
                    x: direction ? card.clientWidth : -card.clientWidth
                }
            })

            timeline.set(card, { x: 200 * (!direction - 0.5) * !show + '%' })
            timeline.from(items, { stagger: staggerItems, delay: delay + timeoutItems }, 0)
            timeline.from(activeItems, { delay: delay + timeoutActiveItems }, 0)

            if (show) {
                timeline.call(() => this.$emitter.emit('weather-card__day-is-changing', show))
            }
        },

        changePosition({ prev, next, direction }) {
            this.summaryButtons[this.activePeriod] = false
            if (next === this.timestamp) this.animate({ show: true,  direction })
            if (prev === this.timestamp) this.animate({ show: false, direction })
        },

        changePeriod(e) {
            this.activePeriod = e.target.dataset.period
            for (const key in this.summaryButtons) {
                this.summaryButtons[key] = key === this.activePeriod ? !this.summaryButtons[key] : false
            }
        },

        periodsToggle(name, value) {
            const elem = this.$refs.details.find(el => el.dataset.period === name)
            const classesToggle = () => {
                value
                    ? elem.classList.add('active-mobile')
                    : elem.classList.remove('active-mobile')

                this.$refs.details.forEach(el => {
                    el.dataset.period === this.activePeriod
                        ? el.classList.add('active')
                        : el.classList.remove('active')
                })

                elem.style.removeProperty('height')
            }

            window.innerWidth >= 560
                ? classesToggle()
                : gsap.to(elem, {
                    duration: .5,
                    ease: 'sine.out',
                    height: value ? 'auto' : 0,
                    onComplete: classesToggle
                })
        }
    },

    mounted() {
        this.$emitter.on(`weather-card__change-day_${ this.id }`, this.changePosition)
        this.activePeriod = this.weather.periods[2].name
        this.weather.periods.forEach(period => {
            this.summaryButtons[period.name] = false
            this.$watch(`summaryButtons.${ period.name }`, (value) => this.periodsToggle(period.name, value))
        })

        this.$refs.details[2].classList.add('active')
    },

    beforeUnmount() {
        this.$emitter.off(`weather-card__change-day_${ this.id }`, this.changePosition)
    }
}

</script>

<style lang="scss">
.weather-future {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    transform: translateX(100%);

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
        padding: 40px 0;

        @include w_560 {
            padding: 15px 0 30px 0;
        }
    }





    // info





    &__info {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: auto;
        row-gap: 2px;
        column-gap: 10px;
        text-transform: capitalize;
        margin-left: 3px;

        @include w_560 {
            row-gap: 0;
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

        @include w_360 {
            font-size: 11px;
        }
    }





    // periods





    &__periods {
        position: relative;
        display: grid;
        grid-template-rows: repeat(4, 90px);
        grid-template-columns: minmax(auto, 320px) minmax(280px, 1fr);
        width: 100%;

        @include w_560 {
            grid-template-rows: repeat(8, auto);
            grid-template-columns: 1fr;
        }
    }





    // summary





    &__summary {
        display: grid;
        grid-template-rows: auto auto 1fr;
        grid-template-columns: minmax(130px, 1fr) auto minmax(70px, 80px);
        padding: 15px 20px 15px 35px;
        cursor: pointer;
        z-index: 1;
        transition: opacity .3s ease-out;
        will-change: transform, opacity;

        @include w_560 {
            grid-template-columns: minmax(130px, 1fr) minmax(10px, 50px) 70px;
            padding: 15px 20px;
            will-change: transform;
        }

        & * {
            pointer-events: none;
        }

        &:not(.active):hover {
            @media (hover: hover) and (pointer: fine) {
                opacity: 0.5;
            }
        }
    }

    &__summary-back {
        position: absolute;
        top: 180px;
        left: 0;
        background-color: #3d699f;
        width: 340px;
        height: 90px;
        border-radius: $borderRadiusMedium 0 0 $borderRadiusMedium;
        transition: top .5s;
        will-change: top, transform;

        @include w_560 {
            display: none;
            will-change: auto;
        }
    }

    &__summary:nth-child(1).active ~ &__summary-back { top: 0     }
    &__summary:nth-child(3).active ~ &__summary-back { top: 90px  }
    &__summary:nth-child(5).active ~ &__summary-back { top: 180px }
    &__summary:nth-child(7).active ~ &__summary-back { top: 270px }

    &__summary-title {
        font-size: 12px;
    }

    &__summary-temp {
        font-size: 28px;
    }

    &__summary-temp-min {
        font-weight: 300;
    }

    &__summary-temp-max {
        font-weight: 700;
        padding-left: 6px;
    }

    &__summary-desc {
        font-size: 11px;
        color: rgba(#fff, 0.5);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__summary-icon {
        grid-row: 1/-1;
        grid-column: -2;
        position: relative;
        width: 100%;
        height: 60px;
    }

    &__summary-canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 128px;
        height: 128px;
    }

    &__summary-arrow {
        grid-row: 1/-1;
        grid-column: -3;
        align-self: center;
        visibility: hidden;
        position: relative;
        display: flex;
        width: 100%;
        height: 0;

        @include w_560 {
            visibility: inherit;
        }

        &:after,
        &:before {
            content: "";
            display: flex;
            position: absolute;
            top: -5px;
            left: 50%;
            background-color: rgba(#fff, 0.5);
            width: 1px;
            height: 10px;
            transform-origin: bottom;
            transition-property: transform, transform-origin, top, height;
            transition-duration: .5s;
        }

        &:after  { transform: rotate(-55deg) }
        &:before { transform: rotate(55deg)  }

        &.active {
            &:after,
            &:before {
                top: -7px;
                height: 18px;
                transform-origin: center;
            }

            &:after  { transform: rotate(45deg)  }
            &:before { transform: rotate(-45deg) }
        }
    }




    // details





    &__details {
        grid-row: 1/-1;
        grid-column: -2;
        opacity: 0;
        z-index: 1;
        pointer-events: none;
        transition-property: opacity;
        transition-duration: .5s;
        transition-timing-function: ease-out;
        will-change: transform, opacity;

        &.active {
            pointer-events: auto;
            opacity: 1;
            transition-timing-function: ease-in;
            transition-delay: .5s;

            @include w_560 {
                transition: none;
            }
        }

        @include w_560 {
            grid-row: initial;
            grid-column: initial;
            background-color: rgba(#fff, 0.9);
            height: 0;
            color: #000;
            border-radius: $borderRadiusMedium;
            margin: 0 20px;
            opacity: 1;
            overflow: hidden;
            transition: none;
            z-index: auto;
            will-change: transform, height;

            &.active-mobile {
                height: auto;
            }
        }
    }

    &__details-wrapper {
        height: 100%;
        padding: 30px 33px;

        @include w_560 {
            height: auto;
            padding: 15px 18px;
        }
    }

    &__details-content {}

    &__details-scrollbar-y {
        right: -20px;
        width: 12px;
    }

    &__detail {
        margin-bottom: 30px;

        @include w_560 {
            margin-bottom: 15px;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__detail-time {
        font-weight: 500;
        padding-bottom: 5px;

        @include w_560 {
            font-size: 14px;
            padding-bottom: 2px;
        }
    }

    &__detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 300;
        color: rgba(#fff, 0.7);
        border-bottom: 1px dashed rgba(#fff, 0.15);
        padding: 2px 0;

        &:last-child {
            border: none;
            padding-bottom: 0;
        }

        &:hover {
            color: #fff;

            @include w_560 {
                color: inherit;
                font-weight: 700;
            }
        }

        @include w_560 {
            color: #000;
            border-color: rgba(#000, 0.2);
        }
    }

    &__detail-name {
        flex: 0.6;
    }

    &__detail-value {
        flex: 0.4;
        text-align: right;
    }

    &__detail-back {
        grid-column: -2;
        grid-row: 1/-1;
        width: 100%;
        height: 100%;
        background-color: #3d699f;
        border-radius: $borderRadiusMedium;
        will-change: transform;

        @include w_560 {
            display: none;
            will-change: auto;
        }
    }
}
</style>