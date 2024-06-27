<script setup lang="ts">
import { ref } from 'vue'

const message = ref<string>('')
const messages = ref<string[]>([])

const addMessage = () => {
  if (message.value.trim()) {
    messages.value.push(message.value)
    message.value = ''
  }
}
</script>

<template>
  <div>
    <main class="app">
      <div class="container">
        <article v-for="(msg, index) in messages" :key="index" class="app__card">{{ msg }}</article>

        <form @submit.prevent="addMessage" class="app__form">
          <fieldset role="group">
            <input v-model="message" type="text" name="email" placeholder="Tapez un message" autocomplete="email" />

            <input type="submit" value="Envoyer" />
          </fieldset>
        </form>
      </div>
    </main>
  </div>
</template>


<style lang="scss">
@import url("~/assets/css/app.css");

body {
  background-color: #f0f0f0;
  /* Couleur de fond pour mieux voir le centrage */
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 100% de la hauteur de la vue */
  margin: 0;
  /* Enlever les marges par défaut */
  background-color: #f0f0f0;
  /* Couleur de fond pour mieux voir le centrage */
}

.app {
  display: flex;
  flex-direction: column;

  &__form {
    width: 100%;
  }
}
</style>