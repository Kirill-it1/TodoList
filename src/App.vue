  <template>
    <div class="todo">
      <h1 class="title todo__title">My TODO list</h1>
      <!-- <TodoInput :val="inputValue" @add="addItem" @update="val => inputValue = val" /> -->

      <TodoInput v-model="store.inputValue" @add="store.addItem" />

      <TodoControls
        v-model:filter="store.filterQuery"
        :input-value="store.inputValue"
        :currentValue="store.trimmedValue"
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
      />
    </div>



  </template>
  <script setup>
    // import { useTodos } from './composables/useTodos'
    import TodoInput from './components/TodoInput.vue'
    import TodoControls from './components/TodoControls.vue'
    import TodoList from './components/TodoList.vue'
    import { useTodosStore } from './stores/todos'

    const store = useTodosStore()



  </script>
  <style>
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Courier New', Courier, monospace;
      line-height: 100%;
    }

    .title {
      font-size: 34px;
      text-transform: uppercase;
    }
    .input {
      display: block;
      width: 100%;
      height: 40px;
      padding: 10px;
      outline: none;

      border-radius: 4px;
      
      border: 0px;
      font-size: 20px;
    }

    .input:focus {
      outline-style: dashed;
      outline-width: 2px;
    }
    .todo{
      width: 600px;
      margin: 100px auto;
      padding: 40px 30px;

      background-color: rgb(215, 232, 248);
      border-radius: 10px;

      
    }
    .button {
      padding: 14px 20px 10px;
      border-radius: 5px;
      display: block;
      transition: .1s;
    }

    .button:not(:disabled){
      cursor: pointer;

    }

    .button:not(:disabled):hover {
      transform: scale(1.02);
    }
    
    .todo__button {
      font-size: 18px;
      text-transform: uppercase;
      border: 2px solid black;
      background-color: white;
    }



    .todo__title {
      margin-bottom: 20px;
    }




    

  </style>