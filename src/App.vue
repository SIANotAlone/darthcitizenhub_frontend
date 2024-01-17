<template>
  <div class="app">



    <div class="tag">
      <p style="padding-top: 40px;">Останні новини by <a href="https://www.youtube.com/@DarthCitizen/videos"><span class="yt">Darth
            Citizen</span></a> Youtube. </p>
    </div>
    <MyNavBar></MyNavBar>
    <router-view></router-view>


  </div>
</template>

<script>
import MyNavBar from "@/components/NavbarComp.vue"




export default {
  name: "App",
  
  components: {
    MyNavBar,

  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;



  background-color: #2c3e50;

  overflow: hidden;

}

* {
  font-family: 'Montserrat';
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tag {

  font-weight: 800;
  font-size: 20px;
  color: azure;
  display: flex;
  background-image: url("./assets/shapka2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 500px;

}

.tag p {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.yt {
  background: rgb(173, 86, 200);
  background: linear-gradient(326deg, rgba(173, 86, 200, 1) 0%, rgba(125, 160, 232, 1) 100%);
}

button {
  width: 200px;
  height: 50px;
}


.yt {
  background: rgb(173, 86, 200);
  background: linear-gradient(326deg, rgba(173, 86, 200, 1) 0%, rgba(125, 160, 232, 1) 100%);
}
.title{
  margin-left: 20px;
  margin-right: 20px;
}

</style>
