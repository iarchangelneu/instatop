<template>
    <footer v-if="!hideFooterOnPages.includes($route.name)">
        <img src="@/assets/img/footerlogo.svg" alt="">

        <div class="div">
            <div class="links">
                <div>
                    <NuxtLink to="/catalog">КАТАЛОГ</NuxtLink>
                    <NuxtLink to="/register">РЕГИСТРАЦИЯ</NuxtLink>
                </div>
                <div>
                    <NuxtLink to="/about">О НАС</NuxtLink>
                    <NuxtLink to="/catalog">ПОПУЛЯРНОЕ</NuxtLink>
                </div>
                <div>
                    <NuxtLink to="/polytics">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</NuxtLink>
                    <NuxtLink to="/terms">ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</NuxtLink>
                </div>

                <small>INSTATOP©2023</small>
            </div>

            <small class="KRYTO">г. Алматы, пр-кт Республики 13, Почтовый индекс A15X3C5 (050013), +7 775 816 82 48, БИН
                210840016943<br>
                Почта поддержки : support@instatop.kz</small>
        </div>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            hideFooterOnPages: ['login', 'register'],
        }
    }
}
</script>
<style lang="scss" scoped>
footer {
    display: flex;
    align-items: flex-start;
    padding: 50px;
    background: #000;
    margin: 0 100px;
    border-radius: 60px;

    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    gap: 6.51vw;

    img {
        max-width: 100%;

        @media (max-width: 1024px) {
            padding-right: 20px;
        }
    }

    .div {
        width: 100%;

        small {
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 140%;
            font-family: var(--int);
            color: #808080;

            @media (max-width: 1024px) {
                max-width: 305px;
            }
        }

        .KRYTO {
            margin-top: 30px;
            display: block;

            @media (max-width: 1024px) {
                margin-top: 15px;
            }
        }

        .links {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;

            @media (max-width: 1024px) {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                gap: 26px;
            }

            div {
                display: flex;
                flex-direction: column;
                gap: 20px;

                @media (max-width: 1024px) {
                    gap: 26px;
                }

                a {
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 140%;
                    font-family: var(--int);
                    color: #fff;

                    @media (max-width: 1024px) {
                        font-size: 16px;
                    }
                }
            }
        }
    }

    @media (max-width: 1600px) {
        margin: 0 50px;
        gap: 40px;
        flex-direction: column;

        img {
            text-align: center;
        }
    }

    @media (max-width: 1024px) {
        margin: 0 20px;
        padding: 30px 0 30px 30px;
    }
}
</style>