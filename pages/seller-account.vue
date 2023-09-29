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



        <div class="chats" v-if="activeTab == 3">
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

        <TheTrans v-if="activeTab == 2" :transactions="transactions"></TheTrans>
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
            sendId: null,
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
</style>