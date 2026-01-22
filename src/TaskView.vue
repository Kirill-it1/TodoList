<template>

  <div class="task">
    <div class="field">
      <label 
        for="text-input" 
        class="label task__label"
      >
        Название задачи
      </label>
      <input 
        id="text-input" 
        class="input task__input" 
        v-model="currentTask.text" 
        autocomplete="off"
      />

    </div>
    <div class="field">
      <label 
        for="text-message" 
        class="label task__label"
      >
        Текст задачи
      </label>
      <textarea 
        class="input task__input task__message" 
        name="task-message" 
        id="text-message" 
        v-model="currentTask.message"
      >
      </textarea>
    </div>
    <label class="task__checkbox-label">
      <input 
        type="checkbox" 
        class="checkbox task__checkbox"  
        v-model="currentTask.isCompleted" 
      />
      <span class="task__checkbox-text">Отметить выполненным</span>
    </label>
    
    <p class="task__date">Создано: {{ currentTask.date }}</p>
  </div>
</template>
<script setup>
  import { useTodosStore } from './stores/todos';
  import { useRoute } from 'vue-router';

  import { computed } from 'vue'

  const route = useRoute()

  const store = useTodosStore()

  const currentTask = computed(() => {
    const taskId = route.params.id
    return store.todos.find(({id}) => id == taskId)
  })



</script>

<style scoped>

  .field {
    margin-bottom: 20px;
  }

  .task__label {
    display: block;
    margin-bottom: 10px;
  }
  .task__message {
    height: 300px;
  }
  .task__checkbox {
    display: block;
    margin-bottom: 6px;
  }
  .task__checkbox-label {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 30px;
    margin-bottom: 15px;
    
  }

  .task__checkbox-text{
    display: block;
    
  }
</style>