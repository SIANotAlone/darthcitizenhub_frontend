<template>
  <h1 class="page_title">Новий випуск</h1>
  <div class="editors">
    <div class="form__group field">
      <input type="input" class="form__field" placeholder="Номер" name="name" id='number' required />
      <label for="name" class="form__label">Номер</label>
    </div>
    <div class="form__group field">
      <input type="input" class="form__field" placeholder="Назва" name="name" id='name' required />
      <label for="name" class="form__label">Назва</label>
    </div>

  </div>

  <button @click="create_new_episode" class="neon-btn neon-btn--purple">Створити випуск</button>
</template>

<script>
import axios from 'axios'
import server_ip from "@/myconfig/ipconfig.js"




export default {
  methods: {
    create_new_episode() {
      let number = parseInt(document.getElementById("number").value)

      if (isNaN(number) == false) {
        let name = document.getElementById("name").value
        let request = {
          "name": name,
          "number": number
        }
        axios.post(server_ip + '/episode/new/', request).then(response => {
          if (response.data['status'] == '200, OK') {
            alert("Випуск № " + number + " " + name + " створено")
            this.$router.push({ path: '/episode' })
          }
        })



      }
      else {
        alert("Введіть корректний номер випуску")
      }


    }
  }
}
</script>
<style scoped>
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;

}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  text-align: center;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown~.form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;

  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;


}

.form__field:focus {
  ~.form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #5dbdff;
    font-weight: 700;


  }
  

  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #ff24ed, #557ff7);
  border-image-slice: 1;
}

/* reset input */
.form__field {

  &:required,
  &:invalid {
    box-shadow: none;
  }
}

/* demo */
body {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  background-color: #222222;
}

.editors {
  margin-left: 30%;

}
button {
  margin-top: 30px;
  margin-bottom: 40;
}
</style>