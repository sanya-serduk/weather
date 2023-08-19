<template>
    <div class="weather-forecast" :class="{ 'active': isActive }">
        <div class="weather-forecast__name">{{ name }}</div>
        <div class="weather-forecast__date">{{ date }}</div>
        <div class="weather-forecast__icon">
            <weather-icon
                class="weather-forecast__icon-canvas"
                :code="icon"
                :animate="this.isActiveIcon"
            />
        </div>
        <div class="weather-forecast__temp">
            <div class="weather-forecast__temp-min" v-if="tempMin">{{ tempMin }}</div>
            <div class="weather-forecast__temp-max">{{ tempMax }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WeatherCardForecast",
    props: {
        name         : { type: String,  required: true },
        date         : { type: String,  required: true },
        icon         : { type: String,  required: true },
        tempMin      : { type: String,  default: '' },
        tempMax      : { type: String,  required: true },
        isActive     : { type: Boolean, default: false },
        isActiveIcon : { type: Boolean, default: false }
    }
}
</script>

<style lang="scss">
.weather-forecast {
    background-color: rgba(#000, 0.08);
    border: 1px solid rgba(#000, 0.3);
    border-radius: $borderRadiusSmall;
    width: 100%;
    min-width: 130px;
    max-width: 200px;
    padding: 15px;
    cursor: pointer;
    transition: background-color .2s ease-out;

    @include w_560 {
        padding: 10px;
        min-width: 115px;
    }

    & * {
        pointer-events: none;
    }

    &:hover {
        background-color: rgba(#000, 0.12);
    }

    &.active {
        background-color: rgba(#000, 0.12);
        pointer-events: none;
        animation: weather-forecast-active .6s cubic-bezier(0.33, 1, 0.68, 1);

        @keyframes weather-forecast-active {
            40%  { transform: scale(0.98); }
            100% { transform: none; }
        }
    }

    &__name {
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        text-transform: capitalize;

        @include w_560 {
            font-size: 11px;
        }
    }

    &__date {
        font-size: 11px;
        text-align: center;
        color: rgba(#fff, 0.5);
        text-transform: capitalize;

        @include w_560 {
            font-size: 11px;
        }
    }

    &__icon {
        position: relative;
        width: 80px;
        height: 85px;
        margin: 5px auto 0 auto;

        @include w_560 {
            display: none;
        }
    }

    &__icon-canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 128px;
        height: 128px;

        @include w_560 {
            width: 0;
            height: 0;
        }
    }

    &__temp {
        display: flex;
        justify-content: center;

        @include w_560 {
            margin: 15px 0 5px 0;
        }
    }

    &__temp-min {
        font-size: 16px;
        text-indent: 0.38em;

        @include w_560 {
            font-size: 16px;
        }

        &:after {
            content: "°";
        }
    }

    &__temp-max {
        font-size: 28px;
        font-weight: 500;
        text-indent: 0.38em;

        @include w_560 {
            font-size: 24px;
        }

        &:after {
            content: "°";
        }
    }
}
</style>