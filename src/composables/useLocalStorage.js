import { ref, watch } from 'vue'

export function useLocalStorage(key, initialValue) {
  const data = ref(initialValue)

  try {
    const stored = localStorage.getItem(key)
    if (stored)
      data.value = JSON.parse(stored)
  } catch (e) {
    console.error('Ошибка чтения из localStorage:', e)
  }

  watch(data, (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))

    } catch (e) {
      console.error('Ошибка записи в localStorage:', e)

    }
  }, {deep: true})

  const clear = () => {
    console.log('pptptpt')
    data.value = []
    console.log(data.value)
  }

  return {
    data,
    clear
  }
}