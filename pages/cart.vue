<template>
    <div class="page">
        <prevPage></prevPage>
        <h1>корзина</h1>

        <div class="cart">
            <div class="cart__items">
                <div class="cart__item">
                    <img src="@/assets/img/cart.png" alt="" class="cart">

                    <div class="cart__info">
                        <div class="name">
                            <h2>@username</h2>
                            <img src="@/assets/img/deletecart.svg" style="cursor: pointer;" alt="">
                        </div>
                        <h3>Сторис макет х3</h3>
                        <h3>Публикация нативная х1</h3>

                        <div class="text-right">
                            <span>49 000 ₸</span>
                        </div>
                    </div>
                </div>
                <div class="cart__item">
                    <img src="@/assets/img/cart.png" alt="" class="cart">

                    <div class="cart__info">
                        <div class="name">
                            <h2>@username</h2>
                            <img src="@/assets/img/deletecart.svg" style="cursor: pointer;" alt="">
                        </div>
                        <h3>Сторис макет х3</h3>
                        <h3>Публикация нативная х1</h3>

                        <div class="text-right">
                            <span>49 000 ₸</span>
                        </div>
                    </div>
                </div>
                <div class="cart__item">
                    <img src="@/assets/img/cart.png" alt="" class="cart">

                    <div class="cart__info">
                        <div class="name">
                            <h2>@username</h2>
                            <img src="@/assets/img/deletecart.svg" style="cursor: pointer;" alt="">
                        </div>
                        <h3>Сторис макет х3</h3>
                        <h3>Публикация нативная х1</h3>

                        <div class="text-right">
                            <span>49 000 ₸</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="complete__buy">
                <h2>Подтверждение покупки</h2>

                <div class="mb-4">
                    <span>блогеров: 3</span>
                    <span>публикаций: 16</span>
                </div>

                <span>итоговая сумма: 226 000 ₸</span>
                <small>Сумма будет списана с вашего счета</small>

                <div class="text-center">
                    <button>продолжить оформление</button>
                </div>
            </div>
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
    title: 'Корзина | InstaTop',
    ogTitle: 'Корзина | InstaTop',
    description: 'Корзина | InstaTop',
    ogDescription: 'Корзина | InstaTop',
})
</script>
<style lang="scss" scoped>
body {
    background: #fff !important;
}

.page {
    padding: 150px 100px;

    .cart {
        display: flex;
        align-items: flex-start;
        gap: 8.333vw;

        .complete__buy {
            background: #000;
            padding: 30px;
            border-radius: 40px;
            width: 100%;
            max-width: 530px;

            button {
                padding: 10px 33px;
                border-radius: 40px;
                background: #FFF;
                border: 0;
                margin-top: 20px;

                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                text-transform: uppercase;
                font-family: var(--int);
                color: #000;
            }

            span,
            small {
                display: block;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                text-transform: uppercase;
                font-family: var(--int);
                color: #fff;
                margin-bottom: 10px;
            }

            small {
                font-weight: 400;
                text-transform: none;
            }

            h2 {
                text-align: center;
                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                text-transform: uppercase;
                font-family: var(--int);
                color: #fff;

                margin: 0 0 30px;
            }
        }

        .cart__items {
            display: flex;
            flex-direction: column;
            gap: 40px;
            width: 100%;
            max-width: 1030px;

            .cart__item {
                display: flex;
                gap: 67px;
                width: 100%;

                .cart__info {
                    display: flex;
                    flex-direction: column;
                    width: 100%;

                    .name {
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;
                    }

                    h2 {
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: normal;
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #000;
                        margin: 0 0 30px;
                    }

                    h3 {
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 130%;
                        /* 26px */
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #000;
                        margin: 0 0 20px;
                    }

                    span {
                        white-space: nowrap;
                        font-size: 32px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #000;
                    }

                    .text-right {
                        margin-top: auto;
                    }
                }

                .cart {
                    width: 17.344vw;
                    height: 17.344vw;
                    object-fit: cover;
                }
            }
        }
    }

    h1 {
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: uppercase;
        font-family: var(--int);
        color: #000;
        margin: 20px 0 30px;
    }
}
</style>