import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const user = ref({})

  function setUser(user) {
    user.value = user
    isAuth.value = true
    console.log(user)
    delete user.value
    localStorage.setItem('user', JSON.stringify(user))
    // document.querySelector('#widget_login > button').style.display = 'none'
  }

  function initUser() {
    if (localStorage.getItem('user')) {
      user.value = JSON.parse(localStorage.getItem('user'))
      isAuth.value = true
    }
  }

  async function logout() {
    isAuth.value = false
    user.value = {}
    localStorage.removeItem('user')

    try {
      await axios.get(`${import.meta.env.VITE_HOST_API}auth/logout`, {
        withCredentials: true // Обязательно для отправки куки
      })
      // После успешного выхода пользователя можно выполнить дополнительные действия,
      // например, перенаправление на страницу входа или обновление компонента
      console.log('Logged out successfully')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return { isAuth, user, setUser, logout, initUser }
})
