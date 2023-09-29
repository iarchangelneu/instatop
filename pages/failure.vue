<template>
    <div class="page">
        <prevPage></prevPage>
        <h1></h1>
        <div class="text-center">
            <h2>НЕУДАЧНАЯ ТРАНЗАКЦИЯ</h2>

            <NuxtLink to="/refill">повторить</NuxtLink>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<script setup>
useSeoMeta({
    title: 'Неудачная транзакция | InstaTop',
    ogTitle: 'Неудачная транзакция | InstaTop',
    description: 'Неудачная транзакция | InstaTop',
    ogDescription: 'Неудачная транзакция | InstaTop',
})
</script>
<style lang="scss" scoped>
.page {
    padding: 150px 100px 150px;

    h2 {
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        /* 48px */
        text-transform: uppercase;
        font-family: var(--int);
        color: #000;
        margin: 0;
    }

    a {
        text-decoration: none;
        display: inline-block;
        background: #000;
        border-radius: 40px;
        border: 0;
        padding: 10px 60px;
        margin-top: 38px;

        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-transform: uppercase;
        font-family: var(--int);
        color: #fff;
    }

    h1 {
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: uppercase;
        font-family: var(--int);
        color: #000;
        margin: 20px 0 8.594vw;
    }
}
</style>