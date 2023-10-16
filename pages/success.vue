<template>
    <div class="page">
        <prevPage></prevPage>
        <h1></h1>
        <div class="text-center">
            <h2>ТРАНЗАКЦИЯ ПРОШЛА УСПЕШНО</h2>

            <NuxtLink to="/">перейти на главную</NuxtLink>
        </div>
    </div>
</template>
<script>
import global from '~/mixins/global';
import axios from 'axios';
export default {
    mixins: [global],
    data() {
        return {
            pathUrl: 'https://instatop.kz',
        }
    }
    ,
    methods: {
        sendRequest(reference) {
            const token = this.getAuthorizationCookie();
            const path = `${this.pathUrl}/api/money/success/${reference}`;
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios
                .get(path)
                .then(response => {
                    console.log(response)
                    if (response.status == 200) {
                        //  window.location.href = '/'
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
    mounted() {
        const url = window.location.href;
        const match = url.match(/order_pay_instatop_(\d+)/);

        if (match) {
            this.extractedValue = match[0];
            console.log(this.extractedValue);

            this.sendRequest(match[0])
        }
    },
}
</script>
<script setup>
useSeoMeta({
    title: 'Успешная транзакция | InstaTop',
    ogTitle: 'Успешная транзакция | InstaTop',
    description: 'Успешная транзакция | InstaTop',
    ogDescription: 'Успешная транзакция | InstaTop',
})
</script>
<style lang="scss" scoped>
.page {
    padding: 150px 100px 150px;

    @media (max-width: 1600px) {
        padding: 150px 50px 150px;
    }

    @media (max-width: 1024px) {
        padding: 150px 20px 50px;
    }

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

        @media (max-width: 1024px) {
            font-size: 18px;
        }
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