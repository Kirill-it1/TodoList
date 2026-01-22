  <template>
    <div class="todo">
      <h1 class="title todo__title">My TODO list</h1>
      <!-- <TodoInput :val="inputValue" @add="addItem" @update="val => inputValue = val" /> -->

      <TodoInput v-model="inputValue" @add="addItem" />

      <TodoControls
        v-model:filter="filterQuery"
        :input-value="inputValue"
        :currentValue="trimmedValue"
        :isCorrectName="isTextCorrect"
        :isValid="isValid"
        @add="addItem"
        @remove="removeItems"
      />
      

      <TodoList
        :message="emptyMessage"
        :todos="currentTodos"
        @toggle="toggleTodo"
        @remove="removeItem"
      />
    </div>



  </template>
  <script setup>
    import { defineAsyncComponent } from 'vue'
    import { useTodos } from './composables/useTodos'

    import TodoInput from './components/TodoInput.vue'
    import TodoControls from './components/TodoControls.vue'
    import TodoList from './components/TodoList.vue'


    const {
      inputValue,
      filterQuery,
      isTextCorrect,

      currentTodos,
      trimmedValue,
      emptyMessage,

      addItem,
      removeItem,
      removeItems,
      toggleTodo
    } = useTodos()

    const isValid = (text, callback) => {
      const isvalid = text.length > 0
      const message = isvalid ? "Все хорошо": "Плохо"
      callback({isvalid, message})
      return message
    }
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


      border-radius: 4px;
      outline: none;
      border: 0px;
      font-size: 20px;
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