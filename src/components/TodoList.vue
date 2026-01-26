<template>
  <div class="tasks">
    <ul 
      class="tasks__list" 
      v-if="todos.length" 
    >
      <li 
        class="item-wrapper"
        v-for="(item, idx) in todos"
       :key="idx"
       :id="`item-${item.id}`"
       :class="{
          'item_completed': item.isCompleted,
          'appearing': item.id == lastAddedId
        }"
      > 
        <div class="tasks__item item">
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
           @click="$emit('gotoTask', item.id, $event)"
            tabindex="0"
            aria-role="button"
           :href="`#task-${item.id}`"
          >
            link
          </a>
          <button 
            class="button item__button"
           @click="$emit('remove', item.id)" 
          >
            delete&nbsp;task
          </button>
        </div>
        
      </li>
    </ul>
    <p class="tasks__empty-block" v-else>{{ message }}</p>
  </div>

</template> 
<script setup>

  import { inject } from 'vue'
 
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

  const lastAddedId = inject('lastAddedItemId')

</script>
<style>
@keyframes appear {
  0% {
    transform: translateX(-75%);
    opacity: 0;

  }
  100% {
    grid-template-rows: 1fr;
    transform: translateX(0);
    opacity: 1;
  }
}
  .tasks__item {
    display: flex;
    align-items: center;
    gap: 10px;

    flex-shrink: 0;
    overflow: hidden;
  }
  .item {
    list-style-type: none;
  }

  .item-wrapper {
    display: grid;
    grid-template-rows: 1fr; 
    overflow: hidden;
    margin-bottom: 10px;
  }
  .item-wrapper.dissapearing {
    grid-template-rows: 0fr;
    opacity: 0;
    margin: 0;
    transform: translateX(-75%);
    transition-duration: 0.4s;
    transition-delay: grid-template-rows .2s;
    user-select: none;
    pointer-events: none;
    
  }
  .item-wrapper.appearing {
    user-select: none;
    pointer-events: none;
    animation: appear .4s;
    
  }

  /* .item-wrapper.dissapearing ~ .item-wrapper {
    transition-delay: .2s;
    transition-duration: .2s;
  } */


  .item__link {
    padding-top: 4px;
    color: black;
    display: block;
    margin-left: auto;
    text-decoration: underline;
    cursor: pointer;
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