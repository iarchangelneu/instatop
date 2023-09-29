<template>
    <div class="page">
        <div class="filters">
            <h1>каталог блогеров</h1>

            <div class="buttons">
                <button>фильтры</button>
                <button>сортировка</button>
            </div>
        </div>
        <div class="catalog__body">
            <div class="catalog">
                <NuxtLink to="/user/1" class="catalog__item">
                    <img src="@/assets/img/cat1.png" alt="">

                    <h1>отображаемое имя</h1>
                    <h2>@username</h2>

                    <div class="stats">
                        <span>250 000</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats">
                        <span>322</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>
                <NuxtLink to="/user/1" class="catalog__item">
                    <img src="@/assets/img/cat1.png" alt="">

                    <h1>отображаемое имя</h1>
                    <h2>@username</h2>

                    <div class="stats">
                        <span>250 000</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats">
                        <span>322</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>
                <NuxtLink to="/user/1" class="catalog__item">
                    <img src="@/assets/img/cat1.png" alt="">

                    <h1>отображаемое имя</h1>
                    <h2>@username</h2>

                    <div class="stats">
                        <span>250 000</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats">
                        <span>322</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>
                <NuxtLink to="/user/1" class="catalog__item">
                    <img src="@/assets/img/cat1.png" alt="">

                    <h1>отображаемое имя</h1>
                    <h2>@username</h2>

                    <div class="stats">
                        <span>250 000</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats">
                        <span>322</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>
                <NuxtLink to="/user/1" class="catalog__item">
                    <img src="@/assets/img/cat1.png" alt="">

                    <h1>отображаемое имя</h1>
                    <h2>@username</h2>

                    <div class="stats">
                        <span>250 000</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats">
                        <span>322</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>
                <NuxtLink to="/user/1" class="catalog__item">
                    <img src="@/assets/img/cat1.png" alt="">

                    <h1>отображаемое имя</h1>
                    <h2>@username</h2>

                    <div class="stats">
                        <span>250 000</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats">
                        <span>322</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>
                <NuxtLink to="/user/1" class="catalog__item">
                    <img src="@/assets/img/cat1.png" alt="">

                    <h1>отображаемое имя</h1>
                    <h2>@username</h2>

                    <div class="stats">
                        <span>250 000</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats">
                        <span>322</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>
                <NuxtLink to="/user/1" class="catalog__item">
                    <img src="@/assets/img/cat1.png" alt="">

                    <h1>отображаемое имя</h1>
                    <h2>@username</h2>

                    <div class="stats">
                        <span>250 000</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats">
                        <span>322</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>
            </div>

            <div class="text-center">
                <button>Показать еще</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return
    }
}
</script>
<script setup>
useSeoMeta({
    title: 'Каталог блогеров | InstaTop',
    ogTitle: 'Каталог блогеров | InstaTop',
    description: 'Каталог блогеров | InstaTop',
    ogDescription: 'Каталог блогеров | InstaTop',
})
</script>
<style lang="scss" scoped>
.page {
    padding: 150px 100px 50px;

    .catalog__body {
        margin-top: 50px;

        .text-center {
            margin-top: 40px;

            button {
                background: #000;
                border: 0;
                border-radius: 40px;
                padding: 10px 20px;

                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: 125%;
                /* 25px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #fff;
            }
        }

        .catalog {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 40px;
            grid-auto-flow: dense;

            .catalog__item {
                text-decoration: none;
                border-radius: 60px;
                background: #000;
                padding: 30px 54px;
                display: flex;
                flex-direction: column;
                align-items: center;

                h1 {
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 125%;
                    /* 30px */
                    text-transform: uppercase;
                    font-family: var(--int);
                    color: #fff;
                    margin: 18px 0 5px;
                }

                h2 {
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 125%;
                    /* 25px */
                    text-transform: uppercase;
                    color: #fff;
                    font-family: var(--int);
                    margin: 0;
                }

                .stats {
                    margin: 15px 0;

                    &:last-child {
                        margin-bottom: 0 !important;
                    }

                    span {
                        font-size: 32px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 125%;
                        /* 40px */
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #fff;
                        display: block;
                        text-align: center;
                        margin: 0;
                    }

                    small {
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 125%;
                        /* 25px */
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #fff;
                        margin: 0;
                        display: block;
                    }
                }

                img {
                    width: 252px;
                    height: 252px;
                    object-fit: cover;
                }
            }
        }
    }

    .filters {
        display: flex;
        justify-content: space-between;

        h1 {
            font-size: 40px;
            font-style: normal;
            font-weight: 600;
            line-height: 125%;
            /* 50px */
            text-transform: uppercase;
            font-family: var(--int);
            color: #000;
            margin: 0;
        }

        .buttons {
            margin-top: 20px;
            display: flex;
            gap: 30px;

            button {
                background: #000;
                border: 0;
                padding: 11px 18px;
                border-radius: 40px;

                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: 125%;
                /* 20px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #fff;
            }
        }
    }
}
</style>