<template>
    <div class="page">
        <div class="text-center">
            <img src="@/assets/img/authlogo.svg" class="img-fluid" alt="">
        </div>
        <div class="form">
            <h1>регистрация</h1>

            <input type="email" name="email" id="email" v-model="email" placeholder="E-mail" ref="email">
            <input type="text" name="insta" id="insta" v-if="userType == 'bloger'" v-model="insta"
                placeholder="Введите имя вашего instagram аккаунта" ref="inst" @input="removeAtSymbol">
            <input type="text" name="name" id="name" v-model="name" placeholder="Отображаемое имя" ref="name">
            <select name="" class="d-none" id="" v-if="userType == 'bloger'" v-model="selectedCategory" ref="select">
                <option value="" selected disabled>
                    Категория пользователя
                </option>
                <option v-for="(category, index) in categories" :key="index" :value="category.id">{{ category.name
                }}
                </option>
            </select>
            <input type="password" name="password" id="password" v-model="password" placeholder="Пароль" ref="password">
            <input type="password" name="password_repeat" id="password_repeat" v-model="password_repeat"
                placeholder="Повторите пароль" ref="repeat__password">

            <div class="type">
                <button :class="{ active: userType == 'buyer' }" @click="userType = 'buyer'">ЗАКАЗЧИК</button>
                <button :class="{ active: userType == 'bloger' }" @click="userType = 'bloger'">БЛОГЕР</button>
            </div>

            <label class="custom-checkbox text-left">
                <input type="checkbox" v-model="checked">
                <p class="checkbox-text m-0" ref="checked">Я согласен с <NuxtLink to="/terms">пользовательским соглашением
                    </NuxtLink>
                    и <NuxtLink to="/polytics">политикой конфиденциальности</NuxtLink>
                </p>
            </label>
            <small>{{ error }}</small>
            <button @click="register" v-if="!wait">ЗАРЕГИСТРИРОВАТЬСЯ</button>
            <div id='circle' v-else>
                <div class='One_circle'>
                    <div class='Two_circle'>
                        <div class='Three_circle'>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <span>
                    Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
                </span>
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
            email: '',
            insta: '',
            password: '',
            selectedCategory: 0,
            password_repeat: '',
            name: '',
            error: '',
            userType: 'bloger',
            checked: false,
            pathUrl: 'https://instatop.kz',
            wait: false,
            categories: [
                { id: 1, name: 'Развлечения' },
                { id: 2, name: 'Путешествия' },
                { id: 3, name: 'Мода и стиль' },
                { id: 4, name: 'Красота и уход' },
                { id: 5, name: 'Кулинария' },
                { id: 6, name: 'Наука и образование' },
                { id: 7, name: 'Бизнес' },
                { id: 8, name: 'Фитнес и здоровье' },
                { id: 9, name: 'Творчество' },
                { id: 10, name: 'Родительство и семья' },
            ],
        }
    },
    methods: {
        removeAtSymbol() {
            const input = this.insta.trim();

            if (input.startsWith('https://www.instagram.com/')) {
                const url = new URL(input);
                const pathSegments = url.pathname.split('/');
                if (pathSegments.length > 1) {
                    this.insta = pathSegments[1];
                } else {
                    this.insta = '';
                }
            } else {
                this.insta = input.replace(/^@/, '');
            }
        },
        register() {
            const buyer = `${this.pathUrl}/api/main/registration/buyer`
            const seller = `${this.pathUrl}/api/main/registration/seller`
            const csrf = this.getCSRFToken()

            if (this.email !== '') {
                this.error = ''
                this.$refs.email.style.borderColor = '#000'




                if (this.password != 0 && this.password == this.password_repeat) {
                    this.$refs.password.style.borderColor = '#000'
                    this.$refs.repeat__password.style.borderColor = '#000'
                    this.error = ''

                    if (this.checked) {
                        this.$refs.checked.style.color = '#000'
                        if (this.name !== '') {
                            this.$refs.name.style.borderColor = '#000'
                            this.error = ''
                            if (this.userType == 'bloger') {
                                // if (this.selectedCategory > 0) {
                                if (this.insta !== '') {
                                    this.error = ''
                                    this.$refs.inst.style.borderColor = '#000'


                                    this.$refs.select.style.borderColor = '#000'
                                    this.wait = true
                                    this.error = ''
                                    axios.defaults.headers.common['X-CSRFToken'] = csrf;
                                    // axios.defaults.headers.common['X-Pinggy-No-Screen'] = 'Pisda'
                                    axios
                                        .post(seller, { first_name: this.name, password: this.password, username: this.email, email: this.email, inst_username: this.insta })
                                        .then((res) => {

                                            document.cookie = `Authorization=${res.data.token}; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/`;
                                            console.log(res)
                                            localStorage.setItem('accountType', res.data.redirect_url)
                                            window.location.href = res.data.redirect_url
                                        })
                                        .catch((error) => {
                                            if (error.response.data.detail) {
                                                this.error = error.response.data.detail
                                            }
                                            this.error = 'Ошибка на стороне сервера'
                                            console.log(error.response);
                                        });
                                    // }
                                    // else {
                                    //     this.error = 'Выберите категорию'
                                    //     this.$refs.select.style.borderColor = 'red'
                                    // }
                                }
                                else {
                                    this.error = 'Вы не указали имя пользователя instagram'
                                    this.$refs.inst.style.borderColor = 'red'
                                    this.wait = false
                                }

                            }
                            else {
                                axios.defaults.headers.common['X-CSRFToken'] = csrf;
                                this.error = ''
                                this.wait = true
                                axios
                                    .post(buyer, { first_name: this.name, email: this.email, password: this.password, username: this.email, email: this.email })
                                    .then((res) => {

                                        document.cookie = `Authorization=${res.data.token}; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/`;
                                        console.log(res)
                                        localStorage.setItem('accountType', res.data.redirect_url)
                                        window.location.href = '/'
                                    })
                                    .catch((error) => {
                                        console.log(error.responseS);
                                        this.error = error.response.data.detail
                                    });
                            }

                        }
                        else {
                            this.error = 'Вы не заполнили имя'
                            this.$refs.name.style.borderColor = 'red'
                        }
                    }
                    else {
                        this.$refs.checked.style.color = 'red'
                        this.error = 'Вы не согласились с условиями'
                    }
                }
                else {
                    this.error = 'Пароли не совпадают'
                    this.$refs.password.style.borderColor = 'red'
                    this.$refs.repeat__password.style.borderColor = 'red'
                }

            }
            else {
                this.error = 'Вы не указали почту'
                this.$refs.email.style.borderColor = 'red'
            }
        },
        getCategoryName(categoryId) {
            const category = this.categories.find((c) => c.id === categoryId);
            return category ? category.name : "";
        },
    },
    mounted() {
        const accType = localStorage.getItem('accountType')
        if (accType == 'buyer-account') {
            window.location.href = '/buyer-account'
        }
        else if (accType == 'seller-account') {
            window.location.href = '/seller-account'
        }
        else {
            console.log('not authorized')
        }
    },
}
</script>
<script setup>
useSeoMeta({
    title: 'Регистрация | InstaTop',
    ogTitle: 'Регистрация | InstaTop',
    description: 'Регистрация | InstaTop',
    ogDescription: 'Регистрация | InstaTop',
})
</script>
<style lang="scss" scoped>
#circle {

    height: 150px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px auto 0;
    animation: slider 4.2s ease-in alternate-reverse infinite;
}

