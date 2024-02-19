<template>
    <div><h1 class="page_title">Останні новини</h1>
      <div id="v-model-select" class="demo">
  <select v-model="selected" @change="change_origin()">
    <option disabled value="">Оберіть джерело</option>
    <option>Всі джерела</option>
    <option v-for="item in origins" :key="item.origin">{{ item.origin }}</option>
    
  </select>
  <!-- <span style="color: white;"> Обрано: {{ selected }}</span> -->
</div>

        <NewsComp v-bind:news="news"></NewsComp>
          <button @click="next_page" class="neon-btn neon-btn--purple">Завантажити ще</button>

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
      page:2,
      origins:[],
      selected: 'Всі джерела'
    }
  },
  methods:{
    handleChange(id) {
    
      //console.log(`Checkbox with ID ${id} changed: ${this.isChecked}`)
      
      let json = { "id": id, "checked":this.isChecked  }
      axios.post(server_ip + '/news/games/changefavorite/',json)
    },
    get_latest_news(){
      console.log("testing")
    },
    next_page(){
      if (this.selected != 'Всі джерела'){
        this.get_next_page_by_origin(this.page)
        this.page +=1

      } else {
        this.get_next_page(this.page)
      this.page +=1
    }
      
      
    },
    get_next_page_by_origin(page){
      
        var link =  server_ip + '/news/games/by_origin/' + this.selected + '/'+page
      axios.get(link).then(response => {

        let data = response.data
        //console.log(data)
        var count = data.length;
        //console.log(count)
        var i=0
        if (data != null){
          for(i=0;i<count;i++){
          
          this.news.push(data[i])
        }
        }
        
        


      })

      

    },

    change_origin(){
      this.news = []
      if (this.selected != 'Всі джерела'){
        this.page =2;
        var link =  server_ip + '/news/games/by_origin/' + this.selected
      axios.get(link).then(response => {

        this.news = response.data;


      })

      } 
      else 
      {
        this.page =2;
        axios.get(server_ip + '/news/games').then(response => this.news=response.data)
      }
      

    },
    get_next_page(page){
      
      var link =  server_ip + '/news/games/'+page
      axios.get(link).then(response => {
        let data = response.data
        //console.log(data)
        var count = data.length;
        //console.log(count)
        var i=0
        for(i=0;i<count;i++){
          
          this.news.push(data[i])
        }
        console.log(this.news)
        
      })
    },

   
  },
  mounted() {
      axios.get(server_ip + '/news/games').then(response => this.news=response.data)
      axios.get(server_ip + '/news/games/origins/').then(response => this.origins=response.data)
      

    }
}



    </script>
    
    <style>
    
    
.neon-btn--purple {
  color: #fff;
  background-color: cornflowerblue;
  border: 0px solid cornflowerblue;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
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



    </style>