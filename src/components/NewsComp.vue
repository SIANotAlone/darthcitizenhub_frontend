<template>
  <div v-for="item in news" v-bind:key="item.id" class="news">

    <div class="wraper">

      <div class="preview"><a :href="item.url" :key="item.url"><img :src="item['preview']" v-bind:alt="pic"></a></div>
      <div class="content">
        <a :href="item.url" :key="item.url">
          <article class="title">{{ item['title'] }}</article>
        </a>

        <div class="short">

          <div v-if="item['short'] != 'None'">
            <div class="detail">Детальніше: </div>{{ item['short'] }}
          </div>
          <div v-else></div>
        </div>
        <div class="org">Джерело: <span class="origin">{{ item['origin'] }}</span>
          <div class="date" style="font-size: 10px;">Дата оновлення: <span>{{ datefromUTC(item['time']) }}</span> </div>
        </div>

      </div>
      <!-- Тут помилка -->
      <!-- <div class="fav">
        <label class="add_to_fav">До закладок <input type="checkbox" v-bind:checked="item.favorit" v-model="isChecked"
            @change="handleChange(item)"></label>
      </div> -->

      <!-- Полагодив. Це робочий варіант -->
      <div class="fav">
        <label class="add_to_fav">До закладок <input type="checkbox"  v-model="item.favorit"
            @change="handleChange(item)" ></label>
      </div>


    </div>


  </div>
  <!-- <button @click="next_page">Завантажити ще</button> -->
</template>

<script>
import server_ip from "@/myconfig/ipconfig.js"
import axios from 'axios';

export default {


  props: {
    news: {
      type: Array,
      required: true

    },

  },

  methods: {
    
    handleChange(item) {
     
      let json = { "id": item.id, "checked": item.favorit}
      axios.post(server_ip + '/news/games/changefavorite/', json)
      console.log(item.favorit)
    },
    datefromUTC(date) {
      const timestampInMilliseconds = date * 1000;
      const f_date = new Date(timestampInMilliseconds);
      return f_date.toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',

      });



    },

  }

}
</script>

<style scoped>



.short {
  width: 100%;

  margin-left: 70px;

  margin-right: 70px;

  text-align: justify;
  font-size: 14px;
  color: saddlebrown;
}

.title {
  margin-top: 10px;
  font-weight: 600;
  color: rgb(111, 162, 213);
  text-decoration: none;



}

.wraper {
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

.content {
  display: block;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.news {
  display: flex;
  margin-bottom: 10px;

}

img {

  margin-right: 20px;
  float: left;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}

.preview {

  margin: 20px;
  align-self: center;

}

.fav {

  min-width: 150px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 20px;
  align-items: center;

}


.fav label {
  margin-left: 5px;
  text-align: center;

}

.origin {
  margin-bottom: 20px;
  color: orangered;
  font-size: 14px;
  font-weight: 600;
}

.detail {
  text-align: left;
  font-size: 12px;
  margin-bottom: 10px;
  color: grey;

}

.org {
  font-size: 12px;
  margin-bottom: 10px;
  color: grey;
  margin-top: 10px;
  margin-top: auto;


}

button {
  width: 200px;
  height: 50px;
}

.tag {
  padding-top: 50px;
  padding-bottom: 30px;
  font-weight: 800;
  font-size: 20px;
  color: azure;
}

.yt {
  background: rgb(173, 86, 200);
  background: linear-gradient(326deg, rgba(173, 86, 200, 1) 0%, rgba(125, 160, 232, 1) 100%);
}

img {
  border-radius: 50%;
}

/* було */
/* .add_to_fav:hover {
  cursor: pointer;
  text-decoration: underline;
  
} */


/* стало */
/* ********************** */
.add_to_fav {
    display: inline-block;
    /* color: #07aa19; */
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    position: relative;


}

a {
  text-decoration: none;
}
.add_to_fav:after {
    display: block;
    content: "";
    background-color: #5dbdff;
    height: 3px;
    width: 0%;
    left: 35%;
    position: absolute;
    -webkit-transition: width .3s ease-in-out;
    -moz--transition: width .3s ease-in-out;
    transition: width .3s ease-in-out;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    transform: translateX(-50%);
}
.add_to_fav:hover:after,
.add_to_fav:focus:after {
    width: 100%;
}
/* ********************** */


input[type=checkbox] {
  transform: scale(1.5);
  margin-left: 10px;
  cursor: pointer;
}

</style>