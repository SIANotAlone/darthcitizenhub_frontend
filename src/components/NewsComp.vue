<template>
<div v-for="item in news" v-bind:key="item.id" class="news">
    
    <div class="wraper">
   
      <div class="preview"><a :href="item.url" :key="item.url"><img :src="item['preview']" v-bind:alt="pic"></a></div>
      <div class="content">
        <a :href="item.url" :key="item.url"><article class="title">{{ item['title'] }}</article></a>
      
      <div class="short">
       
         <div v-if="item['short']!='None'"><div class="detail">Детальніше: </div>{{ item['short'] }}</div>
         <div v-else></div>
        </div>
        <div class="org">Джерело: <span class="origin">{{ item['origin'] }}</span></div>
     
      </div>
      <div class="fav">
        <label class="add_to_fav">До закладок   <input type="checkbox"  :checked="item.favorit" v-model="isChecked"  @change="handleChange(item.id)"></label>
        </div>
     
    </div>
  

  </div>
  <!-- <button @click="next_page">Завантажити ще</button> -->
</template>

<script>
import server_ip from "@/myconfig/ipconfig.js"
import axios from 'axios';
export default {
    
    
    props:{
        news:{
            type: Array,
            required: true

        }
    },
    methods:{
    handleChange(id) {
    
      //console.log(`Checkbox with ID ${id} changed: ${this.isChecked}`)
      
      let json = { "id": id, "checked":this.isChecked  }
      axios.post(server_ip + '/news/games/changefavorite/',json)
    },  
}
    
}
</script>

<style >
.short{
  width: 100%;
  
  margin-left: 70px;

  margin-right: 70px;

  text-align: justify;
  font-size: 14px;
  color: saddlebrown;
}
.title{
  margin-top: 10px;
  font-weight: 600;
  color: lightslategray;
  text-decoration: none;
}
.wraper{
  background-color: ghostwhite;
  width: 100%;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  position: relative;
  justify-content: center; 
  box-shadow: 10px 5px 5px black;
 
}
.content{
  display: block;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.news{
  display: flex;
  margin-bottom: 10px;
 
}
img{
  
  margin-right: 20px;
  float: left;
    width:  100px;
    height: 100px;
    object-fit: cover;
    margin-left: auto;
  margin-right: auto;
}

.preview{

  margin: 20px;
  align-self: center;

}
.fav{

  min-width: 150px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 20px;
  align-items: center;
  
}
.fav label{
  margin-left: 5px;
  text-align: center;

}
.origin{
  margin-bottom: 20px;
  color: orangered;
  font-size: 14px;
  font-weight: 600;
}

.detail{
  text-align: left;
  font-size: 12px;
  margin-bottom: 10px;
  color: grey;

}
.org{
  font-size: 12px;
  margin-bottom: 10px;
  color: grey;
  margin-top: 10px;
  margin-top: auto;
  

}
button{
  width: 200px;
  height: 50px;
}
.tag{
padding-top: 50px;
padding-bottom: 30px;
font-weight: 800;
font-size: 20px;
color: azure;
}
.yt{
  background: rgb(173,86,200);
background: linear-gradient(326deg, rgba(173,86,200,1) 0%, rgba(125,160,232,1) 100%);
}
img{
  border-radius: 50%;
}

.add_to_fav:hover{
  cursor: pointer;
  text-decoration: underline;
}
input[type=checkbox] {
    transform: scale(1.5);
    margin-left: 10px;
    cursor: pointer;
}

</style>