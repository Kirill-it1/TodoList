import { ref, computed, watch } from 'vue' 
import { defineStore } from 'pinia'
import { useLocalStorage } from '../composables/useLocalStorage'


export const useTodosStore = defineStore('todos', () => {

  const { data: todos, clear: clearStorage } = useLocalStorage('todos', [])

  const filteredTodos = ref([])
  const inputValue = ref('')
  const filterQuery = ref('')
  const isFiltered = ref(false)


  const MAX_SYMBOLS_IN_ROW = 20

 
  const hasTodos = computed(() => {

    return todos.value.length !== 0

  })

  const currentTodos = computed(() => isFiltered.value ? filteredTodos.value : todos.value)

  const emptyMessage = computed(() => !hasTodos.value ? 'Пока нет ни одной таски' : `Не найдено ни одной таски по запросу ${filterQuery.value}`)

  const trimmedValue = computed(() => {
    return inputValue.value.trim()
  })

  const isTextCorrect = computed(() => {
    return validate(trimmedValue.value)
  })


  const addItem = (text) => {
    const itemName = text.trim()

    if (isTextCorrect.value) {
      const newId = todos.value.reduce((acc, {id}) => Math.max(acc, id), 0) + 1
      todos.value.push({
        id: newId,
        text: itemName,
        message: '',
        isCompleted: false,
        date: new Date().toLocaleString()
      })


    }

    inputValue.value = ''


  }

  const removeItems = () => {
    if (hasTodos.value) {
      const isSure = confirm("Вы уверены, что хотите удалить все таски?")
      if (isSure) 
        clearStorage()
    }
  }
  
  const removeItem = (itemId) => {
    console.log(itemId)
    todos.value = todos.value.filter(({id}) => id !== itemId)
  }

 

  const toggleTodo = (item) => {

    console.log(`Таска "${item.text}" ${item.isCompleted ? 'выполнена' : 'не выполнена'}`)
  }

  const validate = (text) => {
    return Boolean(text.length && (text.split(' ').reduce((acc, val) => {return Math.max(acc, val.length)}, 0) <= MAX_SYMBOLS_IN_ROW))
  }

  watch(filterQuery, (query, _) => {

    if (query.length) {
      filterTodos(query)
      isFiltered.value = true
    } else 
      isFiltered.value = false
  })

  watch(todos, () => {
    filterTodos(filterQuery.value)
  }, {deep: true})

  const filterTodos = (query) => {
    filteredTodos.value = todos.value.filter(
      ({text}) => text.toUpperCase()
                      .includes(query.trim().toUpperCase())
    )
  }

  // const isValid = (text, callback) => {
  //   const isvalid = is
  //   const message = isvalid ? "Все хорошо": "Плохо"
  //   callback({isvalid, message})
  //   return message
  // }

  return {
    todos,
    filteredTodos,
    inputValue,
    filterQuery,
    isFiltered,
    isTextCorrect,
    hasTodos,


    currentTodos,
    trimmedValue,
    emptyMessage,

    addItem,
    removeItem,
    removeItems,
    toggleTodo,
    validate
  }
})
