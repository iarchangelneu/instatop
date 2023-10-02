<template>
    <div class="page">
        <h1>личный кабинет</h1>

        <div class="navs">
            <div>
                <button :class="{ activeBtn: activeTab == 0 }" @click="activeTab = 0">заказы</button>
                <button :class="{ activeBtn: activeTab == 1 }" @click="activeTab = 1">транзакции</button>
            </div>
            <div>
                <button :class="{ activeBtn: activeTab == 3 || activeTab == 7 }" @click="activeTab = 3">обратная
                    связь</button>
                <button :class="{ activeBtn: activeTab == 4 }" @click="activeTab = 4">аккаунт</button>
            </div>
        </div>

        <div class="sales" v-if="activeTab == 0">
            <div class="sales__item" v-for="item in calculatedSales" :key="item.id">
                <img src="@/assets/img/sales.png" alt="">

                <div class="item__info">
                    <h2>ЗАКАЗ №{{ item.id }}</h2>

                    <div class="items" v-for="product in item.products">
                        <h3>{{ product.product.name }}</h3>
                        <span>х{{ product.amount }}</span>
                    </div>
                    <div class="price">
                        <h4>{{ item.totalAmount.toLocaleString() }} ₸</h4>
                        <button @click="createChat(item.seller.id, item.seller.user.first_name)">ЧАТ С продавцом</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="chats" v-if="activeTab == 3">
            <div class="chat__item" v-for="chat in chats" :key="chat.id">
                <div>
                    <h2>{{ chat.seller.user.first_name }}</h2>
                    <!-- <small>23.07.2023 14:47</small> -->
                </div>

                <div class="justify-content-end">
                    <button @click="openChat(chat.id, chat.seller.user.first_name)">Открыть чат</button>
                </div>
            </div>
        </div>

        <div class="acc__info" v-if="activeTab == 4">
            <div class="inp">
                <label for="email">Эл.почта</label>
                <input type="email" v-model="email" placeholder="Эл.почта">
                <div class="text-right">
                    <button class="save">сохранить изменения</button>
                </div>
            </div>
            <div class="inp">
                <label for="password">Пароль</label>
                <input type="password" placeholder="Пароль">
                <div class="text-left">
                    <button @click="logOut()">выйти из аккаунта</button>
                </div>
            </div>
        </div>

        <TheTrans v-if="activeTab == 1" :transactions="transactions"></TheTrans>
        <TheMessanger v-if="activeTab == 7" :chatId="chatId" :name="chatName"></TheMessanger>
    </div>
