<template>
    <div class="page">
        <h1>отображаемое имя</h1>

        <div class="user__info">
            <div class="avatar__area">
                <img src="@/assets/img/avabig.png" class="ava" alt="">

                <div class="user__stats">
                    <div>
                        <h2>250 000</h2>
                        <span>подписчиков</span>
                    </div>
                    <div>
                        <h2>322</h2>
                        <span>поста в профиле</span>
                    </div>

                    <a href="instagram.com/iarchangelmkn">
                        <img src="@/assets/img/instico.svg" alt="">
                        <span>@USERNAME</span>
                    </a>
                </div>
            </div>

            <div class="bio__area">
                <div class="user__desc">
                    <h2>bio</h2>
                    <div v-html="bio"></div>

                    <h2>публикации</h2>

                    <div class="user__images">
                        <img src="@/assets/img/userimg.png" alt="">
                        <img src="@/assets/img/userimg.png" alt="">
                        <img src="@/assets/img/userimg.png" alt="">
                        <img src="@/assets/img/userimg.png" alt="">
                        <img src="@/assets/img/userimg.png" alt="">
                        <img src="@/assets/img/userimg.png" alt="">
                    </div>
                </div>
            </div>

            <div class="desc__area">
                <h1>описание для заказчика</h1>

                <div v-html="description"></div>
            </div>
        </div>

        <div class="user__products">
            <div class="product" v-for="product in products" :key="product.id">
                <span>{{ product.name }}</span>

                <div class="add__product">
                    <div class="buttons">
                        <button @click="addToCart(product)" v-if="product.count === 0">+ Добавить</button>
                        <div class="counter" v-else>
                            <img src="@/assets/img/count-.svg" alt="" @click="decrement(product)">
                            <small>{{ product.count }}</small>
                            <img src="@/assets/img/count+.svg" alt="" @click="increment(product)">
                        </div>
                    </div>
                    <small v-if="product.count <= 0">{{ product.price }} ₸</small>
                    <small v-else>{{ product.price * product.count }} ₸</small>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button @click="sendCart()" ref="sendCart" :class="{ show: cart.length > 0 }">Добавить в корзину</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            bio: 'Домашние будни, кофе и кошечка <br> — блог можно вести с любовью, я покажу <br> занимаюсь smm, визуалом и помогаю в продвижении',
            description: 'Привет, дорогие друзья и потенциальные партнеры! Меня зовут [Имя блогера], и я - ваш будущий союзник в мире рекламы и продвижения. <br><br> Моя площадка - это место, где творится магия: качественный контент, лояльная аудитория и, конечно, ваш продукт или услуга. Я горжусь тем, что могу предложить вам уникальную возможность продвижения вашего бренда перед тысячами преданных подписчиков. <br><br> Сотрудничество со мной - это гарантированный способ донести вашу историю и ценности до тех, кто действительно заинтересован. Моя аудитория - это [описание вашей аудитории], которая активно взаимодействует с моим контентом и доверяет моим рекомендациям.',
            products: [
                { id: 1, name: 'сторис нативная', price: 10000, count: 0 },
                { id: 2, name: 'сторис макет', price: 8000, count: 0 },
                { id: 3, name: 'публикация нативная', price: 25000, count: 0 },
                { id: 4, name: 'публикация макет', price: 20000, count: 0 },
            ],
            cart: [],
        }
    },
    methods: {
        sendCart() {
            this.products.forEach((product) => {
                product.count = 0;
            });
            this.$refs.sendCart.innerHTML = 'Товары добавлены в корзину'
            this.$refs.sendCart.disabled = true

            setTimeout(() => {
                this.cart = [];
                this.$refs.sendCart.disabled = false
                this.$refs.sendCart.innerHTML = 'Добавить в корзину'
            }, 500);
        },
        addToCart(product) {
            if (product.count === 0) {
                product.count = 1;
            }
            const existingProduct = this.cart.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.count = product.count;
            } else {
                this.cart.push({ id: product.id, count: product.count });
            }
        },
        decrement(product) {
            if (product.count > 0) {
                product.count--;
                const existingProductIndex = this.cart.findIndex((item) => item.id === product.id);
                if (existingProductIndex !== -1) {
                    if (product.count === 0) {
                        this.cart.splice(existingProductIndex, 1); // Удаляем товар из массива cart
                    } else {
                        this.cart[existingProductIndex].count = product.count;
                    }
                }
            }
        },
        increment(product) {
            product.count++;
            const existingProduct = this.cart.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.count = product.count;
            }
        },
    },
}
</script>
<script setup>
useSeoMeta({
    title: 'Страница блогера | InstaTop',
    ogTitle: 'Страница блогера | InstaTop',
    description: 'Страница блогера | InstaTop',
    ogDescription: 'Страница блогера | InstaTop',
})
</script>
<style lang="scss" scoped>
.page {
    padding: 150px 100px 60px;

    .text-center {
        margin-top: 40px;

        .show {
            opacity: 1;
        }

        button {
            opacity: 0;
            padding: 12px 25px;
            background: #000;
            border: 0;
            border-radius: 40px;

            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 125%;
            /* 20px */
            text-transform: uppercase;
            font-family: var(--int);
            color: #fff;
            transition: all .3s ease;
        }
    }

    .user__products {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(403px, 1fr));
        gap: 34px;
        grid-auto-flow: dense;
        margin-top: 55px;

        .product {
            background: #000;
            border-radius: 40px;
            padding: 25px 25px 15px;

            display: flex;
            flex-direction: column;
            gap: 80px;

            .add__product {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .counter {
                    display: flex;
                    gap: 23px;
                    align-items: center;

                    img {
                        cursor: pointer;
                    }
                }

                button {
                    padding: 12px 25px;
                    background: #fff;
                    border: 0;
                    border-radius: 40px;

                    font-size: 20px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 125%;
                    /* 25px */
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #000;
                }

                small {
                    font-size: 32px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 125%;
                    /* 40px */
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #fff;
                }
            }

            span {
                font-size: 24px;
                font-style: normal;
                font-weight: 600;
                line-height: 125%;
                /* 30px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #fff;
            }
        }
    }

    .user__info {
        display: flex;
        align-items: flex-start;
        gap: 67px;
    }

    .desc__area {
        border-radius: 40px;
        background: #000;
        padding: 22px 28px 44px;
        min-width: 19.115vw;

        h1 {
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            text-align: center;
            line-height: 125%;
            /* 25px */
            text-transform: uppercase;
            font-family: var(--int);
            color: #fff;
            margin: 0 0 21px;
        }

        div {
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            font-family: var(--int);
            color: #fff;
            max-width: 311px;
        }
    }

    .bio__area {
        margin-top: 35px;
        width: 100%;

        .user__desc {
            .user__images {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
                gap: 30px;
                grid-auto-flow: dense;
                margin-top: 36px;

                img {
                    border-radius: 20px;
                    width: 100%;
                    height: 241px;
                    object-fit: cover;
                }
            }

            div {
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 125%;
                font-family: var(--int);
                color: #000;
                margin-bottom: 25px;
                margin-top: 5px;
            }

            h2 {
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: 125%;
                /* 25px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #000;
                margin: 0;
            }
        }
    }

    .avatar__area {
        margin-top: 35px;

        .user__stats {
            margin-top: 29px;
            padding: 18px 0 28px;
            background: #000;
            border-radius: 40px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;

            div {
                margin-bottom: 20px;
            }

            h2 {
                font-size: 40px;
                font-style: normal;
                font-weight: 600;
                line-height: 125%;
                /* 50px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #fff;
                margin: 0;
            }

            span {
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: 125%;
                /* 25px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #fff;
            }

            a {
                display: inline-flex;
                justify-content: center;
                margin-top: 14px;
                gap: 18px;
                align-items: center;

                span {
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 125%;
                    /* 30px */
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #fff;
                }
            }
        }

        .ava {
            width: 19.583vw;
            height: 19.583vw;
            object-fit: cover;
        }
    }

    h1 {
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: 125%;
        text-transform: uppercase;
        font-family: var(--int);
        color: #000;
        margin: 0 0 30px;
    }
}
</style>