.One_circle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    animation: slider 3.6s ease-in-out alternate-reverse infinite;
}

.Two_circle {
    // height: 10px;
    // width: 100px;
    // animation: slider 4.8s ease-in-out alternate-reverse infinite;
}

.Three_circle {
    height: 60px;
    width: 60px;
    animation: slider 2.8s ease-in-out alternate infinite;
}

@keyframes slider {
    to {
        border: 4px outset #ccc;
        border-radius: 100%;
        /*     transform: rotate(-260deg); */
    }

    from {
        border: 4px solid #ccc;
        border-radius: 20%;
        transform: rotate(360deg);
        background: radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf)
    }
}

@media (max-width:620px) {
    #circle {
        height: 200px;
        width: 200px;
    }

    .One_circle {
        height: 125px;
        width: 125px;
    }

    .Three_circle {
        height: 50px;
        width: 50px;
    }
}

.page {
    padding: 115px 0 0;

    @media (max-width: 1024px) {
        padding: 100px 20px 50px;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    small {
        color: red;
        font-family: var(--int);
        font-size: 14px;
        margin-bottom: 20px;
        display: block;
    }

    .form {
        margin-top: 100px;

        span {
            margin-top: 20px;
            display: block;

            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 110%;
            font-family: var(--int);
            color: #000;

            a {
                text-decoration: underline;
                color: #000;
            }
        }

        button {
            background: #000;
            border-radius: 40px;
            padding: 11px 0;
            border: 0;
            width: 100%;

            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 110%;
            font-family: var(--int);
            color: #fff;
        }

        label {
            margin: 20px 0;
            display: block;
        }

        p {
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 130%;
            font-family: var(--int);
            color: #000;
            max-width: 388px;

            a {
                text-decoration: underline;
                color: #000;
            }
        }

        .type {
            display: flex;

            .active {
                background: #000 !important;
                color: #fff !important;
            }

            button {
                flex: 1;
                padding: 11px 0;
                background: transparent;
                border: 2px solid #000;
                border-radius: 10px;


                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: 110%;
                font-family: var(--int);
                color: #000;
                transition: all .3s ease;

                &:first-child {
                    border-right: 0;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                &:last-child {
                    border-left: 0;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }

        input,
        select {
            display: block;
            width: 433px;

            margin: 0 0 20px;

            padding: 11px 20px;
            border-radius: 10px;
            border: 3px solid #000;
            background: transparent;

            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 110%;
            font-family: var(--int);
            color: #000;

            @media (max-width: 1024px) {
                width: 100%;
            }
        }

        h1 {
            font-size: 56px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-transform: uppercase;
            font-family: var(--int);
            color: #000;
            text-align: center;

            margin: 0 0 30px;

            @media (max-width: 1024px) {
                font-size: 32px;
            }
        }
    }
}

// .custom-checkbox p {
//     font-family: var(--int);
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 130%;
//     color: #000;
//     white-space: nowrap;
//     text-transform: uppercase;
//     max-width: 388px;
// }

.custom-checkbox input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    border-radius: 3px;
}

.custom-checkbox .checkbox-text:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 2px solid #000;
    border-radius: 3px;
    margin-bottom: 3px;
}

.custom-checkbox input[type="checkbox"]:checked+.checkbox-text:before {
    content: url('@/assets/img/check.svg');
    font-size: 16px;
    color: black;
    text-align: center;
    line-height: 20px;
    background: transparent;
}

.custom-checkbox {
    margin-bottom: 22px;

}

.custom-checkbox:last-child {
    margin-bottom: 0 !important;

    @media (max-width: 1024px) {
        margin-bottom: 22px !important;
    }
}
</style>