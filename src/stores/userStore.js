import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const name = ref('Pepe');
  const loggedIn = ref(false);
  
  function login(userName) {
    name.value = userName;
    loggedIn.value = true;
  }

  function logout() {
    name.value = 'Pepe';
    loggedIn.value = false;
  }

  return {
    name,
    loggedIn,
    login,
    logout
  };
});