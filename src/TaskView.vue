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
        v-model="localTask.text" 
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
        v-model="localTask.message"
        
      >
      </textarea>
    </div>
    <label class="task__checkbox-label">
      <input 
        type="checkbox" 
        class="checkbox task__checkbox"  
        v-model="localTask.isCompleted" 
      />
      <span class="task__checkbox-text">Отметить выполненным</span>
    </label>
    <div class="task__footer">
      <p class="task__date">Создано: {{ currentTask.date }}</p>
      <button class="button task__quit task__button" @click="quitWithSaving">SAVE AND QUIT</button>
    </div>
  </div>
</template>
<script setup>
  import { useTodosStore } from './stores/todos';
  import { useRoute, useRouter } from 'vue-router';

  import { ref, computed, watch } from 'vue'

  const route = useRoute()
  const router = useRouter()

  const store = useTodosStore()

  const taskId = route.params.id
  
  const currentTask = computed({
    
    get() {
      const cur = store.todos.find(({id}) => id == taskId)
      return cur
    },

    set(newValue) {
      store.updateItem(taskId, newValue)
    }
    
  })

  const localTask = ref({})
  watch(currentTask, (value) => {
    localTask.value = JSON.parse(JSON.stringify(value))
  }, { immediate: true, deep: true })

  const saveChanges = () => {

    if (localTask.value.text?.trim()) {
      currentTask.value = localTask.value
    }
  }

  const quitWithSaving = () => {
    saveChanges()
    router.push('/tasks/')
  }


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
    resize: none;
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

  .task__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .task__button{
    background-color: #fff;
  }

</style>