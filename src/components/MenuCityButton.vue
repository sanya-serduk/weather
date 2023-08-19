<template>
    <div class="city-button" :class="{ 'active': isActive }" @mousedown.left="handler">
        <div class="city-button__name">{{ weather.city.name }}</div>
        <div class="city-button__desc">{{ weather.current.description }}</div>
        <div class="city-button__temp">{{ weather.current.temp }}°</div>
        <div class="city-button__icon">
            <weather-icon :code="weather.current.icon"/>
        </div>
        <div class="city-button__delete-button" data-type="remove">
            <svg-inline name="close"/>
        </div>
    </div>
</template>

<script>
import SvgInline from "@/components/SvgInline";

export default {
    name: "MenuCityButton",
    components: { SvgInline },
    props: {
        weather:  { type: Object, required: true },
        isActive: { type: Boolean, default: false },
    },

    data() {
        return {
            removed: false
        }
    },

    methods: {
        handler(e) {
            if (this.removed) return
            e.target.dataset.type === 'remove' ? this.remove() : this.change()
        },

        change() {
            this.$emitter.emit('weather-change', this.weather.id)
        },

        remove() {
            this.$emitter.emit('weather-remove', this.weather.id)
            this.removed = true
        }
    }
}
</script>

<style lang="scss">
.city-button {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr auto;
    background-color: rgba($colorGrayBlue, 0.95);
    width: 100%;
    height: 100%;
    border: 1px solid rgba(#000, 0.5);
    box-shadow: 0 0 20px -10px #000;
    border-radius: $borderRadiusMedium;
    padding: 15px 18px;
    cursor: pointer;
    overflow: hidden;
    transition: background-color ease-out .6s;
    will-change: transform, opacity, background-color;

    @include w_980 {
        background-color: $colorGrayBlue;
        transition-duration: .2s;
    }

    &.active {
        background-color: rgba($colorBlue, 0.95);
        cursor: auto;
        animation: city-button-active .6s cubic-bezier(0.33, 1, 0.68, 1);

        @include w_980 {
            background-color: $colorBlue;
            animation: none;
        }
    }

    &__name {
        grid-column: 1/-1;
        font-size: 14px;
        margin-right: 26px;
        word-break: break-word;
    }

    &__desc {
        grid-column: 1/-1;
        color: rgba(#fff, 0.5);
        font-size: 12px;
        margin: 0 26px 8px 0;
        word-break: break-word;
    }

    &__temp {
        align-self: center;
        font-size: 50px;
        font-weight: 100;
    }

    &__icon {
        position: relative;
        width: 80px;
        height: 80px;
        padding-top: 6px;

        & canvas {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 128px;
            height: 128px;
        }
    }

    &__delete-button {
        position: absolute;
        top: 0;
        right: 8px;
        width: 30px;
        height: 44px;
        border-radius: 0 0 6px 6px;
        cursor: pointer;
        transition-property: transform, background-color;
        transition-timing-function: ease-out;
        transition-duration: .3s;
        display: flex;
        justify-content: center;
        align-items: center;

        & svg {
            fill: #fff;
            width: 20px;
            height: 20px;
            pointer-events: none;
        }
    }

    @media (hover: hover) and (pointer: fine) {
        &__delete-button {
            transform: translateY(-100%);

            &:hover {
                background-color: rgba(#000, 0.2);
            }
        }

        &:hover &__delete-button {
            transform: none;
        }
    }

    @keyframes city-button-active {
        40%  {
            transform: scale(0.98);
        }
    }
}
</style>