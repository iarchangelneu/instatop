<template>
    <div class="messanger">
        <div class="chatlist" v-if="!isSeller">
            <div class="chatlist__item" v-for="chat in chats" :key="chat.id"
                @click="newChat(chat.id, chat.seller.user.first_name)">
                <div>
                    <span>{{ chat.seller.user.first_name }}</span>
                    <small>{{ getLastMessageTime(chat) }}</small>
                </div>
                <p>{{ getLastMessageText(chat) }}</p>
            </div>
        </div>
        <div class="chatlist" v-if="isSeller">
            <div class="chatlist__item" v-for="chat in chats" :key="chat.id"
                @click="newChat(chat.id, chat.buyer.user.first_name)">
                <div>
                    <span>{{ chat.buyer.user.first_name }}</span>
                    <small>{{ getLastMessageTime(chat) }}</small>
                </div>
                <p>{{ getLastMessageText(chat) }}</p>
            </div>
        </div>

        <div class="chatbox">
            <div class="chatbox__header">
                <h1>{{ newName }}</h1>
            </div>
            <div class="chatbox__body">
                <div class="message__form" ref="messageContainer" v-if="!isSeller">
                    <div v-for="message in messages" :key="message.time"
                        :class="{ message__to: !message.from_seller, message__from: message.from_seller }">
                        <div>
                            <div class="message">
                                <div class="message__item" :class="{ to: !message.from_seller, from: message.from_seller }">
                                    <p class="mb-0">{{ message.text }}</p>
                                </div>
                                <div class="time"
                                    :class="{ 'text-right': !message.from_seller, 'text-left': message.from_seller }">
                                    <small>{{ formatTime(message.time) }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message__form" ref="messageContainer" v-if="isSeller">
                    <div v-for="message in messages" :key="message.time"
                        :class="{ message__to: message.from_seller, message__from: !message.from_seller }">
                        <div>
                            <div class="message">
                                <div class="message__item" :class="{ to: message.from_seller, from: !message.from_seller }">
                                    <p class="mb-0">{{ message.text }}</p>
                                </div>
                                <div class="time"
                                    :class="{ 'text-right': message.from_seller, 'text-left': !message.from_seller }">
                                    <small>{{ formatTime(message.time) }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chatbox__footer">
                <input type="text" class="w-100" placeholder="Введите сообщение..." v-model="textMessage"
                    @keydown.enter.prevent="sendMsg">
                <div class="send" @click="sendMsg" style="cursor: pointer;">
                    <img src="@/assets/img/send.svg" alt="" loading="lazy">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import global from '~/mixins/global';
import axios from 'axios';
export default {
    mixins: [global],
    props: {
        chatId: Number,
        name: String,
    },
    data() {
        return {
            textMessage: '',
            textMessage2: '',
            newName: this.name,
            newId: this.chatId,
            messages: [],
            isTest: false,
            pathUrl: 'https://instatop.kz',
            msg: [],
            socket: null,
            isSeller: false,
            chats: [],
        }
    },
    computed: {
        lastMessage() {
            return this.chat.messages.length > 0 ? this.chat.messages[this.chat.messages.length - 1] : null;
        },
    },
    methods: {
        getLastMessageTime(chat) {
            const lastMessage = chat.messages && chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1]
                : null;

            return lastMessage && lastMessage.date_time
                ? this.time(lastMessage.date_time)
                : '';
        },
        getLastMessageText(chat) {
            const lastMessage = chat.messages && chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1]
                : null;

            return lastMessage && lastMessage.text ? lastMessage.text : '';
        },
        formatTime(timeString) {
            const timeArray = timeString.split(':');
            const hours = timeArray[0];
            const minutes = timeArray[1];
            const formattedHours = hours.padStart(2, '0');
            const formattedMinutes = minutes.padStart(2, '0');
            return `${formattedHours}:${formattedMinutes}`;
        },
        time(dateTime) {
            const date = new Date(dateTime);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        getChats() {
            const token = this.getAuthorizationCookie()
            const path = `${this.pathUrl}/api/messanger/all-chats`
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;

            axios
                .get(path)
                .then(response => {
                    this.chats = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        scrollToBottom() {
            const container = this.$refs.messageContainer;
            container.scrollTop = container.scrollHeight;
        },

        sendMsg() {
            if (this.textMessage.trim() === '') return;

            const messageObject = {
                text: this.textMessage,
                from_seller: this.isSeller,
            };

            this.socket.send(JSON.stringify(messageObject));
            this.textMessage = '';
            this.$nextTick(() => {
                this.scrollToBottom();
            });

        },
        onSocketOpen(event) {
            console.log('WebSocket connection opened:', event);

        },
        onSocketMessage(event) {
            console.log(event.data);
            const msg = JSON.parse(event.data);
            if (msg.type === 'chat.message' && msg.messages) {
                const lastMessage = msg.messages[msg.messages.length - 1];
                this.messages.push(lastMessage);
                this.getChats();
            } else {
                this.messages = msg;
                this.getChats();
            }

            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        onSocketClose(event) {
            console.log('WebSocket connection closed:', event);
        },
        onSocketError(event) {
            console.error('WebSocket error:', event);
        },
        newChat(id, name) {
            this.newId = id
            this.newName = name
            this.socket.close();

            this.startChat()
        },
        startChat() {
            this.socket = new WebSocket(`wss://instatop.kz/ws/messanger/open-chat/${this.newId}`);
            this.socket.addEventListener('open', this.onSocketOpen);
            this.socket.addEventListener('message', this.onSocketMessage);
            this.socket.addEventListener('close', this.onSocketClose);
            this.socket.addEventListener('error', this.onSocketError);

        }
    },

    mounted() {
        this.getChats()
    },
    created() {
        this.startChat()


        const accType = localStorage.getItem('accountType')
        // console.log(accType)
        if (accType == 'buyer-account') {
            this.isSeller = false
        }
        else if (accType == 'seller-account') {
            this.isSeller = true
        }
        else {
            console.log('not authorized')
        }

    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
    },
}
</script>
<script setup>
useSeoMeta({
    title: 'Мессенджер | InstaTop',
    ogTitle: 'Мессенджер | InstaTop',
    description: 'Мессенджер | InstaTop',
    ogDescription: 'Мессенджер | InstaTop',
})
</script>
<style lang="scss" scoped>
.messanger {
    margin-top: 34px;
    display: flex;
    gap: 30px;

    .chatbox {
        border-radius: 40px;
        background: #000;
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
        padding: 20px 40px;
        width: 100%;

        @media (max-width: 1024px) {
            padding: 15px 15px 23px;
        }

        .chatbox__header {
            h1 {
                font-size: 24px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                font-family: var(--int);
                color: #fff;

                @media (max-width: 1024px) {
                    font-size: 16px;
                }
            }
        }

        .chatbox__footer {
            display: flex;
            gap: 20px;

            .send {
                padding: 9px 13px;
                border: 2px solid #fff;
                border-radius: 0;
                border-radius: 10px;
                display: flex;
                align-items: center;
                cursor: pointer;
                background: #fff;
            }

            input {
                border-radius: 10px;
                border: 2px solid #fff;
                background: transparent;
                padding: 16px 30px;

                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 110%;
                font-family: var(--int);
                color: #fff;

                @media (max-width: 1024px) {
                    padding: 10px 15px;
                }
            }
        }

        .chatbox__body {
            .message__from {
                display: flex;
            }

            .message__to {
                display: flex;
                justify-content: flex-end;
            }

            .message__item p {
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 130%;
                font-family: var(--int);
                color: #fff;
            }

            .message small {
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 130%;
                font-family: var(--int);
                color: #fff;
            }

            .message__form {
                margin-top: 45px;
                height: 468px;
                overflow: auto;
            }

            .message__form::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            .from {
                border-radius: 0;
            }

            .to {
                border-radius: 0;
            }

            .message__item {
                padding: 20px;
                background: #fff;
                border: 2px solid #fff;
                border-radius: 10px;
                max-width: 543px;
                margin-bottom: 5px;

                @media (max-width: 1024px) {
                    padding: 15px;
                }
            }

            .message {
                margin-bottom: 51px;
            }
        }
    }

    .chatlist {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (max-width: 1024px) {
            display: none;
        }

        .chatlist__item {
            border-radius: 30px;
            background: #000;
            box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.10);
            cursor: pointer;
            padding: 20px;
            width: 29.167vw;

            div {
                display: flex;
                justify-content: space-between;
                margin-bottom: 14px;

                span {
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    font-family: var(--int);
                    color: #fff;
                }

                small {
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 130%;
                    font-family: var(--int);
                    color: #fff;
                }
            }

            p {
                margin: 0;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                font-family: var(--int);
                color: rgba(255, 255, 255, 0.7);
            }
        }
    }
}
</style>