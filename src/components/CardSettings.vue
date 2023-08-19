<template>
    <div class="card-settings" :class="{ 'active': isOpen || isAnimateClose }" tabindex="-1" @blur.self="close">
        <div class="card-settings__wrapper" ref="wrapper">
            <div class="card-settings__wrapper-view">
                <div class="card-settings__inner" ref="inner">
                    <div class="card-settings__head">
                        <div class="card-settings__icon-open" ref="btnOpen" @click="open">
                            <svg-inline name="settings"/>
                        </div>
                        <div class="card-settings__title">Настройки</div>
                        <div class="card-settings__icon-close" @click="close">
                            <svg-inline name="close"/>
                        </div>
                    </div>
                    <div class="card-settings__options">

                        <template v-for="option in options" :key="option.name">
                            <div class="card-settings__option">
                                <div class="card-settings__option-name" ref="optionsName">
                                    {{ option.name }}
                                </div>
                                <div class="card-settings__option-value" ref="optionsValue">
                                    <div class="card-settings__switch">

                                        <template v-for="item in option.switch" :key="item.name">
                                            <div
                                                class="card-settings__switch-btn"
                                                :class="{ 'active': option.value === item.value }"
                                                @click="changeSetting(option.path, item.value)"
                                            >
                                                {{ item.name }}
                                            </div>
                                        </template>

                                    </div>
                                </div>
                            </div>
                        </template>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import gsap from "gsap";
import SvgInline from "@/components/SvgInline";

export default {
    name: "CardSettings",
    components: { SvgInline },

    data() {
        return {
            isOpen: false,
            isAnimateClose: false
        }
    },

    computed: {
        ...mapGetters({
            store_userSettings: 'settings/userSettings'
        }),

        options() {
            const { temp, pressure, windSpeed, visibility } = this.store_userSettings.weatherUnits
            const searchServices = this.store_userSettings.searchServices
            const option = (name, option) => {
                return {
                    name,
                    path: option.path,
                    value: option.current,
                    switch: Object.keys(option.types).map(type => {
                        return {
                            name: option.symbol[type],
                            value: option.types[type],
                        }
                    })
                }
            }

            return [
                option('Единица измерения температуры', temp),
                option('Единица измерения атмосферного давления', pressure),
                option('Единица измерения скорости ветра', windSpeed),
                option('Единица измерения видимости', visibility),
                option('Сервис поиска', searchServices),
            ]
        }
    },

    methods: {
        ...mapActions({
            store_changeUserSetting: 'settings/changeUserSetting'
        }),

        changeSetting(path, value) {
            this.store_changeUserSetting({ path, value })
        },

        open() {
            if (this.isOpen) {
                return
            }

            this.isOpen = true
            const { wrapper, inner, btnOpen, optionsName, optionsValue } = this.$refs
            const tl = gsap.timeline({ defaults: {
                    ease: 'sine.out'
                }
            })

            tl.set(optionsName,  { translateX: -inner.clientWidth + 'px' })
            tl.set(optionsValue, { translateX:  inner.clientWidth + 'px' })
            tl.to(wrapper, { duration: 0.6, width: 'auto', height: 'auto' }, 0)
            tl.to(btnOpen, { duration: 0.6, width: '60px', height: '100%' }, 0)
            tl.to(optionsName,  { duration: 0.6, translateX: '0', stagger: 0.1 }, 0.1)
            tl.to(optionsValue, { duration: 0.6, translateX: '0', stagger: 0.1 }, 0.1)
        },

        close() {
            if (!this.isOpen) {
                return
            }

            this.isOpen = false
            this.isAnimateClose = true
            const { wrapper, inner, btnOpen, optionsName, optionsValue } = this.$refs
            const wrapperTimeout = optionsName.length * 0.1
            const tl = gsap.timeline({
                defaults: {
                    ease: 'sine.out'
                },
                onComplete: () => {
                    this.isAnimateClose = false
                }
            })

            tl.to(optionsName,  { duration: 0.8, translateX: -inner.clientWidth + 'px', stagger: 0.1 }, 0)
            tl.to(optionsValue, { duration: 0.8, translateX:  inner.clientWidth + 'px', stagger: 0.1 }, 0)
            tl.to(wrapper, { duration: 0.6, width: '100%', height: '100%' }, wrapperTimeout)
            tl.to(btnOpen, { duration: 0.6, width: '80px', height: '100%' }, wrapperTimeout)
            tl.set([ wrapper, optionsName, optionsValue, btnOpen ], { clearProps: 'all' })
        }
    }
}
</script>

<style lang="scss">
.card-settings {
    position: relative;
    width: 80px;
    height: 50px;
    outline: none;
    border-radius: $borderRadiusMedium;

    @include w_980 {
        width: auto;
        height: auto;
        margin-top: 20px;
    }

    &__wrapper {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 20px -10px #000;
        border-radius: $borderRadiusMedium;
        overflow: hidden;

        @include w_980 {
            position: static;
            box-shadow: none;
            border-radius: 0;
            overflow: visible;
        }
    }

    &__wrapper-view {
        background-color: rgba($colorGrayBlue, 1);
        width: 100%;
        height: 100%;
        border: 1px solid rgba(#000, 0.5);
        border-radius: $borderRadiusMedium;
        transition: background-color .3s ease-out;

        @include w_980 {
            border: none;
            border-radius: 0;
            padding: 0 5px;
        }
    }

    &:not(.active) &__wrapper-view:hover {
        background-color: rgba($colorBlue, 0.95);

        @include w_980 {
            background-color: inherit;
        }
    }

    &__inner {
        min-width: 320px;
        margin: -1px;

        @include w_980 {
            min-width: auto;
        }
    }

    &__head {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
    }

    &__title {
        flex: 1;

        @include w_980 {
            font-weight: 700;
        }
    }

    &__icon-open {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 100%;

        @include w_980 {
            justify-content: flex-start;
            width: 30px;
            pointer-events: none;
        }

        & svg {
            fill: #fff;
            width: 16px;
            height: 16px;
        }
    }

    &:not(.active) &__icon-open {
        cursor: pointer;
    }

    &.active &__icon-open {
        pointer-events: none;
    }

    &__icon-close {
        align-self: flex-end;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 100%;
        cursor: pointer;
        transition: background-color .3s ease-out;

        @include w_980 {
            display: none;
        }

        &:hover {
            background-color: rgba(#000, 0.1);
        }

        & svg {
            fill: #fff;
            width: 22px;
            height: 22px;
        }
    }

    &__option {
        display: flex;
        border-top: 1px solid rgba(#fff, 0.05);
        padding: 20px 0;
    }

    &__option-name {
        align-self: center;
        flex: 1;
        display: flex;
        font-size: 12px;
        padding-left: 20px;

        @include w_980 {
            padding-left: 0;
        }
    }

    &__option-value {
        padding-right: 20px;
        margin-left: 40px;

        @include w_980 {
            padding-right: 0;
        }

        @include w_768 {
            margin-left: 20px;
        }
    }

    &__switch {
        display: flex;
        flex-flow: row wrap;
        font-size: 12px;
        box-shadow: 0 0 15px rgba(#000, 0.3);
        border-radius: $borderRadiusSmall;
        overflow: hidden;
    }

    &__switch-btn {
        flex: 1;
        text-align: center;
        white-space: nowrap;
        padding: 6px 12px;
        cursor: pointer;

        &.active {
            background-color: $colorBlue;
        }
    }
}
</style>