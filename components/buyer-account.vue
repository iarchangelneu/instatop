<template>
    <div class="page">
        <h1>Личный кабинет</h1>

        <div class="navs">
            <div>
                <button :class="{ activeBtn: activeTab == 0 }" @click="activeTab = 0">Мои заказы</button>
                <button :class="{ activeBtn: activeTab == 1 }" @click="activeTab = 1">Транзакции</button>
            </div>
            <div>
                <button :class="{ activeBtn: activeTab == 2 || activeTab == 7 }" @click="activeTab = 2">Обратная
                    связь</button>
                <button :class="{ activeBtn: activeTab == 3 }" @click="activeTab = 3">Аккаунт</button>
            </div>
        </div>

        <div class="sales" v-if="activeTab == 0">
            <div class="sales__item">
                <img src="@/assets/img/why.png" alt="">

                <div class="item__info">
                    <h1>Услуга Генеральная уборка</h1>
                    <h1>80 000 ₸</h1>

                    <span class="date">Дата заказа: 12.08.2023</span>
                    <span>Исполнитель:<br>
                        Клининг «Белоснежка» </span>

                    <button>Чат с исполнителем</button>
                </div>
            </div>
            <div class="sales__item">
                <img src="@/assets/img/why.png" alt="">

                <div class="item__info">
                    <h1>Услуга Генеральная уборка</h1>
                    <h1>80 000 ₸</h1>

                    <span class="date">Дата заказа: 12.08.2023</span>
                    <span>Исполнитель:<br>
                        Клининг «Белоснежка» </span>

                    <button>Чат с исполнителем</button>
                </div>
            </div>
            <div class="sales__item">
                <img src="@/assets/img/why.png" alt="">

                <div class="item__info">
                    <h1>Услуга Генеральная уборка</h1>
                    <h1>80 000 ₸</h1>

                    <span class="date">Дата заказа: 12.08.2023</span>
                    <span>Исполнитель:<br>
                        Клининг «Белоснежка» </span>

                    <button>Чат с исполнителем</button>
                </div>
            </div>
            <div class="sales__item">
                <img src="@/assets/img/why.png" alt="">

                <div class="item__info">
                    <h1>Услуга Генеральная уборка</h1>
                    <h1>80 000 ₸</h1>

                    <span class="date">Дата заказа: 12.08.2023</span>
                    <span>Исполнитель:<br>
                        Клининг «Белоснежка» </span>

                    <button>Чат с исполнителем</button>
                </div>
            </div>
            <div class="sales__item">
                <img src="@/assets/img/why.png" alt="">

                <div class="item__info">
                    <h1>Услуга Генеральная уборка</h1>
                    <h1>80 000 ₸</h1>

                    <span class="date">Дата заказа: 12.08.2023</span>
                    <span>Исполнитель:<br>
                        Клининг «Белоснежка» </span>

                    <button>Чат с исполнителем</button>
                </div>
            </div>
            <div class="sales__item">
                <img src="@/assets/img/why.png" alt="">

                <div class="item__info">
                    <h1>Услуга Генеральная уборка</h1>
                    <h1>80 000 ₸</h1>

                    <span class="date">Дата заказа: 12.08.2023</span>
                    <span>Исполнитель:<br>
                        Клининг «Белоснежка» </span>

                    <button>Чат с исполнителем</button>
                </div>
            </div>
        </div>

        <div class="chats" v-if="activeTab == 2">
            <div class="chat__item">
                <div>
                    <h2>alex.ivanov@gmail.com</h2>
                    <!-- <small>23.07.2023 14:47</small> -->
                </div>

                <div class="justify-content-end">
                    <button @click="activeTab = 7">Открыть чат</button>
                </div>
            </div>
            <div class="chat__item">
                <div>
                    <h2>alex.ivanov@gmail.com</h2>
                    <!-- <small>23.07.2023 14:47</small> -->
                </div>

                <div class="justify-content-end">
                    <button @click="activeTab = 7">Открыть чат</button>
                </div>
            </div>
            <div class="chat__item">
                <div>
                    <h2>alex.ivanov@gmail.com</h2>
                    <!-- <small>23.07.2023 14:47</small> -->
                </div>

                <div class="justify-content-end">
                    <button @click="activeTab = 7">Открыть чат</button>
                </div>
            </div>
        </div>

        <div class="acc__info" v-if="activeTab == 3">
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
                    <button>выйти</button>
                </div>
            </div>
        </div>

        <TheTrans v-if="activeTab == 1" :transactions="transactions"></TheTrans>
        <TheMessanger v-if="activeTab == 7" :chatId="chatId" :name="chatName"></TheMessanger>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            activeTab: 0,
            transactions: [],
            chatId: null,
            chatName: '',
        }
    }
}
</script>
<script setup>
useSeoMeta({
    title: 'Личный кабинет | EasyHelp',
    ogTitle: 'Личный кабинет | EasyHelp',
    description: 'Личный кабинет | EasyHelp',
    ogDescription: 'Личный кабинет | EasyHelp',
})
</script>
<style lang="scss" scoped>
.page {
    padding: 150px 100px 80px;

    @media (max-width: 1600px) {
        padding: 150px 50px 80px;
    }

    @media (max-width: 1024px) {
        padding: 150px 20px 50px;
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
            font-family: var(--ral);
            color: #000;
        }

        input {
            border: 2px solid #E3E3E3;
            background: #F6FAFF;
            padding: 10px;

            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 130%;
            font-family: var(--ral);
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
            border: 2px solid var(--btn);
            background: transparent;
            padding: 10px 20px;
            border-radius: 20px;

            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-transform: uppercase;
            font-family: var(--ral);
            color: var(--btn);
            margin-top: 50px;

            transition: all .3s ease;

            &:hover {
                color: #fff;
                background: var(--btn);
            }

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
            background: #F6FAFF;
            padding: 30px 20px;
            border: 1px solid #E3E3E3;

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
                    font-family: var(--ral);
                    color: #000;
                }

                button {
                    margin-top: 30px;
                    padding: 10px 30px;
                    background: transparent;
                    border: 2px solid var(--btn);
                    border-radius: 20px;

                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 130%;
                    font-family: var(--ral);
                    color: var(--btn);

                    transition: all .3s ease;

                    &:hover {
                        color: #fff;
                        background: var(--btn);
                    }
                }
            }
        }
    }

    .sales {
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
        gap: 30px;
        grid-auto-flow: dense;

        @media (max-width: 490px) {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
        }

        .sales__item {
            border: 1px solid #E3E3E3;
            background: #F6FAFF;
            padding: 20px;
            display: flex;
            gap: 20px;

            img {
                width: 200px;
                height: 210px;
                object-fit: cover;

                @media (max-width: 1024px) {
                    width: 100px;
                    height: 100px;
                }
            }

            @media (max-width: 1024px) {
                gap: 10px;
            }

            .item__info {
                display: flex;
                flex-direction: column;

                h1 {
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 130%;
                    font-family: var(--btn);
                    color: #000;
                    margin-bottom: 10px;

                    @media (max-width: 1024px) {
                        font-size: 16px;
                    }

                }

                .date {
                    margin-top: 10px;
                }

                span {
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 130%;
                    font-family: var(--ral);
                    color: #000;
                    display: block;
                    margin: 0 0 10px;

                    @media (max-width: 1024px) {
                        font-size: 12px;
                    }

                }
            }

            button {
                padding: 10px 20px;
                background: transparent;
                border-radius: 20px;
                border: 2px solid var(--btn);

                font-family: var(--ral);
                color: var(--btn);
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: 130%;

                transition: all .3s ease;

                @media (max-width: 1024px) {
                    font-size: 12px;
                }

                &:hover {
                    background: var(--btn);
                    color: #fff;
                }
            }
        }
    }

    .navs {
        display: flex;
        justify-content: center;
        gap: 30px;

        @media (max-width: 1024px) {
            gap: 20px;
            flex-direction: column;
        }

        div {
            display: flex;
            gap: 30px;

            @media (max-width: 1024px) {
                gap: 20px;
            }

            .activeBtn {
                background: #8BBAFF !important;
                color: #fff !important;
                border: 2px solid #8BBAFF !important;
            }

            button {
                padding: 10px 20px;
                background: transparent;
                border: 2px solid var(--btn);
                border-radius: 20px;

                color: var(--btn);
                font-family: var(--ral);
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: 130%;

                transition: all .3s ease;

                @media (max-width: 1024px) {
                    flex: 1;
                }
            }
        }
    }

    h1 {
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: 130%;
        font-family: var(--ral);
        color: #000;
        margin: 0 0 30px;

        @media (max-width: 1024px) {
            font-size: 20px;
            margin: 0 0 20px;
        }
    }
}
</style>