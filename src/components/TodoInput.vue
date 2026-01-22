<template>
  <div class="todo__field field add-field">
    <label for="add-task-input" class="field__label">Название таски</label>
    <input type="text"
           class="input field__input"
           id="add-task-input"
           :value="modelValue"
           @keyup.enter="$emit('add', $event.target.value)"
           @input="$emit('update:modelValue', $event.target.value)"
           ref="inputRef"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted} from 'vue'
  // Пришло от родителя теперь имеет право быть в темплейте
  defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  // Отправляем родителю события, он их через слушателя на TodoInput может услышать

  defineEmits(['add', 'update:modelValue'])

  const inputRef = ref(null)

  onMounted(() => {
    inputRef.value?.focus()
  })


</script>
<style>
    .todo__field {
      width: 100%;
      margin-bottom: 20px;
    }

    .field__label {
      display: block;
      margin-bottom: 8px
    }


</style>