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
      await axios.post(`${import.meta.env.VITE_HOST_API}auth/logout`)
      // После успешного выхода пользователя можно выполнить дополнительные действия,
      // например, перенаправление на страницу входа или обновление компонента
      console.log('Logged out successfully')
    } catch (error) {
      console.error('Error logging out:', error)
    }
    // console.log(document.cookie)
    // var cookies = document.cookie.split(';')

    // // Перебрать и удалить каждый cookie
    // for (var i = 0; i < cookies.length; i++) {
    //   var cookie = cookies[i]
    //   var eqPos = cookie.indexOf('=')
    //   var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    //   // Установить истекший срок действия
    //   document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
    // }
    // window.location.reload()
  }

  return { isAuth, user, setUser, logout, initUser }
})
