import { ref, computed, watch } from 'vue' 

import { defineStore } from 'pinia'

export function useTodos() {

  const todos = ref([
    {id: 1, text: 'Learn Vue 3', isCompleted: false},
    {id: 2, text: 'Explore Compositions API', isCompleted: false},
    {id: 3, text: 'Build something awesome', isCompleted: false},
    {id: 4, text: 'Start learning new things', isCompleted: true},
  ])

  const filteredTodos = ref([])
  const inputValue = ref('')
  const filterQuery = ref('')
  const isFiltered = ref(false)


  const MAX_SYMBOLS_IN_ROW = 10

 


  const hasTodos = computed(() => todos.value.length !== 0)

  const currentTodos = computed(() => isFiltered.value ? filteredTodos.value : todos.value)

  const emptyMessage = computed(() => !hasTodos.value ? 'Пока нет ни одной таски' : `Не найдено ни одной таски по запросу ${filterQuery.value}`)

  const trimmedValue = computed(() => {
    return inputValue.value.trim()
  })

  const isTextCorrect = computed(() => {
    return Boolean(trimmedValue.value.length && (inputValue.value.split(' ').reduce((acc, val) => {return Math.max(acc, val.length)}, 0) <= MAX_SYMBOLS_IN_ROW))
  })


  const addItem = (text) => {
    const itemName = text.trim()

    if (isTextCorrect.value) {
      const newId = todos.value.length + 1
      todos.value.push({
        id: newId,
        text: itemName
      })


    }

    inputValue.value = ''


  }

  const removeItems = () => {
    if (hasTodos.value) {
      const isSure = confirm("Вы уверены, что хотите удалить все таски?")
      if (isSure) 
        todos.value = []
    }
  }
  
  const removeItem = (itemId) => {
    todos.value = todos.value.filter(({id}) => id !== itemId)
  }

 

  const toggleTodo = (item) => {

    console.log(`Таска "${item.text}" ${item.isCompleted ? 'выполнена' : 'не выполнена'}`)
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

  return {
    todos,
    filteredTodos,
    inputValue,
    filterQuery,
    isFiltered,
    isTextCorrect,


    currentTodos,
    trimmedValue,
    emptyMessage,

    addItem,
    removeItem,
    removeItems,
    toggleTodo
  }
}
