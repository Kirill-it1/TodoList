<template>
  <div class="todo__field field add-field">
    <label 
      for="add-task-input" 
      class="field__label"
    >
      Название задачи
    </label>
    <input 
      type="text"
      class="input field__input"
      placeholder=" "
      id="add-task-input"
     :value="modelValue"
     @keyup.enter="$emit('add', $event.target.value)"
     @input="$emit('update:modelValue', $event.target.value)"
      ref="inputRef"
      autocomplete="off"
      tabindex="1"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
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
      position: relative;
      width: 100%;
      margin-bottom: 20px;
      height: 68px;
      padding-top: 23px;
    }

    .field__label {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      margin-bottom: 8px;
      
      transition: .2s;
    }

    .field:has(.field__input:placeholder-shown) .field__label {
      font-size: 20px;
      transform: translate(10px, 38px);
      opacity: 0.5;
    }



</style>