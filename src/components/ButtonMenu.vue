<template>
    <div class="button-menu" @click="handler">
        <div class="button-menu__item"></div>
    </div>
</template>

<script>
export default {
    name: "ButtonMenu",
    methods: {
        handler() {
            this.$emitter.emit('menu-open')
        }
    }
}
</script>

<style lang="scss">
.button-menu {
    display: none;
    width: 50px;
    height: 35px;

    @include w_980 {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @include w_560 {
        width: 40px;
        height: 28px;
    }

    @include w_360 {
        width: 20px;
        height: 15px;
    }

    &__item {
        position: relative;
        background-color: #fff;
        width: 20px;
        height: 2px;
        border-radius: 2px;

        &:before, &:after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            background-color: inherit;
            border-radius: inherit;
            width: 100%;
            height: 100%;
        }

        &:before {
            bottom: 6px;
        }

        &:after {
            top: 6px;
        }
    }
}
</style>