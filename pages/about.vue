<template>
    <div class="page">
        <h1>о нас</h1>
        <div class="about__body">
            <div class="about__img">
                <img src="@/assets/img/about.png" class="bgg" alt="">
                <div class="about__text">
                    <div class="textdiv">
                        <img src="@/assets/img/aboutlist.svg" alt="">

                        <div>
                            <p>Мы создали этот сервис, чтобы упростить и усовершенствовать сотрудничество между блогерами и
                                заказчиками рекламы.</p>
                            <p>Мы верим в мощь социальных медиа и инфлюенс-маркетинга. Нашей целью является сделать
                                инфлюенс-маркетинг доступным для всех, независимо от размера бизнеса или статуса блогера. Мы
                                стремимся упростить процесс размещения рекламы и создания сотрудничества между этими двумя
                                мирами.</p>
                            <p>Мы предоставляем удобное пространство для блогеров, чтобы помочь заказчикам найти подходящих
                                блогеров, а блогерам - найти интересных заказчиков.</p>
                        </div>
                    </div>
                    <div>
                        <img src="@/assets/img/aboutright.png" class="img-fluid right" alt="">
                    </div>
                </div>

                <div class="buttons">
                    <button>
                        <span>регистрация</span>
                        <img src="@/assets/img/start.svg" alt="">
                    </button>
                    <button>
                        <span>каталог</span>
                        <img src="@/assets/img/start.svg" alt="">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
useSeoMeta({
    title: 'О Нас | InstaTop',
    ogTitle: 'О Нас | InstaTop',
    description: 'О Нас | InstaTop',
    ogDescription: 'О Нас | InstaTop',
})
</script>
<style lang="scss" scoped>
.page {
    padding: 150px 100px 64px;

    .about__body {
        .about__img {
            position: relative;

            .buttons {
                display: flex;
                position: absolute;
                bottom: 0;
                gap: 36px;

                button {
                    display: flex;
                    gap: 5.208vw;
                    align-items: center;

                    border-radius: 60px;
                    background: #000;
                    padding: 1.563vw 2.604vw;
                    border: 0;

                    font-size: 1.875vw;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 125%;
                    /* 45px */
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #fff;

                }
            }

            .about__text {
                width: 100%;
                position: absolute;
                top: 0;
                display: flex;
                justify-content: space-between;
                padding: 55px 36px 55px 50px;

                .textdiv {
                    display: flex;
                    align-items: flex-start;
                    gap: 20px;

                    p {
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 140%;
                        /* 22.4px */
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #fff;
                        max-width: 48.333vw;

                        margin: 0 0 20px;

                        &:last-child {
                            margin: 0;
                        }
                    }

                    img {
                        animation: rotate 5s linear infinite;
                        transform-origin: center;
                    }

                    @keyframes rotate {
                        from {
                            transform: rotate(0deg);
                        }

                        to {
                            transform: rotate(360deg);
                        }
                    }
                }
            }

            img {
                max-width: 100%;
            }
        }
    }

    h1 {
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: 125%;
        /* 50px */
        text-transform: uppercase;
        font-family: var(--int);
        color: #000;
        margin: 0 0 30px;
    }
}
</style>