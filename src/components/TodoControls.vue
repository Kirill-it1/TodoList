<template>
  <div class="todo__field field filter-field">
    <label for="filter-tasks-input" class="field__label">Фильтр</label>
    <input type="text"
          :value="filter"
          class="input field__input"
          placeholder=" "
          id="filter-tasks-input"
          @input="$emit('update:filter', $event.target.value)"
    />
  </div>
  <p class="todo__message">Current taskname is {{ currentValue.length !== 0 ? currentValue : 'EMPTY'}}, which is <span :style="{fontWeight: 'bolder', color: validationResult ? 'green' : 'red'}">{{ validationResult ? 'correct' : 'incorrect' }} </span></p>
  <div class="button-block">
    <button class="add-task todo__button button" 
            @click="$emit('add', inputValue)"
    >
      Add new task
    </button>
    <button class="remove-tasks todo__button button" 
            @click="$emit('remove')" 
            :disabled="!hasTodos"
    >
      Remove all tasks
    </button>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  // Приняли
  const props = defineProps({
    filter: {
      type: String,
      default: ''
    },
    inputValue: {
      type: String,
      default: ''
    },
    currentValue: {
      type: String,
      default: ''
    },
    hasTodos: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Function,
      default: () => false
    }
  })

  const validationResult = computed(() => props.isValid(props.inputValue))

  // Отправили
  const emit = defineEmits(['update:filter', 'add', 'remove'])


</script>
<style>
    .todo__message {
      margin-bottom: 15px;
    }

    .button-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }


    .remove-tasks {
      color: rgb(134, 0, 0)
    }

    .remove-tasks:disabled {
      opacity: 0.6;
      color: black;
    }
</style>