<template>
  <div class="todo__field field filter-field">
    <label for="filter-tasks-input" class="field__label">Фильтр</label>
    <input type="text"
          :value="filter"
          class="input field__input"
          id="filter-tasks-input"
          @input="$emit('update:filter', $event.target.value)"
    />
  </div>
  <p class="todo__message">Current taskname is {{ currentValue.length !== 0 ? currentValue : 'EMPTY'}}, which is <span :style="{fontWeight: 'bolder', color: isCorrectName ? 'green' : 'red'}">{{ isCorrectName ? 'correct' : 'incorrect' }}</span> But I think {{ validationResult }}</p>
  <div class="button-block">
    <button class="add-task todo__button button" 
            @click="$emit('add', inputValue)"
    >
      Add new task
    </button>
    <button class="remove-tasks todo__button button" 
            @click="$emit('remove')" 
    >
      Remove all tasks
    </button>
  </div>
</template>

<script setup>
  import { ref, computed, watch} from 'vue'
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
    isCorrectName: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Function,
      default: () => false
    }
  })

  const validationResult = computed(() => props.isValid(props.inputValue, (obj) => obj.message))

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
</style>