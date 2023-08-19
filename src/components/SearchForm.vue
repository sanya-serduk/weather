<template>
    <div class="search-form">
        <form
            class="search-form__body"
            :class="{ 'search-form__body_static-mobile': mobileResultStatic }"
            @submit.prevent="eventPreHandler($event, eventSubmit)"
        >
            <input
                class="search-form__input"
                type="text"
                placeholder="Введите город"
                spellcheck="false"
                @input="eventPreHandler($event, eventInput)"
                @keydown.up.exact.prevent="eventArrowUp"
                @keydown.down.exact.prevent="eventArrowDown"
                @focus.capture="eventPreHandler($event, eventFocus)"
                @blur="eventPreHandler($event, eventBlur)"
                :disabled="weatherLoading"
                :readonly="inputReadOnly"
                ref="input"
            >
            <ul
                class="search-form__result"
                :class="{ 'active': isOpenResult }"
                @mousedown.prevent="eventResultMousedown"
                @mousemove="eventResultMousemove"
                @mouseout="eventResultMouseout"
            >

                <template v-if="errorText">
                    <li class="search-form__result-item search-form__result-error">
                        <div class="search-form__result-error-text">
                            {{ errorText }}
                        </div>
                        <div
                            class="search-form__result-error-button"
                            data-type="error-close"
                        >
                            <svg-inline name="close"/>
                        </div>
                    </li>
                </template>

                <template v-for="(item, i) in resultData" :key="item.id">
                    <li
                        class="search-form__result-item"
                        :class="{ 'active': i === activeResult }"
                        data-type="city"
                        :data-index="i"
                    >
                        <div class="search-form__result-item-name">
                            {{ item.name }}
                        </div>
                        <div class="search-form__result-item-desc">
                            {{ item.description }}
                        </div>
                    </li>
                </template>

            </ul>
            <div class="search-form__icon">
                <svg-inline name="search"/>
            </div>
            <loader-points-line
                class="search-form__loader"
                class-point="search-form__loader-point"
                :play="resultLoading || weatherLoading"
            />
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoaderPointsLine from "@/components/LoaderPointsLine";
import SvgInline from "@/components/SvgInline";
import MESSAGES from "@/constants/MESSAGES";

export default {
    name: "SearchForm",
    components: { SvgInline, LoaderPointsLine },

    props: {
        mobileResultStatic: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            inputValueTemp: '',
            inputFocus: false,
            resultData: [],
            activeResult: -1,
            resultLoading: false,
            weatherLoading: false,
            lastDateSearchCity: 0,
            errorTextApi: '',
            errorLastEvent: '',
            errorEvents: [
                'focus',
                'blur',
                'submit',
                'input',
                'api-response-error',
                'close-error'
            ]
        }
    },

    computed: {
        ...mapGetters({
            store_weatherList: 'weather/list',
            store_maxWeatherCard: 'settings/maxWeatherCard'
        }),

        isLimitWeatherCards() {
            return this.store_weatherList.length === this.store_maxWeatherCard
        },

        isOpenResult() {
            return this.inputFocus && !!(this.resultData.length || this.errorText)
        },

        inputReadOnly() {
            return this.inputFocus && this.isLimitWeatherCards
        },

        ERROR_MESSAGES() {
            return {
                DEFAULT: '',
                API_RESPONSE_ERROR: this.errorTextApi,
                ...MESSAGES.SEARCH_FORM
            }
        },

        errorText() {
            const errors = {
                ['MAX_WEATHER_CARD']: (
                    this.inputFocus
                    && this.isLimitWeatherCards
                ),
                ['EMPTY_REQUEST']: (
                    this.errorLastEvent === 'submit'
                    && !this.inputReadOnly
                    && this.activeResult === -1
                    && !this.$refs.input.value
                ),
                ['NOT_SELECTED']: (
                    this.errorLastEvent === 'submit'
                    && !this.inputReadOnly
                    && this.$refs.input.value
                    && this.resultData.length
                ),
                ['API_RESPONSE_ERROR']: (
                    this.errorLastEvent === 'api-response-error'
                ),
                ['DEFAULT']: true
            }

            const key = Object.keys(errors).find(key => errors[key])
            return this.ERROR_MESSAGES[key]
        }
    },

    methods: {
        ...mapActions({
            store_citySearch: 'city/search',
            store_weatherAdd: 'weather/add'
        }),

        setErrorLastEvent(event) {
            if (!this.errorEvents.includes(event)) {
                return
            }

            this.errorLastEvent = event
        },

        eventPreHandler(e, handler) {
            this.setErrorLastEvent(e.type)

            if (typeof handler === 'function') {
                handler(e)
            }
        },

        eventFocus(e) {
            this.inputFocus = true

            if (this.$refs.input.value && !this.resultData.length) {
                this.searchCity(this.$refs.input.value)
            }
        },

        eventBlur(e) {
            this.inputFocus = false
        },

        eventInput(e) {
            this.inputValueTemp = this.$refs.input.value
            this.activeResult = -1

            if (this.$refs.input.value.length) {
                this.searchCity(this.$refs.input.value)
            } else {
                this.resultData.length = 0
            }
        },

        eventArrowUp(e) {
            this.activeResult += this.activeResult === -1
                ? this.resultData.length
                : -1

            this.setResultToInput()
        },

        eventArrowDown(e) {
            this.activeResult += this.activeResult === this.resultData.length - 1
                ? -this.resultData.length
                : 1

            this.setResultToInput()
        },

        eventResultMousemove(e) {
            if (e.target.dataset.type !== 'city') {
                return
            }

            this.activeResult = Number(e.target.dataset.index)
        },

        eventResultMouseout(e) {
            this.activeResult = -1
        },

        eventResultMousedown(e) {
            const type = e.target.dataset.type

            if (type === 'city') {
                this.eventSubmit(e)
            }

            if (type === 'error-close') {
                this.closeErrorMessage()
            }
        },

        eventSubmit(e) {
            if (this.activeResult === -1) {
                if (this.$refs.input.value && !this.resultData.length) {
                    this.searchCity(this.$refs.input.value)
                }

                return
            }

            this.setResultToInput()
            this.addWeather()
        },

        eventApiResponse(type, text) {
            if (type === 'error') {
                this.errorTextApi = text
                this.setErrorLastEvent('api-response-error')
            }
        },

        closeErrorMessage() {
            this.setErrorLastEvent('close-error')

            if (!this.resultData.length) {
                this.$refs.input.blur()
            }
        },

        setResultToInput() {
            this.$refs.input.value = this.activeResult === -1
                ? this.inputValueTemp
                : this.resultData[this.activeResult].name
        },

        searchCity(value) {
            const date = Date.now()
            this.lastDateSearchCity = date
            this.resultLoading = true

            setTimeout(() => {
                if (date !== this.lastDateSearchCity) {
                    return
                }

                this.store_citySearch(value)
                    .then(data => {
                        if (this.$refs.input.value.length && date === this.lastDateSearchCity) {
                            this.resultData = data
                        }
                    })
                    .catch(text => {
                        if (this.$refs.input.value.length && date === this.lastDateSearchCity) {
                            this.resultData.length = 0
                            this.eventApiResponse('error', text)
                        }
                    })
                    .finally(() => {
                        if (date === this.lastDateSearchCity) {
                            this.resultLoading = false
                        }
                    })
            }, 1000)
        },

        addWeather() {
            this.$refs.input.blur()
            this.weatherLoading = true

            this.store_weatherAdd(this.resultData[this.activeResult])
                .then(data => {
                    this.$refs.input.value = ''
                    this.inputValueTemp = ''
                    this.activeResult = -1
                    this.resultData.length = 0
                })
                .catch(text => {
                    this.activeResult = -1
                    this.$refs.input.value = this.inputValueTemp
                    this.$refs.input.disabled = false
                    this.$refs.input.focus()
                    this.eventApiResponse('error', text)
                })
                .finally(() => {
                    this.weatherLoading = false
                })
        }
    }
}
</script>

