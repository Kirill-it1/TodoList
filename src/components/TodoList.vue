<template>
  <div class="tasks">
    <ul class="tasks__list" v-if="todos.length" >
      <li class="tasks__item item"
          :class="{'item_completed': item.isCompleted}"
          v-for="(item, idx) in todos"
          :key="idx"
      > 
        <input class="item__checkbox tasks__checkbox checkbox" 
              type="checkbox" 
              v-model="item.isCompleted"
              @change="$emit('toggle', item)"
              :id="`chkbx-${item.id}`"
        />
        <label class="item__text" :for="`chkbx-${item.id}`">{{ item.text }}</label>
        <button @click="$emit('remove', item.id)" class="button item__button">delete task</button>
      </li>
    </ul>
    <p class="tasks__empty-block" v-else>{{ message }}</p>
  </div>

</template> 
<script setup>
 
  defineProps({
    todos: {
      type: Array,
      default: []
    },
    message: {
      type: String,
      default: ''
    }
  })

  defineEmits(["toggle", "remove"])


</script>
<style>
  .tasks__item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;

    flex-shrink: 0;
  }
  .item {
    list-style-type: none;
  }

  .item__button {
    margin-left: auto;

    border: none;
    background-color: transparent;
    font-size: 15px;
    text-decoration: underline;
    font-weight: bolder;
    letter-spacing: .2cap;

  }
  .item__checkbox {
    position: relative;
    appearance: none;

    display: block;
    

    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 2px;
    cursor: pointer;
  }

  .item__checkbox::after {
    content: '';
    position: absolute;
    /* Styling the checkmark itself */
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    /* Positioning the checkmark within the box */
    left: 5px;
    top: 2px;
    /* Hide the checkmark when not checked */
    display: none; 
  }

  .item__checkbox:checked {
    background-color: black;
  }

  .item__checkbox:checked::after {
    display: block;
  }

  .item__text {
    display: block;
    max-width: 350px;
    font-size: 20px;
    font-weight: bolder;
    padding-top: 4px
  }


  

  .item_completed .item__text{
    text-decoration: line-through;
  }

</style>