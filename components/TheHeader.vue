<template>
    <header v-if="!hideHeaderOnPages.includes($route.name)">
        <div class="header__body">
            <NuxtLink to="/" :class="{ active: $route.path === '/' }">INSTA ✦ TOP</NuxtLink>
            <NuxtLink to="/catalog" :class="{ active: $route.path === '/catalog' }">Каталог</NuxtLink>
            <NuxtLink to="/about" :class="{ active: $route.path === '/about' }">Инфо</NuxtLink>

            <div class="links">
                <img src="@/assets/img/acc.svg" alt="">
                <img src="@/assets/img/cart.svg" alt="">
                <img src="@/assets/img/cash.svg" alt="">
            </div>
            <div class="active-indicator" :style="indicatorStyle"></div>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            hideHeaderOnPages: ['login', 'register'],
        }
    }
}
</script>
<style lang="scss" scoped>
header {
    position: fixed;
    display: flex;
    justify-content: center;
    padding: 50px 0 0;
    width: 100%;
    z-index: 100;

    .header__body {
        display: flex;
        align-items: center;
        gap: 4.6;
        padding: 5px 7px;
        background: #000;
        border-radius: 50px;

        .links {
            margin-left: 15px;
            margin-right: 15px;
            display: flex;
            gap: 30px;
        }

        .active {
            background: #fff !important;
            color: #000 !important;
        }

        a {
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 125%;
            /* 20px */
            text-transform: uppercase;
            font-family: var(--int);
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            transition: all .3s ease;
            padding: 10px;
        }
    }
}
</style>