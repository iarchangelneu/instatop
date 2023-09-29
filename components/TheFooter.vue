<template>
    <footer v-if="!hideFooterOnPages.includes($route.name)">
        <img src="@/assets/img/footerlogo.svg" alt="">
    </footer>
</template>
<script>
export default {
    data() {
        return {
            hideFooterOnPages: ['login', 'register'],
        }
    }
}
</script>
<style lang="scss" scoped>
footer {
    display: flex;
    padding: 50px;
    background: #000;
    margin: 0 100px;
    border-radius: 60px;

    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
</style>