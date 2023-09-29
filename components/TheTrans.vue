<template>
    <div class="transactions text-center">
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th scope="col">Тип</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Состояние счета</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in transactions.slice().reverse()" :key="item.id">
                    <td>{{ item.type_operation }}</td>
                    <td> {{ item.amount.toLocaleString() }} ₸</td>
                    <td>{{ formatDate(item.date) }}</td>
                    <td :class="{ success: item.paid == 1, failure: item.paid == 0 }">{{ item.paid == 1 ? 'Совершено' :
                        item.paid == 0 ? 'Отменено' : item.paid }}</td>
                    <td>{{ calculateAmountNow(item) }} ₸ </td>
                </tr>
            </tbody>
        </table>

        <div class="mobtrans">

            <div class="mob__body" v-for="item in transactions.slice().reverse()" :key="item.id">
                <div class="paddingblya">
                    <div class="body__header">
                        <small>{{ item.type_operation }}</small>
                        <span>{{ formatDate(item.date) }}</span>
                        <img src="@/assets/img/success.svg" v-if="item.paid == 1" alt="">
                        <img src="@/assets/img/failure.svg" v-else alt="">
                    </div>
                    <div class="body__footer">
                        <div>
                            <small>Цена</small>
                            <span>+ {{ item.amount.toLocaleString() }} ₸</span>
                        </div>
                        <div>
                            <small>Состояние счета</small>
                            <span>{{ calculateAmountNow(item) }} ₸</span>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        transactions: [],
    },
    data() {
        return {}
    },

    methods: {
        calculateAmountNow(item) {
            if (item.type_operation === 'ВЫВОД' && item.paid === 0) {
                return (item.amount_now + item.amount).toLocaleString();
            } else if (item.type_operation === 'ПОПОЛНЕНИЕ' && item.paid === 0) {
                return (item.amount_now - item.amount).toLocaleString();
            } else {
                return item.amount_now.toLocaleString();
            }
        },
        formatDate(dateTime) {
            const date = new Date(dateTime);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}.${month}.${year} ${hours}:${minutes}`;
        },
    }
}
</script>
<script setup>
useSeoMeta({
    title: 'Транзакции | InstaTop',
    ogTitle: 'Транзакции | InstaTop',
    description: 'Транзакции | InstaTop',
    ogDescription: 'Транзакции | InstaTop',
})
</script>
<style lang="scss" scoped>
.transactions {
    margin-top: 38px;

    .mobtrans {
        display: none;

        border-radius: 30px;
        background: #FFF;
        box-shadow: 0px 0px 15px 0px rgba(47, 59, 163, 0.20);

        .mob__body {

            &:last-child {
                hr {
                    display: none;
                }
            }

            .paddingblya {

                padding: 30px;


                .body__header {
                    display: flex;
                    justify-content: space-between;

                    small {
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        font-family: var(--int);
                        color: #000;
                    }

                    span {
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        font-family: var(--int);
                        color: #000;
                        white-space: nowrap;
                    }
                }

                .body__footer {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 15px;
                    text-align: left;

                    small {
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        font-family: var(--int);
                        color: #000;
                        text-align: left;
                    }

                    span {
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        font-family: var(--int);
                        color: #000;
                        display: block;
                        text-align: left;
                        margin-top: 10px;
                        //   white-space: nowrap;
                    }

                }
            }
        }

        @media (max-width: 1024px) {
            display: block;
        }
    }

    table {
        @media (max-width: 1024px) {
            display: none;
        }

        th {
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            font-family: var(--int);
            color: #000;
        }

        td {
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            font-family: var(--int);
            color: #000;


        }

        .success {
            color: #03B820 !important;
        }

        .failure {
            color: #EA0505 !important;
        }
    }


}
</style>