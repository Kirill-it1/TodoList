  <template>
    <nav class="nav">
      <router-link class="nav__link" to="/">HOME</router-link> |
      <router-link class="nav__link" to="/tasks/">TASKS</router-link>
    </nav>


      <main>
        <router-view />
      </main>



  </template>

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

    .nav {
      display: flex;
      justify-content: space-around;
      margin: 40px auto;
      width: 200px;
    }


    .nav__link {
      display: block;
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

    .checkbox {
    position: relative;
    appearance: none;

    display: block;
    

    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 2px;
    cursor: pointer;
  }

  .checkbox::after {
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

  .checkbox:checked {
    background-color: black;
  }

  .checkbox:checked::after {
    display: block;
  }




    

  </style>