<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    See
    <code>README.md</code> for more information.
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <button @click="handleLogin">login</button>
  <button @click="handleChangeName">change</button>
  <div>{{ mainStore }}</div>
  <div>{{ mainStore.nameLength }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '@/api'
import { useMainStore } from '@/store/main'
defineProps<{ msg: string }>()
const mainStore = useMainStore()
const count = ref(0)

async function handleLogin() {
  const name = 'test1001'
  await User.Login({
    name,
    password: 'a12345678',
  })
  mainStore.$patch({
    name,
  })
}

async function handleChangeName() {
  await mainStore.insertPost('测试测试test test')
}
</script>

<style lang="scss" scoped>
a {
  color: $test-color;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
