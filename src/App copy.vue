  <template>
    <div class="todo">
      <h1 class="title todo__title">My TODO list</h1>
      <div class="todo__field field add-field">
        <label for="add-task-input" class="field__label">Название таски</label>
        <input type="text"
              class="input field__input"
              id="add-task-input"
              v-model="inputValue"
              @keypress="keyPressHandler"
        />
      </div>
      <div class="todo__field field filter-field">
        <label for="filter-tasks-input" class="field__label">Фильтр</label>
        <input type="text"
              v-model="filterQuery"
              class="input field__input"
              id="filter-tasks-input"
        />
      </div>

      <p class="todo__message">Current taskname is {{ getCurrentValue.length !== 0 ? getCurrentValue : 'EMPTY'}}</p>
      <div class="button-block">
        <button class="add-task todo__button button" 
                @click="addItem"
        >
          Add new task
        </button>
        <button class="remove-tasks todo__button button" 
                @click="removeItems" 
                :disabled="!hasTodos"
        >
          Remove all tasks
        </button>
      </div>

      <div class="tasks">
        <ul class="tasks__list" v-if="currentTodos.length" >
          <li class="tasks__item item"
              :class="{'item_completed': item.isCompleted}"
              v-for="(item, idx) in currentTodos"
              :key="idx"
          > 
            <input class="item__checkbox tasks__checkbox checkbox" 
                  type="checkbox" 
                  v-model="item.isCompleted"
                  @change="inputChangeHandler(item)"
                  :id="`chkbx-${item.id}`"
            />
            <label class="item__text" :for="`chkbx-${item.id}`">{{ item.text }}</label>
            <button @click="removeItem(item.id)" class="button item__button">delete task</button>
          </li>
        </ul>
        <p class="tasks__empty-block" v-else>Пока нет ни одной таски</p>
      </div>
    </div>

  </template>
  <script setup>
    MAX_SYMBOLS_IN_ROW
    import { ref, computed, watch } from 'vue' 

    const todos = ref([
      {id: 1, text: 'Learn Vue 3', isCompleted: false},
      {id: 2, text: 'Explore Compositions API', isCompleted: false},
      {id: 3, text: 'Build something awesome', isCompleted: false},
      {id: 4, text: 'Start learning new things', isCompleted: true},
    ])

    const MAX_SYMBOLS_IN_ROW = 10

    const filteredTodos = ref([])

    const inputValue = ref('')
    const filterQuery = ref('')

    const isFiltered = ref(false)

    const addItem = () => {
      const itemName = inputValue.value.trim()

      if (itemName.length !== 0 && checkTextCorrect(itemName)) {
        const newId = todos.value.length + 1
        todos.value.push({
          id: newId,
          text: itemName
        })

      }

      inputValue.value = ''
    }

    const removeItems = () => {
      if (todos.value.length) {
        const isSure = confirm("Вы уверены, что хотите удалить все таски?")
        if (isSure) 
          todos.value = []
      }
    }

    const removeItem = (itemId) => {
      todos.value = todos.value.filter(({id}) => id !== itemId)
      console.log(itemId)
    }
    const getCurrentValue = computed(() => {
      return inputValue.value.trim()
    })

    const hasTodos = computed(() => todos.value.length !== 0)

    const currentTodos = computed(() => isFiltered.value ? filteredTodos.value : todos.value)

    const keyPressHandler = (event) => {
      if (event.key === 'Enter')
        addItem()
    }

    const inputChangeHandler = (item) => {

      console.log(`Таска "${item.text}" ${item.isCompleted ? 'выполнена' : 'не выполнена'}`)
    }

    const checkTextCorrect = (text) => {
      return text.split(' ').reduce((acc, val) => {return Math.max(acc, val.length)}, 0) <= MAX_SYMBOLS_IN_ROW
    }

    watch(filterQuery, (query, _) => {
    
      if (query.length) {
        filterTodos(query)
        isFiltered.value = true
      } else 
        isFiltered.value = false
    })

    watch(todos, () => {
      filterTodos(filterQuery.value)
    }, {deep: true})

    const filterTodos = (query) => {
      filteredTodos.value = todos.value.filter(
        ({text}) => text.toUpperCase()
                        .includes(query.trim().toUpperCase())
      )
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

    .todo__field {
      width: 100%;
      margin-bottom: 20px;
    }

    .field__label {
      display: block;
      margin-bottom: 8px
    }

    .todo__title {
      margin-bottom: 20px;
    }

    .todo__message {
      margin-bottom: 15px;
    }

    .button-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .tasks {

    }

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
    .remove-tasks {
      color: rgb(134, 0, 0)
    }

  </style>