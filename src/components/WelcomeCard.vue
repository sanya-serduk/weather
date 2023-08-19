<template>
    <div class="welcome-card">
        <div class="welcome-card__content">
            <div class="welcome-card__icon">
                <weather-icon code="10d"/>
            </div>
            <div class="welcome-card__title">
                Погода
            </div>
            <div class="welcome-card__form">
                <search-form :mobile-result-static="true"/>
                <div class="welcome-card__search-services">

                    <template v-for="service in searchServicesOptions">
                        <div
                            class="welcome-card__search-services-btn"
                            :class="{ 'active': service.value === searchServicesCurrent }"
                            @click="store_changeUserSetting({ path: searchServicesPath, value: service.value })"
                        >
                            {{ service.name }}
                        </div>
                    </template>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "WelcomeCard",
    components: { SearchForm },

    computed: {
        ...mapGetters({
            store_userSettings: 'settings/userSettings'
        }),

        searchServicesCurrent() {
            return this.store_userSettings.searchServices.current
        },

        searchServicesPath() {
            return this.store_userSettings.searchServices.path
        },

        searchServicesOptions() {
            const { symbol, types } = this.store_userSettings.searchServices
            return [
                {
                    name: symbol.yandex,
                    value: types.yandex,
                },
                {
                    name: symbol.openweathermap,
                    value: types.openweathermap,
                },
            ]
        },
    },

    methods: {
        ...mapActions({
            store_changeUserSetting: 'settings/changeUserSetting'
        })
    }
}
</script>

<style lang="scss">
.welcome-card {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($colorBlue, 0.95);
    width: 100%;
    height: 100%;
    min-width: 280px;
    max-width: 900px;
    max-height: 450px;
    border: 1px solid rgba(#000, 0.5);
    box-shadow: 0 0 20px -10px #000;
    border-radius: $borderRadiusLarge;
    padding: 20px;

    @include w_768 {
        background: none;
        height: auto;
        max-height: none;
        border: none;
        border-radius: 0;
        box-shadow: none;
    }

    @include w_560 {
        align-items: flex-start;
    }

    &__content {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto 1fr;
        gap: 12px 30px;
        width: 100%;
        max-width: 650px;
        margin-top: 32px;

        @include w_560 {
            grid-template-rows: auto auto 1fr;
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 22px 30px;
            margin-top: 0;
        }
    }

    &__title {
        align-self: end;
        font-size: 55px;
        font-weight: 300;
        line-height: 1;

        @include w_560 {
            display: none;
        }
    }

    &__icon {
        grid-row: 1 / 3;
        position: relative;
        width: 220px;
        height: 162px;
        pointer-events: none;

        @include w_768 {
            width: 160px;
        }

        @include w_560 {
            grid-row: 1;
            width: 220px;
            height: 220px;
        }

        & canvas {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 320px;
            height: 320px;

            @include w_768 {
                transform: translate(-56%, -50%);
            }

            @include w_560 {
                transform: translate(-50%, -50%);
            }

            @include w_360 {
                width: 280px;
                height: 280px;
            }
        }
    }

    &__form {
        width: 100%;
    }

    &__search-services {
        display: flex;
        justify-content: flex-end;
        flex-flow: row wrap;
        margin-top: 5px;
        padding: 0 5px;
    }

    &__search-services-btn {
        font-size: 14px;
        color: rgb(#fff, 0.5);
        cursor: pointer;
        transition: color .3s ease-out;

        &:hover, &.active {
            color: #fff;
        }

        &:not(:last-child):after {
            content: "/";
            color: rgba(#fff, 0.5);
            margin: 0 5px;
        }
    }
}
</style>