<script setup lang="ts">
import { ref } from 'vue'

// Définir le type pour un message
interface Message {
  value: string;
  reponse?: string;
  isLoadingReponse: boolean;
}

const message = ref<string>('')
const messages = ref<Message[]>([])

const addMessage = () => {
  if (message.value.trim()) {
    messages.value.push({ value: message.value, reponse: Date.now().toString(), isLoadingReponse: true })
    message.value = ''
  }
}
</script>

<template>
  <div>


    <div class="app">
      <div class="sidebar">
        <div class="sidebar__title">Client</div>
        <div class="sidebar__content">

        </div>
        <!-- <span class="sidebar__icon-close">icon</span> -->
      </div>

      <div class="main-wrapper">
        <nav>
          <ul class="logo-wrapper">
            <li><img class="logo" src="assets/logo.jpg" /></li>
          </ul>

          <ul>
            <li>
              <span class="icon-user material-symbols-outlined">
                account_circle
              </span>
            </li>
          </ul>
        </nav>

        <main class="main container">
          <div class="conversation">
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
              <span class="icon-talk-wrapper">
                <span class="icon-talk material-symbols-outlined">
                  mic
                </span>
              </span>
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