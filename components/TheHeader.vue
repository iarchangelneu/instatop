<template>
    <header v-if="!hideHeaderOnPages.includes($route.name)">
        <div class="header__body">
            <NuxtLink to="/" :class="{ active: $route.path === '/' }">INSTA ✦ TOP</NuxtLink>
            <NuxtLink to="/catalog" :class="{ active: $route.path === '/catalog' }" class="catalog">Каталог</NuxtLink>
            <NuxtLink to="/about" :class="{ active: $route.path === '/about' }" class="catalog">Инфо</NuxtLink>

            <div class="links">
                <NuxtLink :to="this.accountUrl">
                    <img src="@/assets/img/acc.svg" alt="">
                </NuxtLink>
                <NuxtLink v-if="accountUrl == '/buyer-account'" to="/cart">
                    <img src="@/assets/img/cart.svg" alt="">
                </NuxtLink>
                <NuxtLink to="/withdrawal" class="balance">
                    <img src="@/assets/img/cash.svg" alt="">
                </NuxtLink>
                <NuxtLink to="/withdrawal" v-if="userBalance !== null" class="balance">
                    {{ userBalance == null ? '0 ₸' : userBalance.toLocaleString()
                        + ' ₸' }}
                </NuxtLink>

                <div class="burg">
                    <input id="menu__toggle" class="d-none" type="checkbox" />
                    <label class="menu__btn" for="menu__toggle" @click="menuOpen = !menuOpen">
                        <span></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="mobmenu" :class="{ openMenu: menuOpen }">
            <div class="moblinks">
                <NuxtLink to="/catalog">Каталог</NuxtLink>
                <NuxtLink to="/about">Инфо</NuxtLink>

                <NuxtLink to="/withdrawal" v-if="userBalance !== null">
                    <img src="@/assets/img/smallcash.svg" class="mr-4" alt="">
                    <span> {{ userBalance == null ? '0 ₸' : userBalance.toLocaleString()
                        + ' ₸' }}</span>
                </NuxtLink>
            </div>
        </div>
    </header>
</template>
<script>
import global from '~/mixins/global';
import axios from 'axios'
export default {
    mixins: [global],
    data() {
        return {
            hideHeaderOnPages: ['login', 'register'],
            pathUrl: 'https://instatop.kz',
            userBalance: null,
            accountType: '',
            menuOpen: false,
        }
    },
    methods: {
        getBuyer() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/buyer/buyer-lk`;
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios
                .get(path)
                .then(response => {
                    this.userBalance = response.data.balance

                })
                .catch(error => console.log(error));
        },
        getSeller() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/seller/seller-lk`;
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios
                .get(path)
                .then(response => {
                    this.userBalance = response.data.balance

                })
                .catch(error => console.log(error));
        },
    },
    mounted() {
        const accType = localStorage.getItem('accountType')
        if (accType == 'buyer-account') {
            this.getBuyer()
            this.getCart()
            this.accountType = 'buyer'
            setInterval(() => {
                this.cartLength = localStorage.getItem('cartLength')
            }, 1);
        }
        else if (accType == 'seller-account') {
            this.getSeller()
            this.accountType = 'seller'
        }
        else {
            console.log('not authorized')
        }
    }
}
</script>
<style lang="scss" scoped>
header {
    position: fixed;
    display: flex;
    justify-content: center;
    padding: 50px 0 0;
    width: 100%;
    z-index: 100;

    .openMenu {
        right: 0 !important;
    }

    .mobmenu {
        position: fixed;
        width: 100%;
        height: 100vh;
        background: #000;
        top: 0;
        right: -4000px;
        transition: all .3s ease;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .moblinks {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 40px;

            a {
                font-size: 34px;
                font-style: normal;
                font-weight: 400;
                line-height: 125%;
                /* 42.5px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #fff;
            }
        }
    }

    .burg {
        display: none;

        @media (max-width: 1024px) {
            display: block;
        }
    }

    @media (max-width: 1024px) {
        padding: 40px 0 0;
    }

    .balance,
    .catalog {
        @media (max-width: 1024px) {
            display: none;
        }
    }

    .header__body {
        display: flex;
        align-items: center;
        position: relative;
        gap: 4.6;
        padding: 5px 7px;
        background: #000;
        border-radius: 50px;



        .links {
            margin-left: 15px;
            margin-right: 15px;
            display: flex;
            align-items: center;
            gap: 30px;

            a {
                padding: 0;
            }
        }

        .active {
            background: #fff !important;
            color: #000 !important;
        }

        a {
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 125%;
            /* 20px */
            text-transform: uppercase;
            font-family: var(--int);
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            transition: all .3s ease;
            padding: 10px;
        }
    }
}

#menu__toggle {
    opacity: 0;
}

.menu__btn {
    margin-top: 10px;
    display: flex;
    /* используем flex для центрирования содержимого */
    align-items: center;
    /* центрируем содержимое кнопки */
    width: 35px;
    height: 20px;
    cursor: pointer;
    z-index: 100000000;
    color: #fff;
    position: relative;
    transform: rotate(180deg);
}

.menu__btn>span {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
}

.menu__btn>span::before,
.menu__btn>span::after {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
}

.menu__btn>span::before {
    content: '';
    top: -8px;
}

.menu__btn>span::after {
    content: '';
    top: 8px;
}

#menu__toggle:checked~.menu__btn>span {
    transform: rotate(45deg);
    background-color: #fff;
    border-radius: 10px;

}

#menu__toggle:checked~.menu__btn>span::before {
    top: 0;
    transform: rotate(0);
    background-color: #fff;
    border-radius: 10px;

}

#menu__toggle:checked~.menu__btn>span::after {
    top: 0;
    transform: rotate(90deg);
    background-color: #fff;
    border-radius: 10px;
}

#menu__toggle:checked~.menu__box {
    visibility: visible;
    top: 0;
}

.menu__btn>span,
.menu__btn>span::before,
.menu__btn>span::after {
    transition-duration: .25s;
}
</style>