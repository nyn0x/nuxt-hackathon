<script setup lang="ts">
import { ref } from 'vue'

// Définir le type pour un message
interface Message {
  value: string;
  reponse?: string;
  isLoadingReponse: boolean;
}

interface Conversation {
  id: number;
  clientName: string;
  lastMessage: string;
}

const conversations = ref<Conversation[]>([
  {
    id: 1,
    clientName: 'Client aze',
    lastMessage: ''
  },
  {
    id: 2,
    clientName: 'Client qsd',
    lastMessage: 'vel hen...'
  },
  {
    id: 3,
    clientName: 'Client tyu',
    lastMessage: 'istique lacus massa...'
  },
])


const message = ref<string>('')
const messages = ref<Message[]>([])
const conversation = ref(null);
const selectedConv = ref<number | null>(null);

const addMessage = async () => {
  if (message.value.trim()) {
    const msg = message.value;
    messages.value.push({ value: message.value, reponse: Date.now().toString(), isLoadingReponse: true })
    message.value = ''

    const reponseChat = await $fetch('/api/chat', {  method: 'POST' , body: { 
      msg: msg 
        }})

    let lastMsg = messages.value[messages.value.length - 1];

    lastMsg = { ...lastMsg, isLoadingReponse: false, reponse : reponseChat };

    messages.value[messages.value.length - 1] = lastMsg;

    scrollToBottom();
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (conversation.value) {
      console.log('hii', conversation.value.scrollHeight);
      setTimeout(() => {
        conversation.value.scrollTop = conversation.value.scrollHeight;
      }, 500);
      // document.querySelector('#conversation').scrollTop =  conversation.value.scrollHeight;
    }
  });
};

onMounted(() => {
  scrollToBottom();
  selectedConv.value = conversations.value[0].id;

});

</script>

<template>
  <div>


    <div class="app">
      <div class="sidebar">
        <div class="sidebar__title">

        </div>
        <!-- <nav>
          <ul>
            <li>test</li>
          </ul>
        </nav> -->
        <div class="sidebar__content">
          <article v-for="(conversation, index) in conversations" :key="index" class="sidebar__content__conversation" :class="{ 'sidebar__content__conversation--selected' : selectedConv === conversation.id }">
            {{ conversation.clientName }}
            <div><small>{{ conversation.lastMessage }}</small></div>
          </article>
        </div>
        <!-- <span class="sidebar__icon-close">icon</span> -->
      </div>

      <div class="main-wrapper">
        <nav>
          <ul class="logo-wrapper">
            <li><img class="logo" src="assets/logo.png" /></li>
          </ul>

          <!-- <ul>
            <li>
              <span class="icon-user material-symbols-outlined">
                account_circle
              </span>
            </li>
          </ul> -->
        </nav>

        <main class="main container">
          <div ref="conversation" id="conversation" class="conversation">
            <article v-for="(msg, index) in messages" :key="index" class="card">{{ msg.value }}
              <article class="card__reponse">
                <img v-if="msg.isLoadingReponse" class="card__reponse__icon-loading" src="assets/loading.gif">
                <template v-else>
                  {{ msg.reponse }}
                </template>
              </article>
            </article>
          </div>


          <form @submit.prevent="addMessage" class="form container">
            <fieldset role="group">
              <input v-model="message" type="text" name="email" placeholder="Tapez un message" />
              <!-- <span class="icon-talk-wrapper">
                <span class="icon-talk material-symbols-outlined">
                  mic
                </span>
              </span> -->
              <input type="submit" value="Envoyer" />
            </fieldset>
          </form>

        </main>
      </div>

    </div>
  </div>
</template>


<style lang="scss" scoped>
body {
  background-color: #f0f0f0;
  /* 100% de la hauteur de la vue */
  margin: 0;

  --pico-background-color: var(--pico-form-element-background-color);
  --pico-border-color: var(--pico-form-element-border-color);
  --pico-color: var(--pico-form-element-color);
}

.app {
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.sidebar {
  border: var(--pico-border-width) solid var(--pico-form-element-border-color);
  padding: 0.5rem;
  width: 320px;
  position: relative;

  &__title {
    text-align: center;
  }

  &__icon-close {
    position: absolute;
    right: -45px;
    top: 40%;
    cursor: pointer;
    padding: 1rem;
  }

  &__content {
    &__conversation {
      cursor: pointer;

      &--selected {
        border: 1px solid var(--pico-primary-focus);
      }
    }
  }
}

.conversation {
  display: flex;
  flex-direction: column;
  max-height: 605px;
  overflow-y: auto;
}

.card {
  &__reponse {
    margin-top: 2rem;
    text-align: right;

    &__icon-loading {
      width: 135px;
      margin-left: auto;
      display: block;
    }
  }
}

.logo-wrapper {
  margin: auto;
}

.main-wrapper {
  width: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form {
  width: 100%;
  align-self: flex-end;
  position: absolute;
  bottom: 0;
  padding: 0.5rem;
}

.icon-user {
  font-size: 42px;
  cursor: pointer;
}

.logo {
  width: 115px;
}

.icon-talk-wrapper {
  border: var(--pico-border-width) solid var(--pico-form-element-border-color);
  border-radius: 0;
  border-left-width: 0px;
  display: flex;
  align-items: center;
  width: 55px;
  justify-content: center;
  cursor: pointer;
}

.icon-talk {
  font: 24px;
}
</style>