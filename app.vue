<script setup lang="ts">
import { ref } from 'vue'

const message = ref<string>('')
const messages = ref<string[]>([])

const gifs = ref<string[]>([])

const activeChinchilla = false;

// Tableau des URLs de GIFs de chinchilla
const chinchillaGifs = [
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHEycDdneGVkYjcyMnR5YzYwY3F1YWFzYWUxZ3pvNXE1ejZpZHI0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NLIPqilkyziF2/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc21ueGh2N2NwN3UyMW9tdDF5dmF5MzVuMzM0YjhkczFxaDU3djU5NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z2l5ZTJmpqbNS/200.webp',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDB4dHA0bjZnOG5xMjRpdDR6cng2bXZnNGZ3bGxxdG1pMjNlY2wxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12AXjGUytmBkeQ/200.webp',
]

const addMessage = () => {
  if (message.value.trim()) {
    messages.value.push(message.value)
    message.value = ''

    // Sélectionner un GIF aléatoire
    if (activeChinchilla) {
      const randomGif = chinchillaGifs[Math.floor(Math.random() * chinchillaGifs.length)]
      gifs.value.push(randomGif)
    }
  }
}

const getRandomPosition = () => {
  const position = {
    left: `${Math.random() * 80}vw`,
    top: `${Math.random() * 80}vh`,
  }
  return position
}

const setDisappearTimeout = (index: number) => {
  setTimeout(() => {
    // gifs.value.splice(index, 1)
  }, 2000)
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

        <!-- <ul> -->
        <!-- <span v-for="(msg, index) in messages" :key="index"> -->
        <!-- <img v-if="gifs[index]" :src="gifs[index]" alt="Chinchilla GIF" class="chinchilla-gif" /> -->
        <!-- </span> -->
        <!-- </ul> -->

        <div class="gif-container">
          <img v-for="(gif, index) in gifs" :key="index" :src="gif" alt="Chinchilla GIF" :style="getRandomPosition()"
            class="chinchilla-gif" @load="setDisappearTimeout(index)" />
        </div>
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

.chinchilla-gif {
  position: absolute;
  max-width: 100px;
  /* Taille des GIFs ajustée pour la démo */
  height: auto;
  border-radius: 4px;
  transition: opacity 0.3s ease-in-out;
  /* Transition pour une disparition en douceur */
}
</style>