<template>
    <div class="page">
        <div class="text-center">
            <img src="@/assets/img/authlogo.svg" class="img-fluid" alt="">
        </div>
        <div class="form">
            <h1>Авторизация</h1>

            <input type="email" name="email" id="email" v-model="email" placeholder="E-mail">
            <input type="password" name="password" id="password" v-model="password" placeholder="Пароль">

            <button @click="login()">ВОЙТИ</button>

            <div class="text-center">
                <span>
                    Еще нет аккаунта?<NuxtLink to="/register">Регистрация</NuxtLink>
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
            password: '',
            password_repeat: '',
            pathUrl: 'https://instatop.kz',
            name: '',
            type: 'bloger',
        }
    },
    methods: {
        login() {
            const path = `${this.pathUrl}/api/main/authorization`
            const csrf = this.getCSRFToken()

            axios.defaults.headers.common['X-CSRFToken'] = csrf;
            axios
                .post(path, { username: this.email, password: this.password })
                .then((res) => {



                    document.cookie = `Authorization=${res.data.token}; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/`;
                    localStorage.setItem('accountType', res.data.redirect_url)
                    if (res.data.redirect_url == 'buyer-account') {
                        window.location.href = '/'
                    }
                    if (res.data.redirect_url == 'seller-account') {
                        window.location.href = '/seller-account'
                    }


                    console.log(res)
                })
                .catch((error) => {
                    console.log(error);
                    this.error = error.response.data.non_field_errors.toString()
                });
        }
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

    }
}
</script>
<script setup>
useSeoMeta({
    title: 'Авторизация | InstaTop',
    ogTitle: 'Авторизация | InstaTop',
    description: 'Авторизация | InstaTop',
    ogDescription: 'Авторизация | InstaTop',
})
</script>
<style lang="scss" scoped>
.page {
    padding: 115px 0 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

        input {
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