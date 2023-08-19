<template>
    <router-view v-slot="{ Component }">
        <transition mode="out-in" :duration="800">
            <component :is="Component"/>
        </transition>
    </router-view>
    <page-loader/>
</template>

<script>
import PageLoader from "@/components/PageLoader";

export default {
    name: 'App',
    components: { PageLoader }
}
</script>

<style lang="scss">
body {
    background: $colorBlue url("~@/assets/img/background.jpg") center / cover no-repeat fixed;
    font-family: Roboto, sans-serif;
    font-weight: 400;
}

#app {
    width: 100%;
    height: 100%;
    color: #fff;
    overflow: hidden;

    @include w_768 {
        background-color: rgba($colorBlue, 0.95);
    }
}
</style>