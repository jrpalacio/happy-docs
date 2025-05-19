<script setup>
import { useUserStore } from '../stores/userStore';

const store = useUserStore();
</script>

<template>
  <div>
    <h1 v-if="store.loggedIn" class="text-3xl font-bold text-neutral-100 text-center py-4">Hola, {{ store.name }}</h1>
    <button @click="store.login('José')" class="bg-amber-200 px-6 py-2 rounded-full">Iniciar sesión</button>
  </div>
</template>