</template>
<script>
import global from '~/mixins/global';
import axios from 'axios';
export default {
    mixins: [global],
    data() {
        return {
            activeTab: 0,
            account: [],
            password: '',
            email: '',
            buys: [],
            sendId: null,
            chatId: null,
            myId: null,
            transactions: [],
            pathUrl: 'https://instatop.kz',
            chats: [],
            seller: [],
        }
    },
    computed: {
        calculatedSales() {
            return this.buys.map(buy => {
                const totalAmount = buy.products.reduce((sum, product) => {
                    return sum + (product.amount * product.product.price);
                }, 0);
                return {
                    ...buy,
                    totalAmount
                };
            });
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
            return formattedDate;
        },
        getAccount() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/buyer/buyer-lk`;
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios
                .get(path)
                .then(response => {
                    this.account = response.data
                    this.myId = response.data.id
                    this.transactions = response.data.transactions
                    this.email = response.data.user.email

                })
                .catch(error => console.log(error));
        },
        openChat(chatId, chatName) {
            this.activeTab = 7;
            this.chatId = chatId;
            this.chatName = chatName
        },
        getBuys() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/buyer/buyer-lk/my-purchases`
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios
                .get(path)
                .then(response => {
                    this.buys = response.data
                })
                .catch(error => {
                    console.error(error)
                })
        },
        createChat(id, name) {
            const token = this.getAuthorizationCookie()
            const csrf = this.getCSRFToken()
            const path = `${this.pathUrl}/api/messanger/new-chat`
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios.defaults.headers.common['X-CSRFToken'] = csrf;
            axios
                .post(path, {
                    buyer: this.myId,
                    seller: id,
                })
                .then(response => {
                    const chatId = response.data.chat_id
                    this.openChat(chatId, name)
                })
                .catch(error => console.log(error))
        },
        getChats() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/messanger/all-chats`
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios
                .get(path)
                .then(res => {
                    this.chats = res.data
                })
                .catch(error => console.log(error))
        }
    },
    mounted() {
        const accType = localStorage.getItem('accountType')
        console.log(accType)
        if (accType == 'buyer-account') {
            this.getAccount()
            this.getChats()
            this.getBuys()
        }
        else {
            window.location.href = '/login'
        }
    }
}
</script>
<script setup>
useSeoMeta({
    title: 'Личный кабинет | InstaTop',
    ogTitle: 'Личный кабинет | InstaTop',
    description: 'Личный кабинет | InstaTop',
    ogDescription: 'Личный кабинет | InstaTop',
})
</script>
<style lang="scss" scoped>
.page {
    padding: 150px 100px 145px;

    @media (max-width: 1600px) {
        padding: 150px 50px 145px;
    }

    @media (max-width: 1024px) {
        padding: 150px 20px 70px;
    }

    .acc__info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;
        margin: 10.417vw 0;

        @media (max-width: 1024px) {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 20px;
        }

        .save {
            @media (max-width: 1024px) {
                display: none;
            }
        }

        .inp {
            @media (max-width: 1024px) {
                width: 100%;
            }
        }

        label,
        input {
            display: block;
        }

        label {
            margin-bottom: 10px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            font-family: var(--int);
            color: #000;
        }

        input {
            border: 2px solid #000;
            background: transparent;
            border-radius: 10px;
            padding: 10px;

            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 130%;
            font-family: var(--int);
            color: #000;
            width: 23.438vw;

            &::placeholder {
                color: #000;
            }

            @media (max-width: 1024px) {
                width: 100%;
            }
        }

        button {
            border: 0;
            background: #000;
            padding: 10px 20px;
            border-radius: 20px;

            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-transform: uppercase;
            font-family: var(--int);
            color: #fff;
            margin-top: 50px;

            transition: all .3s ease;



            @media (max-width: 1024px) {
                margin-top: 20px;
            }
        }
    }

    .chats {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(546px, 1fr));
        gap: 41px;
        grid-auto-flow: dense;
        margin-top: 40px;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
            gap: 20px;
        }

        .chat__item {
            border-radius: 40px;
            background: #000;
            padding: 30px 20px;

            .justify-content-end {
                @media (max-width: 1024px) {
                    justify-content: flex-start !important;
                }

            }

            div {
                display: flex;
                justify-content: space-between;
                align-items: center;

                h2,
                small {
                    margin: 0;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    font-family: var(--int);
                    color: #fff;
                }

                button {
                    margin-top: 30px;
                    padding: 10px 30px;
                    background: #fff;
                    border-radius: 40px;
                    border: 0;

                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 130%;
                    font-family: var(--int);
                    color: #000;

                    transition: all .3s ease;

                    // &:hover {
                    //     color: #fff;
                    //     background: var(--btn);
                    // }
                }
            }
        }
    }

    .sales {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(760px, 1fr));
        gap: 50px;
        grid-auto-flow: dense;
        margin-top: 55px;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .sales__item {
            background: #000;
            padding: 40px;
            border-radius: 40px;
            display: flex;
            gap: 40px;

            @media (max-width: 1024px) {
                flex-direction: column;
                gap: 20px;
                padding: 20px;
            }

            .item__info {
                width: 100%;
                display: flex;
                flex-direction: column;

                h2 {
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #fff;
                    margin: 0 0 30px;

                    @media (max-width: 1024px) {
                        margin: 0 0 10px;
                        font-size: 16px;
                    }
                }

                .items {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    margin: 0 0 20px;

                    &:last-child {
                        margin: 0 !important;
                    }

                    @media (max-width: 1024px) {
                        margin: 0 0 10px;
                        justify-content: flex-start;

                        gap: 20px;
                    }
                }

                h3,
                span {
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #fff;
                    margin: 0;
                }

                span {
                    text-transform: none;
                }

                .price {
                    display: flex;
                    justify-content: space-between;
                    margin-top: auto;

                    @media (max-width: 1024px) {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    h4 {
                        font-size: 30px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        text-transform: uppercase;

                        font-family: var(--int);
                        color: #fff;

                        @media (max-width: 1024px) {
                            font-size: 16px;
                            margin-bottom: 20px;
                        }
                    }

                    button {
                        padding: 10px 20px;
                        background: #fff;
                        border: 0;
                        border-radius: 40px;

                        font-size: 16px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #000;
                    }
                }
            }

            img {
                width: 200px;
                height: 200px;
                object-fit: cover;

                @media (max-width: 1024px) {
                    width: 100px;
                    height: 100px;
                }
            }
        }
    }

    .navs {
        display: flex;
        justify-content: center;
        gap: 30px;

        @media (max-width: 1024px) {
            flex-direction: column;
            gap: 20px;
        }

        div {
            display: flex;
            gap: 30px;

            @media (max-width: 1024px) {
                gap: 20px;
            }

            .activeBtn {
                background: #000 !important;
                color: #fff !important;
            }

            button {
                padding: 10px 20px;
                border: 2px solid #000;
                background: transparent;
                border-radius: 40px;

                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 130%;
                /* 20.8px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #000;

                transition: all .3s ease;

                @media (max-width: 1024px) {
                    flex: 1;
                    padding: 10px 0;
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
        margin: 0 0 30px;

        @media (max-width: 1024px) {
            font-size: 20px;
            margin: 0 0 20px;
        }
    }
}
</style>