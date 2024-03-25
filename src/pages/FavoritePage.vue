<template>
    <div>
        <h1 class="page_title">Закладки</h1>
        <button   @click="showModal = true" class="neon-btn neon-btn--purple">Видалити всі закладки</button>

    <!-- Modal dialog -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Підтвердіть будь ласка дію</h2>
        <br>
        <p>Ви дійсно хочете видалити всі закладки?</p>
        <br>
        <button @click="delete_all_favorite" class="neon-btn neon-btn--purple">Так</button>
        <button @click="showModal = false" class="neon-btn neon-btn--purple">Ні</button>
      </div>

    </div>
        <h3 v-if="news == null" class="empty">Новин в закладки поки що не додано</h3>

          <NewsComp v-bind:news="news"></NewsComp>

    </div>
</template>
<script>
  
import axios from 'axios';
import NewsComp from "@/components/NewsComp.vue"
import server_ip from "@/myconfig/ipconfig.js"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
import { ref } from 'vue';


export default {

  setup() {
        const theme = 'dark';
        const showModal = ref(false);


        const notify = (message) => {
            toast.success(message, {
                autoClose: 1000,
                theme,
            }); // ToastOptions
        }
        return { notify, showModal };
    },
components: {
  NewsComp
},

data(){
  return {
    news:[],
    page:2
  }
},
methods:{
  handleChange(id) {
  
    //console.log(`Checkbox with ID ${id} changed: ${this.isChecked}`)
    
    let json = { "id": id, "checked":this.isChecked  }
    axios.post(server_ip +'/news/games/changefavorite/',json)
  },


  delete_all_favorite(){

      axios.post(server_ip +'/news/games/deleteallfavorite/')
      this.news = null;
      this.notify("Закладки очищено")
      this.showModal = false

    
    

  },

 
},
mounted() {
    axios.get(server_ip +'/news/games/favorite/').then(response => this.news=response.data)
    
    

  }
}
</script>

<style>
button{
  margin-left: 10px;
  margin-right: 10px;
}

.neon-btn--purple {
  color: #fff;
  background-color: cornflowerblue;
  border: 0px solid cornflowerblue;
}

.neon-btn--purple:hover {
  background-color: #f038ff;
  color: #fff;
  border: 1px solid #f038ff;
  box-shadow: 10px 10px 100px 6px #f038ff;
}
.page_title{ 

color: #5dbdff;
text-shadow:
0 0 5px #5dbdff,
0 0 10px #5dbdff,
0 0 20px #5dbdff,
0 0 40px #8bd0ff,
0 0 80px #8bd0ff,
0 0 90px #8bd0ff,
0 0 100px #8bd0ff,
0 0 150px #8bd0ff;
}
.empty{
color: #fff;
margin-bottom: 50px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>