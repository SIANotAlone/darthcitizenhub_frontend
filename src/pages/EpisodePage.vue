<template>
  <h1 class="page_title">Випуски</h1>
  <button  @click="new_episode" class="neon-btn neon-btn--purple">Новий випуск</button>

  <div class="episodes">
    <div v-if="episodes == null">
      <h3 class="empty">Випуски відсутні</h3>
    </div>
    <ol class="list"> 
      <div v-for="item in episodes" v-bind:key="item.id">
        <li> 
          <img :src="released_src" :id="item['id']" class="released" v-if="item['released']">
          <a class="title" :href="'/episode/' + item['id']">{{ item['name'] }}. Випуск №{{ item['number'] }}</a>
          <p class="org">Створено: <span class="date"> {{ formatDate(item['date']) }}</span></p>
        </li>

      </div>
    </ol>
  </div>
</template>
<script>

import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import server_ip from "@/myconfig/ipconfig.js"
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
  data() {
    return {
      episodes: [],
      released_src: require('@/assets/released.svg'),
      released_color: '##5dbdff',
    }
  }, methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',

      });
    },
    new_episode(){
      this.$router.push({path: '/episode/new'})

    }
  },

  mounted() {
    axios.get(server_ip + '/episode/get_all').then(response => this.episodes = response.data)
    try{
      const message = this.$route.query.message;

      if (message) {
        this.notify(message);
      }
    }
    catch(error){
      console.log(error)
    }
  }


}

</script>
<style scoped>
.episodes {
  background-color: ghostwhite;
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 10px;
  box-shadow: 10px 5px 5px black;
  margin-top: 10px;
  margin-bottom: 20px;
  min-height: 400px;
  text-align: center;


}

.page_title {

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

.rounded {
  counter-reset: li;
  list-style: none;
  font: 14px "Trebuchet MS", "Lucida Sans";
  padding: 0;
  text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
}

.rounded a {
  position: relative;
  display: block;
  padding: .4em .4em .4em 2em;
  margin: .5em 0;
  background: #DAD2CA;
  color: #444;
  text-decoration: none;
  border-radius: .3em;
  transition: .3s ease-out;
}

.rounded a:hover {
  background: #E9E4E0;
}

.rounded a:hover:before {
  transform: rotate(360deg);
}

.rounded a:before {
  content: counter(li);
  counter-increment: li;
  position: absolute;
  left: -1.3em;
  top: 50%;
  margin-top: -1.3em;
  background: #8FD4C1;
  height: 2em;
  width: 2em;
  line-height: 2em;
  border: .3em solid white;
  text-align: center;
  font-weight: bold;
  border-radius: 2em;
  transition: all .3s ease-out;
}

ol {
  list-style-type: none;
  counter-reset: num;
  margin: 0 0 0 45px;
  padding: 15px 0 5px 0;
  font-size: 16px;
}

ol li {
  position: relative;
  margin: 0 0 0 0;
  padding: 0 0 10px 0;
  line-height: 1.4;
}

ol li:before {
  content: counter(num);
  counter-increment: num;
  display: inline-block;
  position: absolute;
  top: 0;
  left: -38px;
  width: 28px;
  height: 28px;
  background: #00bff3;
  color: #fff;
  text-align: center;
  line-height: 28px;
  font-size: 18px;
}

li {
      text-align: left;
    }
.list{
  margin-top: 10px;
  display: inline-block; 
   text-align: left; 
 
}
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
  font-size: 24px;

  font-weight: 600;
  color: lightslategray;
  text-decoration: none;
}
.date{
  text-align: center;
  font-size: 14px;
  color: saddlebrown;
}
.empty{
  padding-top: 20px;  
}
.org{
  text-align: center;
}
.org {
  font-size: 12px;
  margin-bottom: 10px;
  color: grey;
  margin-top: 10px;
  margin-top: auto;


}
</style>