<template>
    <div class="page">
        <div class="text-center">
            <img src="@/assets/img/authlogo.svg" class="img-fluid" alt="">
        </div>
        <div class="form">
            <h1>регистрация</h1>

            <input type="email" name="email" id="email" v-model="password_repeat" placeholder="E-mail">
            <input type="text" name="name" id="name" v-model="name" placeholder="Отображаемое имя">
            <input type="password" name="password" id="password" v-model="password" placeholder="Пароль">
            <input type="password" name="password_repeat" id="password_repeat" v-model="password_repeat"
                placeholder="Повторите пароль">

            <div class="type">
                <button :class="{ active: type == 'buyer' }" @click="type = 'buyer'">ЗАКАЗЧИК</button>
                <button :class="{ active: type == 'bloger' }" @click="type = 'bloger'">БЛОГЕР</button>
            </div>

            <label class="custom-checkbox text-left">
                <input type="checkbox">
                <p class="checkbox-text m-0">Я согласен с <NuxtLink to="/terms">пользовательским соглашением
                    </NuxtLink>
                    и <NuxtLink to="/polytics">политикой конфиденциальности</NuxtLink>
                </p>
            </label>

            <button>ЗАРЕГИСТРИРОВАТЬСЯ</button>

            <div class="text-center">
                <span>
                    Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            password_repeat: '',
            name: '',
            type: 'bloger',
        }
    }
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