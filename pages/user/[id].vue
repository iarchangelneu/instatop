<template>
    <div v-if="seller.length <= 0"></div>
    <div class="page" v-else>
        <h1>{{ seller.user.first_name }}</h1>

        <div class="user__info">
            <div class="avatar__area">
                <img :src="seller.inst_info.profile_pic_url" class="ava" alt="">

                <div class="user__stats text-center">
                    <div class="stats__zone">
                        <div>
                            <h2>{{ seller.inst_info.followers_amount.toLocaleString() }}</h2>
                            <span>подписчиков</span>
                        </div>
                        <div>
                            <h2>{{ seller.inst_info.posts_amount.toLocaleString() }}</h2>
                            <span>поста в профиле</span>
                        </div>
                    </div>

                    <a :href="'https://instagram.com/' + seller.inst_username" style="text-decoration: none;">
                        <img src="@/assets/img/instico.svg" alt="">
                        <span>@{{ seller.inst_username }}</span>
                    </a>
                </div>
            </div>

            <div class="bio__area">
                <div class="user__desc">
                    <h2>bio</h2>
                    <div v-html="seller.inst_info.biography"></div>

                    <h2>публикации</h2>

                    <div class="user__images">
                        <img v-for="item in seller.inst_info.posts" :key="item.id" :src="item.url_photo" alt="">
                    </div>
                </div>
            </div>

            <div class="desc__area">
                <h1>описание для заказчика</h1>

                <div v-html="seller.description"></div>
            </div>
        </div>

        <div class="user__products">
            <div class="product" v-for="product in products" :key="product.id">
                <span>{{ product.name }}</span>

                <div class="add__product">
                    <div class="buttons">
                        <button @click="addToCart(product)" v-if="product.amount === 0">+ Добавить</button>
                        <div class="counter" v-else>
                            <img src="@/assets/img/count-.svg" alt="" @click="decrement(product)">
                            <small>{{ product.amount }}</small>
                            <img src="@/assets/img/count+.svg" alt="" @click="increment(product)">
                        </div>
                    </div>
                    <small v-if="product.amount <= 0">{{ product.price.toLocaleString() }} ₸</small>
                    <small v-else>{{ (product.price * product.amount).toLocaleString() }} ₸</small>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button @click="sendCart()" ref="cartBtn" :class="{ show: cart.length > 0 }">Добавить в корзину</button>
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
            bio: 'Домашние будни, кофе и кошечка <br> — блог можно вести с любовью, я покажу <br> занимаюсь smm, визуалом и помогаю в продвижении',
            description: 'Привет, дорогие друзья и потенциальные партнеры! Меня зовут [Имя блогера], и я - ваш будущий союзник в мире рекламы и продвижения. <br><br> Моя площадка - это место, где творится магия: качественный контент, лояльная аудитория и, конечно, ваш продукт или услуга. Я горжусь тем, что могу предложить вам уникальную возможность продвижения вашего бренда перед тысячами преданных подписчиков. <br><br> Сотрудничество со мной - это гарантированный способ донести вашу историю и ценности до тех, кто действительно заинтересован. Моя аудитория - это [описание вашей аудитории], которая активно взаимодействует с моим контентом и доверяет моим рекомендациям.',
            products: [
                { id: 1, name: 'сторис нативная', price: 10000, amount: 0 },
                { id: 2, name: 'сторис макет', price: 8000, amount: 0 },
                { id: 3, name: 'публикация нативная', price: 25000, amount: 0 },
                { id: 4, name: 'публикация макет', price: 20000, amount: 0 },
            ],
            cart: [],
            userId: this.$route.params.id,
            seller: [],
        }
    },
    methods: {
        getSeller() {
            const path = `${this.pathUrl}/api/seller/this-seller/${this.userId}`
            axios
                .get(path)
                .then(response => {
                    this.seller = response.data
                    this.products = response.data.products.map(product => ({
                        ...product,
                        amount: 0
                    }));

                })
                .catch(error => {
                    console.error(error)
                })
        },
        sendCart() {
            const path = `${this.pathUrl}/api/buyer/add-product-basket`
            const token = this.getAuthorizationCookie()
            const csrf = this.getCSRFToken()

            const products = this.cart.map(item => ({
                product: item.product,
                amount: item.amount
            }));
            console.log(products)
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios.defaults.headers.common['X-CSRFToken'] = csrf;
            axios
                .post(path, {
                    'seller': this.userId,
                    'products': products
                })
                .then(response => {
                    if (response.status == 201) {
                        this.$refs.cartBtn.innerHTML = 'Добавлен'
                        this.$refs.cartBtn.disabled = true
                        this.$refs.cartBtn.classList.add('disabled')
                    }
                    else {
                        this.$refs.cartBtn.innerHTML = 'Ошибка'
                        this.$refs.cartBtn.disabled = false

                    }
                    console.log(response)
                })
                .catch(error => {
                    console.error(error)
                })
        },
        addToCart(product) {
            if (product.amount === 0) {
                product.amount = 1;
            }
            const existingProduct = this.cart.find((item) => item.product === product.id);
            if (existingProduct) {
                existingProduct.amount = product.amount;
            } else {
                this.cart.push({ product: product.id, amount: product.amount });
            }
        },
        decrement(product) {
            if (product.amount > 0) {
                product.amount--;
                const existingProductIndex = this.cart.findIndex((item) => item.product === product.id);
                if (existingProductIndex !== -1) {
                    if (product.amount === 0) {
                        this.cart.splice(existingProductIndex, 1); // Удаляем товар из массива cart
                    } else {
                        this.cart[existingProductIndex].amount = product.amount;
                    }
                }
            }
        },
        increment(product) {
            product.amount++;
            const existingProduct = this.cart.find((item) => item.product === product.id);
            if (existingProduct) {
                existingProduct.amount = product.amount;
            }
        },
    },
    mounted() {
        this.getSeller()
    }
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

    @media (max-width: 1600px) {
        padding: 150px 50px 60px;
    }

    @media (max-width: 1024px) {
        padding: 150px 20px 60px;
    }

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

        @media (max-width: 1024px) {
            margin-top: 30px;
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
            gap: 20px;
        }

        .product {
            background: #000;
            border-radius: 40px;
            padding: 25px 25px 15px;

            display: flex;
            flex-direction: column;
            gap: 80px;

            @media (max-width: 1024px) {
                padding: 20px 0;
                gap: 10px;
                text-align: center;
            }

            .add__product {
                display: flex;
                justify-content: space-between;
                align-items: center;

                @media (max-width: 1024px) {
                    flex-direction: column-reverse;
                    gap: 30px;
                }

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

                @media (max-width: 1024px) {
                    font-size: 20px;
                }
            }
        }
    }

    .user__info {
        display: flex;
        align-items: flex-start;
        gap: 67px;

        @media (max-width: 1300px) {
            flex-direction: column;
            gap: 20px;
        }
    }

    .desc__area {
        border-radius: 40px;
        background: #000;
        padding: 22px 28px 44px;
        min-width: 19.115vw;

        @media (max-width: 1024px) {
            min-width: 100%;
            padding: 20px;
        }

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

                @media (max-width: 500px) {
                    grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
                    gap: 20px;
                    margin-top: 15px;
                }

                img {
                    border-radius: 20px;
                    width: 100%;
                    height: 241px;
                    object-fit: cover;

                    @media (max-width: 1024px) {
                        height: 165px;
                    }
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

        @media (max-width: 1024px) {
            margin-top: 0;
            width: 100%;
            text-align: center;
        }

        .user__stats {
            margin-top: 29px;
            padding: 18px 15px 28px;
            background: #000;
            border-radius: 40px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;

            div {
                margin-bottom: 20px;


            }

            @media (max-width: 1024px) {
                padding: 20px 25px 25px;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .stats__zone {
                @media(max-width: 1024px) {
                    margin-bottom: 0;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    text-align: left;
                }
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

                @media (max-width: 1024px) {
                    font-size: 16px;
                }
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

                @media (max-width: 1024px) {
                    font-size: 16px;
                    margin: 5px 0 0;
                    text-transform: none;
                }
            }

            a {
                display: inline-flex;
                justify-content: center;
                margin-top: 14px;
                gap: 18px;
                align-items: center;

                @media (max-width: 1024px) {
                    margin: 0;
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

        .ava {
            width: 19.583vw;
            height: 19.583vw;
            border-radius: 100%;
            object-fit: cover;

            @media (max-width: 1024px) {
                width: 350px;
                height: 350px;
            }
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

        @media (max-width: 1024px) {
            font-size: 20px;
            margin: 0 0 20px;
        }
    }
}
</style>