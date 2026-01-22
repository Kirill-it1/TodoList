<template>
  <div class="tasks">
    <ul 
      class="tasks__list" 
      v-if="todos.length" 
    >
      <li 
        class="tasks__item item"
       :class="{'item_completed': item.isCompleted}"
        v-for="(item, idx) in todos"
       :key="idx"
      > 
        <input 
          class="item__checkbox tasks__checkbox checkbox" 
          type="checkbox" 
          v-model="item.isCompleted"
         @change="$emit('toggle', item)"
         :id="`chkbx-${item.id}`"
        />
        <label 
          class="item__text" 
         :for="`chkbx-${item.id}`"
        >
          {{ item.text }}
        </label>
        <a 
          class="item__link" 
         @click="$emit('gotoTask', item.id)"
        >
          link
        </a>
        <button 
          class="button item__button"
         @click="$emit('remove', item.id)" 
        >
          delete task
        </button>
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

  defineEmits(["toggle", "remove", "gotoTask"])


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

  .item__link {
    display: block;
    margin-left: auto;
  }

  .item__button {

    border: none;
    background-color: transparent;
    font-size: 15px;
    text-decoration: underline;
    font-weight: bolder;
    letter-spacing: .2cap;

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