<style lang="scss">
.search-form {
    position: relative;
    width: 100%;
    min-height: 50px;

    &__icon {
        position: absolute;
        top: 15px;
        left: 18px;

        & svg {
            width: 18px;
            height: 18px;
            fill: rgba($colorGrayBlue, 0.7);
        }
    }

    &__input:focus ~ &__icon svg {
        fill: #000;
    }

    &__body {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        width: 100%;
        border: 1px solid rgba(#000, 0.8);
        box-shadow: 0 0 20px -10px #000;
        border-radius: $borderRadiusMedium;
        overflow: hidden;

        &_static-mobile {
            @include h_640 {
                position: static;
            }
        }
    }

    &__input {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #000;
        width: 100%;
        height: 48px;
        border: none;
        border-radius: $borderRadiusMedium;
        padding: 0 46px;
        user-select: auto;

        &:disabled {
            color: rgba($colorGrayBlue, 0.7);
        }

        &:focus {
            outline: none;
        }

        &::placeholder {
            font-family: Roboto, sans-serif;
            font-weight: 400;
            color: rgba($colorGrayBlue, 0.7);
        }

        &:read-write:focus::placeholder {
            opacity: 0;
        }
    }

    &__result {
        display: none;
        margin: 0;
        padding: 0;
        list-style: none;

        &.active {
            display: block;
        }
    }

    &__result-item {
        border-top: 1px solid rgba($colorGrayBlue, 0.1);
        margin-bottom: -1px;
        padding: 10px 18px;
        cursor: pointer;
        transition: background-color .1s ease-out;

        & * {
            pointer-events: none;
        }

        &:last-child {
            margin-bottom: 0;
        }

        &.active {
            background-color: rgba($colorBlue, 0.2);
        }
    }

    &__result-item-name {
        font-size: 12px;
        color: #000;
    }

    &__result-item-desc {
        font-size: 12px;
        color: rgba($colorGrayBlue, 0.8);
    }

    &__result-error {
        position: relative;
        cursor: auto;
        padding-right: 38px;
    }

    &__result-error-text {
        font-size: 12px;
        color: #e00000;
    }

    &__result-error-button {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 0 12px;
        pointer-events: auto;
        cursor: pointer;
        transition: opacity 0.2s ease-out;

        &:hover {
            opacity: 0.5;
        }

        & svg {
            width: 14px;
            height: 14px;
            fill: #e00000;
            margin-top: 10px;
        }
    }

    &__loader {
        position: absolute;
        top: 22px;
        right: 16px;
    }

    &__loader-point {
        background-color: $colorGrayBlue;
        width: 6px;
        height: 6px;
        box-shadow: none;
        margin: 0 0 0 1px;
    }
}
</style>