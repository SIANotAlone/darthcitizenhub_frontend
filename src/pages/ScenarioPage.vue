<template>
    <h1 class="page_title">Сценарій</h1>
    <button v-if="scenario['released']==false" @click="release_scenario" class="neon-btn neon-btn--purple">Зарелізити сценарій</button>
    <button @click="delete_scenario(scenario['id'])" class="neon-btn neon-btn--purple">Видалити сценарій</button>
    <h2 class="edit_title">Редагувати сценарій</h2>
    <div class="editors">
    <div class="form__group field">
      <input type="input" class="form__field" placeholder="Номер" name="name" id='number' required v-model="scenario['number']"/>
      <label for="name" class="form__label">Номер</label>
    </div>
    <div class="form__group field">
      <input type="input" class="form__field" placeholder="Назва" name="name" id='name' required  v-model="scenario['title']"/>
      <label for="name" class="form__label">Назва</label>
    </div>
  </div>
    <div class="notation">

        <ckeditor :editor="editor" v-model="scenario['body']"  :id="scenario['id']" :config="editorConfig" />
    </div>
  
            <button @click="update_scenario()" class="neon-btn neon-btn--purple save"
                >Зберегти</button>


    </template>
    <script>
    
import axios from 'axios';

import server_ip from "@/myconfig/ipconfig.js"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
    setup() {
        const theme = 'dark';
        const notify = (message) => {
            toast.success(message, {
                autoClose: 1000,
                theme,
            }); // ToastOptions
        }
        return { notify };
    },
    components: {
      
        ckeditor: CKEditor.component,

    },
    data() {
        return {
            scenario:{},
            editor: ClassicEditor,
            editorConfig: {
                

            },
            editorData: '<p>Initial content</p>',
            news_count: 0,


        }
    },
    mounted() {

    axios.get(server_ip + '/scenario/' + this.$route.params.id).then(response => this.scenario=response.data)
    
},
    methods:{
        update_scenario(){
            let editor = document.getElementsByClassName('ck ck-content ck-editor__editable')
            let body = editor[0].innerHTML
            let number = parseInt(document.getElementById('number').value)
            let title = document.getElementById('name').value
            let id=this.scenario['id']
            if (!isNaN(number) && title !== ''){
                let update_request = {
                    "id":id,
                    "number":number,
                    "title":title,
                    "body":body
                }
                axios.post(server_ip + '/scenario/update/', update_request)
                this.notify('Збережено')
            }
            else{
                alert('Введіть коректні дані')
            }
                

        },
        delete_scenario(){
            let id = this.scenario['id']
            var result = window.confirm("Ви впенені, що хочете видалити cценарій? ");
            if (result) {
                axios.post(server_ip + '/scenario/delete', {"id": id}).then(response => {
                    if (response.data['status'] == '200, OK') {

                        this.notify('Видалено')
                        this.$router.push({ path: '/scenarios' })
                        

                    }
                })
            }


        },
        release_scenario(){
            let id = this.scenario['id']
            let req = {"id": id}
            var result = window.confirm("Ви впенені, що хочете зарелізити cценарій? ");
            if (result) {
                axios.post(server_ip + '/scenario/release/', req).then(response => {
                    if (response.data['status'] == '200, OK') {

                        this.notify('Випущено в реліз')
                        this.$router.push({ path: '/scenarios' })
                    }
                })
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
.notation{
    background-color: ghostwhite;
    margin-left: 20%;
    margin-right: 20%;
    border-radius: 10px;
    box-shadow: 10px 5px 5px black;
    margin-top: 40px;
    margin-bottom: 20px;
}
.edit_title{
    color: #ff5dd1;
    text-shadow:
        0 0 5px #ff5dd1,
        0 0 10px #ff5dd1,
        0 0 20px #ff5dd1,
        0 0 40px #ff19be,
        0 0 80px #ff19be,
        0 0 90px #ff19be,
        0 0 100px #ff19be,
        0 0 150px #ff19be;
}

button{
  margin-left: 10px;
  margin-right: 10px;
}
</style>