<template>
    <div v-if="cart.length <= 0" class="text-center empty">
        <h1>Ваша Корзина Пуста</h1>
    </div>
    <div class="page" v-else>
        <prevPage></prevPage>
        <h1>корзина</h1>

        <div class="cart">
            <div class="cart__items">
                <div class="cart__item" v-for="item in calculatedSales" :key="item.id">
                    <img :src="item.seller.inst_info.profile_pic_url" alt="" class="cart">

                    <div class="cart__info">
                        <div class="name">
                            <h2>@{{ item.seller.inst_username }}</h2>
                            <img src="@/assets/img/deletecart.svg" @click="deleteFromCart(item.id)" style="cursor: pointer;"
                                alt="">
                        </div>
                        <h3 v-for="product in item.products">
                            {{ product.product.name }} x{{ product.amount }}
                        </h3>
                        <!-- <h3>Сторис макет х3</h3>
                        <h3>Публикация нативная х1</h3> -->

                        <div class="text-right">
                            <span>{{ item.totalAmount.toLocaleString() }} ₸</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="complete__buy">
                <h2>Подтверждение покупки</h2>

                <div class="mb-4">
                    <span>блогеров: {{ totalSellers }}</span>
                    <span>публикаций: {{ totalProducts }}</span>
                </div>

                <span>итоговая сумма: {{ totalAmount.toLocaleString() }} ₸</span>
                <small>Сумма будет списана с вашего счета</small>

                <div class="text-center">
                    <button @click="buyProduct()" ref="buyBtn">продолжить оформление</button>
                </div>
            </div>
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
            cart: [],
            pathUrl: 'https://instatop.kz',
        }
    },
    computed: {
        calculatedSales() {
            return this.cart.map(cart => {
                const totalAmount = cart.products.reduce((sum, product) => {
                    return sum + (product.amount * product.product.price);
                }, 0);
                return {
                    ...cart,
                    totalAmount
                };
            });
        },

        totalAmount() {
            return this.calculatedSales.reduce((sum, item) => sum + item.totalAmount, 0);
        },
        totalSellers() {
            return this.cart.length;
        },
        totalProducts() {
            return this.cart.reduce((sum, cartItem) => {
                return sum + cartItem.products.reduce((productSum, product) => {
                    return productSum + product.amount;
                }, 0);
            }, 0);
        },
    },
    methods: {
        increment(item) {
            item.amount++;
            console.log(item)
            this.changeAmount(item)
        },
        decrement(item) {
            if (item.amount > 0) {
                item.amount--;
                console.log(item)
                this.changeAmount(item)
            }
            if (item.amount <= 0) {
                item.amount = 1
                this.deleteFromCart(item.id)
            }
        },
        buyProduct() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/buyer/placed-basket`
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            this.$refs.buyBtn.innerHTML = 'Оформляем'
            axios
                .get(path)
                .then(response => {
                    console.log(response)
                    if (response.status == 204) {
                        this.$refs.buyBtn.innerHTML = 'Недостаточно средств'
                    }
                    if (response.status == 201) {
                        // this.getBuyer()
                        this.$refs.buyBtn.innerHTML = 'Оплата прошла успешно'



                        setTimeout(() => {
                            window.location.href = `/completed/1`
                        }, 3);

                    }
                })
                .catch(error => {
                    console.error(error)
                })

        },
        changeAmount(item) {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/buyer/all-product-basket`;
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;

            axios
                .put(path, item)
                .then((res) => {
                    console.log(res)
                    //     this.getCart()
                })
                .catch((error) => {
                    console.error(error);

                });
        },
        deleteFromCart(id) {
            const token = this.getAuthorizationCookie()
            const csrf = this.getCSRFToken()
            const path = `${this.pathUrl}/api/buyer/delete-product-basket/${id}`
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios.defaults.headers.common['X-CSRFToken'] = csrf;
            axios
                .put(path)
                .then(response => {
                    console.log(response)
                    this.getCart()
                })
                .catch(error => {
                    console.error(error)
                })
        },
        getCart() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/buyer/all-product-basket`;
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;

            axios
                .get(path)
                .then(response => {
                    this.cart = response.data
                })
                .catch(error => {
                    console.error(error)
                })
        },
    },
    mounted() {
        this.getCart()
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
.empty {
    padding: 150px 0 0 0;

    h1 {
        font-size: 40px;
        font-family: var(--int);

        @media (max-width: 1024px) {
            font-size: 20px;
        }
    }
}

body {
    background: #fff !important;
}

.page {
    padding: 150px 100px;

    @media (max-width: 1600px) {
        padding: 150px 50px 50px;
    }

    @media (max-width: 1024px) {
        padding: 150px 20px 50px;
    }

    .cart {
        display: flex;
        align-items: flex-start;
        gap: 8.333vw;

        @media (max-width: 1024px) {
            flex-direction: column;
            gap: 40px;
        }

        .complete__buy {
            background: #000;
            padding: 30px;
            border-radius: 40px;
            width: 100%;
            max-width: 530px;

            @media (max-width: 1024px) {
                max-width: 100%;

                padding: 30px 20px;
            }

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

                @media (max-width: 1024px) {
                    width: 100%;
                    padding: 10px 0;
                }
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

                @media (max-width: 1024px) {
                    font-size: 16px;
                    margin: 0 0 20px;
                }
            }
        }

        .cart__items {
            display: flex;
            flex-direction: column;
            gap: 40px;
            width: 100%;
            max-width: 1030px;

            @media (max-width: 1024px) {
                max-width: 100%;
                gap: 30px;
            }

            .cart__item {
                display: flex;
                gap: 67px;
                width: 100%;

                @media (max-width: 1024px) {
                    gap: 15px;
                }

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

                        @media (max-width: 1024px) {
                            font-size: 16px;
                            margin: 0 0 10px;
                        }
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

                        @media (max-width: 1024px) {
                            font-size: 16px;
                            margin: 0 0 10px;
                        }
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

                        @media (max-width: 1024px) {
                            font-size: 16px;
                        }
                    }

                    .text-right {
                        margin-top: auto;

                        @media (max-width: 1024px) {
                            text-align: left !important;
                            margin-top: 0;
                        }
                    }
                }

                .cart {
                    width: 17.344vw;
                    height: 17.344vw;
                    border-radius: 100%;
                    object-fit: cover;

                    @media (max-width: 1024px) {
                        width: 100px;
                        height: 100px;
                    }
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

        @media (max-width: 1024px) {
            font-size: 24px;
            margin: 20px 0 20px;
        }
    }
}
</style>