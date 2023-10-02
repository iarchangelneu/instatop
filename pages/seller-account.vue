<template>
    <div class="page">
        <h1>личный кабинет</h1>

        <div class="navs">
            <div>
                <button :class="{ activeBtn: activeTab == 0 }" @click="activeTab = 0">реклама</button>
                <button :class="{ activeBtn: activeTab == 1 }" @click="activeTab = 1">мои продажи</button>
            </div>
            <div>
                <button :class="{ activeBtn: activeTab == 2 }" @click="activeTab = 2">транзакции</button>
                <button :class="{ activeBtn: activeTab == 3 || activeTab == 7 }" @click="activeTab = 3">обратная
                    связь</button>
            </div>
            <div>
                <button :class="{ activeBtn: activeTab == 4 }" @click="activeTab = 4">аккаунт</button>
            </div>
        </div>



        <div class="products" v-if="activeTab == 0">
            <h2>Настройте варианты размещения рекламы на вашей странице:</h2>

            <div class="products__body">
                <div v-for="(product, index) in products" :key="product.id" class="product__item">
                    <h3>{{ product.name }}</h3>

                    <div class="edit">
                        <div class="flip-card" @click="toggleImages(product)" :class="{ 'is-flipped': product.isFlipped }">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <img v-show="!product.isFlipped" src="@/assets/img/edit.svg" alt="" />
                                </div>
                                <div class="flip-card-back">
                                    <img v-show="product.isFlipped" src="@/assets/img/ready.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <input type="checkbox" name="" hidden v-model="product.isReady" id="">
                        <h4 v-if="!product.isFlipped">{{ product.price.toLocaleString() + ' ₸' }}</h4>
                        <input v-else :ref="'input' + product.id" type="number" :disabled="product.isDisabled"
                            v-model="product.price" @keyup.enter="toggleImages(product)" />

                    </div>
                </div>
            </div>
        </div>

        <div class="sales" v-if="activeTab == 1">
            <div class="sales__body">
                <div class="sale__item" v-for="(item, index) in calculatedSales" :key="item.id">
                    <h2>ЗАКАЗ №{{ item.id }}</h2>

                    <span>
                        ДАТА Продажи: {{ formatDate(item.date) }}
                    </span>

                    <div class="count" v-for="product in item.products">
                        <span>{{ product.product.name }}</span>
                        <span>х{{ product.amount }}</span>
                    </div>


                    <div class="price">
                        <h3>{{ item.totalAmount.toLocaleString() }} ₸</h3>
                        <button @click="createChat(item.buyer.id, item.buyer.user.first_name)">ЧАТ С Покупателем</button>
                    </div>
                </div>


            </div>
        </div>

        <div class="chats" v-if="activeTab == 3">
            <div class="chat__item" v-for="chat in chats" :key="chat.id">
                <div>
                    <h2>{{ chat.buyer.user.first_name }}</h2>
                    <!-- <small>23.07.2023 14:47</small> -->
                </div>

                <div class="justify-content-end">
                    <button @click="openChat(chat.id, chat.buyer.user.first_name)">Открыть чат</button>
                </div>
            </div>
        </div>

        <div class="accs" v-if="activeTab == 4">
            <div class="account__profile">
                <div class="profile__left">
                    <div class="avatar w-100">
                        <div class="avik">
                            <img :src="account.inst_info.profile_pic_url" alt="" loading="lazy">
                        </div>

                    </div>

                </div>

                <div class="profile__right w-100">
                    <div class="inputs">
                        <div>
                            <label for="name">Отображаемое Имя</label>
                            <input type="text" id="name" v-model="name">
                        </div>
                        <div>
                            <label for="email">Эл.почта</label>
                            <input type="email" id="email" v-model="email">
                        </div>
                    </div>
                    <label for="desc">Описание профиля</label>
                    <textarea name="desc" id="desc" cols="30" rows="17" v-model="description"></textarea>
                </div>
            </div>

            <div class="buttons">
                <button @click="editAccount()" ref="edit">Сохранить изменения</button>
                <button @click="logOut">Выйти из аккаунта</button>
            </div>


        </div>

        <TheTrans v-if="activeTab == 2" :transactions="transactions"></TheTrans>
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
            email: '',
            account: [],
            activeTab: 0,
            transactions: [],
            chatId: null,
            chatName: '',
            sendId: null,
            description: '',
            name: '',
            isFlipped: false,
            isDisabled: true,
            price: 0,
            products: [],
            sales: [],
            photo: '',
            chats: [],
            avatar: null,
            myId: null,
            pathUrl: 'https://instatop.kz',
        }
    },
    computed: {
        avatarUrl() {
            if (this.avatar) {
                // Используем URL объекта File, если avatar существует
                return URL.createObjectURL(this.avatar);
            } else {
                // Используем дефолтное изображение, если avatar не существует
                return this.photo;
            }
        },
        calculatedSales() {
            return this.sales.map(sale => {
                const totalAmount = sale.products.reduce((sum, product) => {
                    return sum + (product.amount * product.product.price);
                }, 0);
                return {
                    ...sale,
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
        openEditTab(productId) {
            this.activeTab = 6;
            this.sendId = productId;
        },
        openChat(chatId, chatName) {
            this.activeTab = 7;
            this.chatId = chatId;
            this.chatName = chatName
        },
        createChat(id, name) {
            const token = this.getAuthorizationCookie()
            const csrf = this.getCSRFToken()
            const path = `${this.pathUrl}/api/messanger/new-chat`
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios.defaults.headers.common['X-CSRFToken'] = csrf;
            axios
                .post(path, {
                    buyer: id,
                    seller: this.myId,
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
                .then(response => {
                    this.chats = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getAccount() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/seller/seller-lk`;
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios
                .get(path)
                .then(response => {
                    this.account = response.data
                    this.email = response.data.user.email
                    this.description = response.data.description
                    this.name = response.data.user.first_name
                    this.sales = response.data.my_sales
                    this.photo = this.pathUrl + '/api' + response.data.photo
                    this.products = response.data.products
                    this.transactions = response.data.transactions
                    this.myId = response.data.id

                })
                .catch(error => console.log(error));
        },
        editAccount() {

            const path = `${this.pathUrl}/api/seller/seller-lk/edit/`
            const csrf = this.getCSRFToken()

            const user = {
                first_name: this.name,
                email: this.email,
            };
            const formData = new FormData();
            formData.append('user.[first_name]', this.name);
            formData.append('user.[email]', this.email);
            formData.append('description', this.description);
            axios.defaults.headers.common['X-CSRFToken'] = csrf;
            this.$refs.edit.innerHTML = 'Сохраняем'

            axios
                .put(path, formData)
                .then((res) => {
                    if (res.status == 200) {
                        this.$refs.edit.innerHTML = 'Успешно'
                        this.name = res.data.user.first_name
                        this.description = res.data.description
                        this.email = res.data.user.email
                    }
                    else {
                        this.$refs.edit.innerHTML = 'Ошибка'
                    }
                })
                .catch((error) => {
                    console.error(error);

                });
        },
        openFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.avatar = file;
                event.target.value = null;
                console.log("Выбран файл:", file);
            }
        },
        handleKeyDown(event) {
            if (event.key === 'Backspace' && !this.courseFeaturesText) {
                event.preventDefault();
                return;

            }

            const lines = this.courseFeaturesText.split('\n');
            if (lines.length >= 4 && event.key === 'Enter') {
                event.preventDefault();
                this.$refs.featuresList2.style.borderColor = 'red'
                return;
            }
        },
        formattedPrice(product) {
            return `${product.price} ₸`;
        },
        handleEnterKey(product) {
            if (product.isFlipped) {
                product.isFlipped = false;
                product.isDisabled = true;

                if (product.isReady) {
                    this.sendDataToBackend({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                    });
                }
            } else {
                product.isFlipped = true;
                product.isDisabled = false;
                this.$nextTick(() => {
                    this.$refs['input' + product.id].focus();
                });
            }
        },

        toggleImages(product) {
            if (product.isFlipped) {
                product.isFlipped = false;
                product.isDisabled = true;
                product.isReady = true;
                this.sendDataToBackend({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                });
            } else {
                product.isFlipped = true;
                product.isDisabled = false;
                this.$nextTick(() => {
                    this.$refs['input' + product.id][0].focus();
                });
            }
        },


        sendDataToBackend(data) {
            const path = `${this.pathUrl}/api/seller/seller-lk/edit-product/${data.id}`
            const csrf = this.getCSRFToken()
            axios.defaults.headers.common['X-CSRFToken'] = csrf;
            axios
                .put(path, data)
                .then((response) => {
                    console.log("Данные успешно отправлены на бэкенд", response);
                })
                .catch((error) => {
                    console.error("Ошибка при отправке данных на бэкенд", error);
                });
        },
    },
    mounted() {
        const accType = localStorage.getItem('accountType')
        console.log(accType)
        if (accType == 'seller-account') {
            this.getAccount()
            this.getChats()
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
        padding: 150px 50px 80px;
    }

    @media (max-width: 1024px) {
        padding: 150px 20px 50px;
    }

    .accs {
        .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-top: 30px;

            @media (max-width: 1024px) {
                flex-direction: column;
                align-items: flex-start;

            }

            button,
            a {
                padding: 10px 20px;
                border: 0;
                border-radius: 40px;
                background: #000;

                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 130%;
                font-family: var(--int);
                color: #fff;



                @media (max-width: 1024px) {
                    flex: 1;
                }
            }
        }
    }

    .account__profile {
        margin-top: 38px;
        display: flex;
        gap: 20px;

        @media (max-width: 1024px) {
            flex-direction: column;
            margin-top: 20px;
        }

        label,
        input {
            display: block;
        }

        label {
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            font-family: var(--int);
            color: #000;
            margin-left: 10px;
        }

        input {
            border: 2px solid #000;
            border-radius: 10px;
            padding: 10px;
            width: 336px;
            max-width: 527px;

            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 130%;
            font-family: var(--int);
            color: #000;
            background: transparent;

            @media (max-width: 1024px) {
                width: 100%;
                max-width: 100%;
                display: inline;
            }
        }


        .profile__left {
            //   width: 100%;

            .data {
                margin-top: 20px;
            }

            .avatar {
                display: flex;
                gap: 20px;
                align-items: start;

                @media (max-width: 1024px) {
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }

                .avik {
                    border-radius: 50%;
                }

                img {
                    width: 16.667vw;
                    height: 16.667vw;
                    border-radius: 100%;
                    object-fit: cover;

                    @media (max-width: 1024px) {
                        width: 320px;
                        height: 320px;
                    }
                }

                div {
                    position: relative;
                    overflow: hidden;



                    &:last-child {
                        @media (max-width: 1024px) {
                            width: 100%;
                            text-align: center;
                        }
                    }



                    .editava {
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        transition: all .3s ease;
                        transform: scaleY(0);
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.50);
                        cursor: pointer;

                        top: 0;

                        span {
                            display: flex;
                            align-items: center;

                            font-size: 10.755px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: 130%;
                            text-decoration-line: underline;
                            font-family: var(--int);
                            color: #000;
                            cursor: pointer;
                        }

                    }

                    &:hover .editava {
                        transform: scaleY(1)
                    }
                }
            }
        }

        .profile__right {
            .inputs {
                display: flex;
                gap: 30px;
                margin-bottom: 20px;

                @media (max-width: 1024px) {
                    flex-direction: column;
                }
            }

            textarea {
                width: 100%;
                display: block;
                background: transparent;
                border-radius: 10px;
                border: 2px solid #000;
                padding: 20px;

                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 130%;
                font-family: var(--int);
                color: #000;
            }
        }
    }

    .sales {
        margin-top: 30px;

        .sales__body {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(510px, 1fr));
            gap: 4.948vw;
            grid-auto-flow: dense;

            .sale__item {
                border-radius: 40px;
                background: #000;
                padding: 30px 40px;
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
                    margin: 0 0 20px;
                }

                span {
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #fff;
                    margin-bottom: 20px;
                    display: block;
                }

                .count {
                    display: flex;
                    justify-content: space-between;
                }

                .price {
                    margin-top: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    h3 {
                        font-size: 30px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #fff;
                        margin: 0;
                    }

                    button {
                        background: #fff;
                        border: 0;
                        border-radius: 40px;
                        padding: 10px 20px;

                        font-size: 16px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        text-transform: uppercase;
                        color: #000;
                        font-family: var(--int);
                    }
                }
            }
        }
    }

    .products {

        .products__body {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(403px, 1fr));
            gap: 34px;
            grid-auto-flow: dense;

            .product__item {
                border-radius: 40px;
                background: #000;
                padding: 25px 22px 20px 25px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .edit {
                    margin-top: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 20px;

                    input {
                        border: 0;
                        background: transparent;
                        max-width: 200px;

                        font-size: 32px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 125%;
                        /* 40px */
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #fff;
                    }

                    h4 {
                        font-size: 32px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 125%;
                        /* 40px */
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #fff;
                        margin: 0;
                    }

                }

                h3 {
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 125%;
                    /* 30px */
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #fff;
                    margin: 0;
                }
            }
        }

        h2 {
            margin: 45px 0 60px;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            font-family: var(--int);
            color: #000;
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

.flip-card {
    width: 50px;
    height: 50px;
    perspective: 50px;
    cursor: pointer;
}

.flip-card-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    transform: rotateY(0deg);
}

.flip-card.is-flipped .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
}

.flip-card-back {
    transform: rotateY(180deg);
}
</style>