<template>
  <TodoInput v-model="store.inputValue" @add="store.addItem" />

  <TodoControls
    v-model:filter="store.filterQuery"
    :input-value="store.inputValue"
    :trimmedValue="store.trimmedValue"
    :has-todos="store.hasTodos"
    :isValid="store.validate"
    @add="store.addItem"
    @remove="store.removeItems"
  />
  

  <TodoList
    :message="store.emptyMessage"
    :todos="store.currentTodos"
    @toggle="store.toggleTodo"
    @remove="store.removeItem"
    @goto-task="gotoTask"
  />
</template>

<script setup>
  // import { useTodos } from './composables/useTodos'
  import TodoInput from './components/TodoInput.vue'
  import TodoControls from './components/TodoControls.vue'
  import TodoList from './components/TodoList.vue'
  import { useTodosStore } from './stores/todos'

  import { useRouter } from 'vue-router'

  const router = useRouter()
  const store = useTodosStore()

  const gotoTask = (itemId) => {
    router.push(`/${itemId}`)
  }



</script>