<template>
    <div class="page">
        <div class="filters">
            <h1>каталог блогеров</h1>

            <div class="buttons">
                <button @click="filter = !filter">фильтры</button>
                <button @click="sort = !sort">сортировка</button>
            </div>
            <div class="sort__body" :class="{ activeFilt: sort }">
                <button :class="{ btnactive: selectedSort == 1 }"
                    @click="selectedSort = 1, sortBy('products__price')">Сначала
                    дешевле</button>
                <button :class="{ btnactive: selectedSort == 2 }"
                    @click="selectedSort = 2, sortBy('-products__price')">Сначала
                    дороже</button>
                <button :class="{ btnactive: selectedSort == 3 }"
                    @click="selectedSort = 3, sortBy('-user__date_joined')">Самые
                    новые</button>
                <button :class="{ btnactive: selectedSort == 4 }"
                    @click="selectedSort = 4, sortBy('user__date_joined')">Самые
                    старые</button>
            </div>
            <div class="filter__body" :class="{ activeFilt: filter }">
                <div>
                    <h2>Категории</h2>

                    <div class="filters__check">
                        <div>
                            <label class="custom-checkbox" v-for="(category, index) in categories1" :key="index">
                                <input type="checkbox" :value="category" v-model="selectedCategories"
                                    @change="applyFilters">
                                <p class="checkbox-text m-0">{{ category }}</p>
                            </label>
                        </div>
                    </div>

                    <div>
                        <h2>
                            Цена
                        </h2>

                        <div class="inputs">
                            <input type="number" v-model="minPrice" name="from" id="from" placeholder="от"
                                @input="applyFilters">
                            <img src="@/assets/img/filterline.svg" alt="">
                            <input type="number" v-model="maxPrice" name="to" id="to" placeholder="до"
                                @input="applyFilters">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="cataloglength <= 0"></div>
        <div class="catalog__body" v-else>
            <div class="catalog text-center">
                <NuxtLink v-for="item in catalog.results" :key="item.id" :to="'/user/' + item.id" class="catalog__item">
                    <img :src="item.inst_info" alt="" v-if="item.inst_info === null">
                    <img :src="item.inst_info.profile_pic_url" v-else alt="">


                    <!-- <img v-else :src="item.inst_info.profile_pic_url" alt=""> -->

                    <h1>{{ item.user.first_name }}</h1>
                    <h2>@{{ item.inst_username }}</h2>

                    <div class="stats text-center">
                        <span v-if="item.inst_info">{{ item.inst_info.followers_amount.toLocaleString() }}</span>
                        <small>подписчиков</small>
                    </div>
                    <div class="stats text-center">
                        <span v-if="item.inst_info">{{ item.inst_info.posts_amount.toLocaleString() }}</span>
                        <small>поста в профиле</small>
                    </div>
                </NuxtLink>

            </div>

            <div class="text-center">
                <button @click="loadMoreProducts" ref="showmore">Показать еще</button>
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
            filter: false,
            sort: false,
            selectedSort: 0,
            categories1: ['развлечения', 'путешествия', 'мода и стиль', 'красота и уход', 'кулинария'],
            categories2: ['наука и образование', 'бизнес ', 'фитнес и здоровье', 'Творчество', 'родительство и семья'],
            catalog: [],
            category: [],
            selectedCategories: [],
            minPrice: null,
            maxPrice: null,
            pathUrl: 'https://instatop.kz',
        }
    },
    methods: {

        getCategory(categoryName, minPrice, maxPrice) {
            let url = `${this.pathUrl}/api/seller/all-seller?business_category_name=${categoryName}&min_price=${minPrice}&max_price=${maxPrice}`;
            axios
                .get(url)
                .then(response => {
                    const uniqueUsers = [];
                    const seenUserIds = new Set();

                    response.data.results.forEach(item => {
                        if (!seenUserIds.has(item.user.id)) {
                            seenUserIds.add(item.user.id);
                            uniqueUsers.push(item);
                        }
                    });

                    this.catalog.results = uniqueUsers;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getUniqueCategories() {
            // Создаем пустой объект для хранения уникальных категорий
            const uniqueCategories = {};

            // Проходимся по всем элементам в catalog и извлекаем категории
            this.catalog.results.forEach(item => {
                if (item.all_business_category_names && Array.isArray(item.all_business_category_names)) {
                    item.all_business_category_names.forEach(category => {
                        if (category.business_category) {
                            // Добавляем категорию в объект, чтобы гарантировать уникальность
                            uniqueCategories[category.business_category] = true;
                        }
                    });
                }
            });

            // Преобразуем объект в массив уникальных категорий
            this.categories1 = Object.keys(uniqueCategories);
        },
        getCatalog() {
            let url = `${this.pathUrl}/api/seller/all-seller`;

            axios
                .get(url)
                .then(response => {
                    this.catalog = response.data;

                    // Получаем уникальные категории
                    this.getUniqueCategories();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        loadMoreProducts() {
            if (this.catalog.next) {
                this.$refs.showmore.innerHTML = 'Загружаем'
                axios
                    .get(this.catalog.next)
                    .then(response => {
                        this.$refs.showmore.innerHTML = 'Показать еще'
                        this.catalog.results.push(...response.data.results);
                        this.catalog.next = response.data.next;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            else {
                this.$refs.showmore.innerHTML = 'Больше ничего нет (;'
            }
        },
        sortBy(ordering) {
            this.sort = false
            const path = `${this.pathUrl}/api/seller/all-seller?ordering=${ordering}`;
            axios
                .get(path)
                .then(response => {
                    this.catalog = response.data;

                })
                .catch(error => {
                    console.error(error);
                });
        },
        applyFilters() {
            const selectedCategories = [];

            this.categories1.forEach(category => {
                if (this.selectedCategories.includes(category)) {
                    selectedCategories.push(category);
                }
            });

            const minPriceToSend = this.minPrice === null ? '' : this.minPrice;
            const maxPriceToSend = this.maxPrice === null ? '' : this.maxPrice;

            this.getCategory(selectedCategories, minPriceToSend, maxPriceToSend);
        },
        fetchFilteredProducts(params) {
            const path = `${this.pathUrl}/api/seller/all-seller?${params.toString()}`;
            axios
                .get(path)
                .then(response => {
                    this.catalog = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        searchProducts() {
            const query = this.search.trim();
            if (query) {
                const queryParams = `?name__icontains=${query}`;
                this.fetchSearchResults(queryParams);
            } else {
                this.getCatalog();
            }
        },
        fetchSearchResults(queryParams) {
            const path = `${this.pathUrl}/api/products/all-product${queryParams}`;
            axios
                .get(path)
                .then(response => {
                    this.catalog = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    mounted() {
        this.getCatalog()
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

    @media (max-width: 1600px) {
        padding: 150px 50px 50px;
    }

    @media (max-width: 1024px) {
        padding: 150px 20px 50px;
    }

    .catalog__body {
        margin-top: 50px;

        @media (max-width: 1024px) {
            margin-top: 30px;
        }

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

                @media (max-width: 1024px) {
                    padding: 15px 57px;
                    font-size: 16px;
                }
            }
        }

        .catalog {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 40px;
            grid-auto-flow: dense;

            @media (max-width: 1024px) {
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
            }

            .catalog__item {
                text-decoration: none;
                border-radius: 60px;
                background: #000;
                padding: 30px 54px;
                display: flex;
                flex-direction: column;
                align-items: center;

                @media (max-width: 1024px) {
                    padding: 30px 20px;
                }

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

                    @media (max-width: 1024px) {
                        font-size: 20px;
                    }
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

                        @media (max-width: 1024px) {
                            font-size: 20px;
                        }
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
                    border-radius: 100%;
                    object-fit: cover;
                }
            }
        }
    }

    .filters {
        display: flex;
        justify-content: space-between;
        position: relative;

        @media (max-width: 1024px) {
            flex-direction: column;
        }

        .activeFilt {
            transform: scale(1) !important;

        }

        .sort__body {
            transition: all .3s ease;
            transform: scale(0);
            background: #FFF;
            position: absolute;
            right: 0;
            top: 120%;
            border-radius: 30px;
            border: 1px solid #DCDCDC;
            padding: 18px;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 5px;

            .btnactive {
                background: #000 !important;
                color: #fff !important;
            }

            button {
                background: transparent;
                border-radius: 20px;
                transition: all .3s ease;
                border: 0;
                padding: 10px 20px;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: 130%;
                text-transform: uppercase;
                font-family: var(--int);
                color: #000;
            }
        }

        .filter__body {
            transition: all .3s ease;
            transform: scale(0);
            right: 0;
            top: 120%;
            border-radius: 30px;
            border: 1px solid #DCDCDC;
            background: #FFF;
            position: absolute;
            padding: 20px;

            .inputs {
                display: flex;
                gap: 4px;
                align-items: center;

                input {
                    border-radius: 10px;
                    border: 2px solid #000;
                    padding: 6px 10px;
                    background: transparent;

                    font-size: 24px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 130%;
                    font-family: var(--int);
                    color: #000;
                    max-width: 140px;

                    &::placeholder {
                        color: #000;
                    }
                }
            }

            .filters__check {
                display: flex;
                gap: 50px;
                margin-bottom: 30px;

                div {
                    display: flex;
                    flex-direction: column;

                    p {
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 125%;
                        /* 20px */
                        text-transform: uppercase;
                        font-family: var(--int);
                        color: #000;
                    }
                }
            }

            h2 {
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: 125%;
                /* 25px */
                text-transform: uppercase;
                font-family: var(--int);
                color: #000;
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
            margin: 0;

            @media (max-width: 1024px) {
                font-size: 20px;
            }
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

                @media (max-width: 1024px) {
                    flex: 1;
                    padding: 11px 0;
                }
            }
        }
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
    margin-bottom: 15px;

}

.custom-checkbox:last-child {
    margin-bottom: 0 !important;

    @media (max-width: 1024px) {
        margin-bottom: 22px !important;
    }
}
</style>