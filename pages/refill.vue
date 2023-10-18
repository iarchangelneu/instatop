<template>
    <div class="page">
        <div class="form">
            <h1>Пополнение счета</h1>

            <div class="type" v-if="accountType == 'buyer'">
                <NuxtLink to="/refill">Пополнение</NuxtLink>
                <NuxtLink to="/withdrawal">Вывод</NuxtLink>
            </div>

            <h2>Порядок действий для пополнения баланса</h2>
            <p>1. Подтвердите Ваше согласие с правилами нашей системы</p>

            <label class="custom-checkbox text-left">
                <input type="checkbox">
                <p class="checkbox-text m-0">Я согласен с <NuxtLink to="/terms">пользовательским соглашением
                    </NuxtLink>
                    и <NuxtLink to="/polytics">политикой конфиденциальности</NuxtLink>
                </p>
            </label>

            <p>2. Введите сумму, на которую Вы хотите пополнить личный счет, и нажмите на кнопку “Пополнить”. Вы будете
                переадресованы на сайт платежной системы, где сможете завершить платеж.</p>

            <div class="pay">
                <input type="number" v-model="count" placeholder="100 ₸">
                <button ref="inBtn" @click="inMoney">Пополнить</button>
            </div>

            <div class="selects">
                <button @click="count = 100" :class="{ selected: count == 100 }">100 ₸</button>
                <button @click="count = 1000" :class="{ selected: count == 1000 }">1000 ₸</button>
                <button @click="count = 2000" :class="{ selected: count == 2000 }">2000 ₸</button>
                <button @click="count = 5000" :class="{ selected: count == 5000 }">5000 ₸</button>
                <button @click="count = 10000" :class="{ selected: count == 10000 }">10000 ₸</button>
            </div>
        </div>
    </div>
</template>
<script>
import global from '~/mixins/global';
import axios from 'axios'
export default {
    mixins: [global],
    data() {
        return {
            count: null,
            pathUrl: 'https://instatop.kz',
        }
    },
    methods: {
        inMoney() {
            const token = this.getAuthorizationCookie()
            const csrf = this.getCSRFToken()
            const path = `${this.pathUrl}/api/money/new-pay`
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios.defaults.headers.common['X-CSRFToken'] = csrf;
            this.$refs.inBtn.innerHTML = 'ОЖИДАЙТЕ'

            axios
                .post(path, {
                    amount: this.count
                })
                .then(response => {
                    console.log(response)
                    window.location.href = response.data.url
                    if (response.status = 201) {
                        this.$refs.inBtn.innerHTML = 'ПОПОЛНИТЬ'
                    }
                    if (response.status == 228) {
                        this.$refs.outBtn.innerHTML = response.data.error_msg
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.$refs.inBtn.innerHTML = 'ПОПОЛНИТЬ'
                })
        },
    },
    mounted() {
        const accType = localStorage.getItem('accountType')
        if (accType !== 'buyer-account' && accType !== 'seller-account') {
            window.location.href = '/login'
        }
        if (accType == 'buyer-account') {
            this.accountType = 'buyer'

        }
        else if (accType == 'seller-account') {
            this.accountType = 'seller'
        }
        else {
            return
        }

    }
}
</script>
<script setup>
useSeoMeta({
    title: 'Пополнение счета | EasyHelp',
    ogTitle: 'Пополнение счета | EasyHelp',
    description: 'Пополнение счета | EasyHelp',
    ogDescription: 'Пополнение счета | EasyHelp',
})
</script>
<style lang="scss" scoped>
.page {
    //  height: 100vh;
    padding: 150px 0 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1024px) {
        padding: 150px 20px 50px;
    }

    .form {
        background: #000;
        border-radius: 40px;

        padding: 30px 40px 34px;

        @media (max-width: 1024px) {
            padding: 20px 10px;
        }

        .type {
            display: flex;

            a {
                flex: 1;
                padding: 12px 0;
                background: #fff;
                text-decoration: none;
                border-radius: 40px;
                border: 2px solid #fff;
                text-align: center;

                font-size: 24px;
                font-style: normal;
                font-weight: 500;
                line-height: 110%;
                font-family: var(--int);
                color: #000;

                &:first-child {
                    border-right: 0;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                &:last-child {
                    border-left: 0;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    background: #000;
                    color: #fff;
                }

                @media (max-width: 1024px) {
                    font-size: 16px;
                }
            }
        }

        .selects {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 23px;

            .selected {
                color: var(--btn) !important;
                background: #fff !important;
            }

            button {
                border-radius: 10px;
                border: 2px solid #fff;
                background: transparent;
                padding: 13px 13px;

                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                font-family: var(--int);
                color: #fff;

                transition: all .3s ease;
            }
        }

        .cards input {
            background: transparent;
            padding: 12px;
            border-radius: 10px;
            border: 2px solid #fff;

            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 130%;
            font-family: var(--int);
            color: #fff;

            @media (max-width: 1024px) {
                font-size: 16px;
            }
        }

        .pay {
            display: flex;
            gap: 20px;

            input {
                flex: 1;
                max-width: 227px;
                background: transparent;
                padding: 12px;
                border-radius: 10px;
                border: 1px solid #E3E3E3;
                text-align: right;

                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                line-height: 130%;
                font-family: var(--int);
                color: #fff;

                @media (max-width: 1024px) {
                    font-size: 16px;
                    max-width: 155px;
                }

                &::placeholder {
                    color: #000;
                }
            }

            button {
                flex: 1;
                padding: 12px 0;
                border-radius: 10px;
                background: #fff;
                border: 1px solid #E3E3E3;

                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: 130%;
                font-family: var(--int);
                color: var(--btn);
            }
        }

        p,
        a {
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 130%;
            font-family: var(--int);
            color: #fff;
            max-width: 535px;

            @media (max-width: 1024px) {
                font-size: 16px;
            }

            a {
                text-decoration: underline;
            }
        }

        h2 {
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 130%;
            font-family: var(--int);
            color: #fff;
            margin: 20px 0;

            @media (max-width: 1024px) {
                font-size: 16px;
                font-weight: 600;
            }
        }

        h1 {
            text-align: center;
            font-size: 32px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            font-family: var(--int);
            color: #fff;

            margin: 0 0 16px;

            @media (max-width: 1024px) {
                font-size: 20px;
            }
        }
    }
}

.custom-checkbox p,
.custom-checkbox a {
    @media (max-width: 1024px) {
        font-size: 12px !important;
    }
}


.custom-checkbox input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    border-radius: 3px;
}

.custom-checkbox .checkbox-text:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border: 2px solid #fff;
    border-radius: 10px;
    margin-bottom: 3px;
}

.custom-checkbox input[type="checkbox"]:checked+.checkbox-text:before {
    content: url('@/assets/img/checkwhite.svg');
    font-size: 16px;
    color: #fff;
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