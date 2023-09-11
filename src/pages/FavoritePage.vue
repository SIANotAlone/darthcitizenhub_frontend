<template>
    <div>
        <h1>закладки</h1>
        <button   @click="delete_all_favorite" class="neon-btn neon-btn--purple">Видалити всі закладки</button>
        <NewsComp v-bind:news="news"></NewsComp>
    </div>
</template>
<script>
  
import axios from 'axios';
import NewsComp from "@/components/NewsComp.vue"
import server_ip from "@/myconfig/ipconfig.js"


export default {


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

    var result = window.confirm("Ви впенені, що хочете видалити всі новини зі списку обраних?");
    if (result) {
      axios.post(server_ip +'/news/games/deleteallfavorite/')
      this.news = [];
        // User clicked OK
        // Perform the delete operation
    } else {
        // User clicked Cancel or closed the dialog
        // Cancel the operation
    }

    

  },

 
},
mounted() {
    axios.get(server_ip +'/news/games/favorite/').then(response => this.news=response.data)
    
    

  }
}
</script>

<style>

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

</style>