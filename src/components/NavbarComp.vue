<template>
<nav class="navbar">
    <ul>
        <li><a href="/">Ігри</a></li>
        <li><a href="#">Фільми</a></li>
        <li><a href="#">Серіали</a></li>
        <li><a href="/favorite">Закладки</a></li>
        <li><a href="/episode">Випуски</a></li>
        <li><a href="/scenarios">Сценарії</a></li>
        <li><a href="/statistics">Статистика</a></li>
    </ul>
</nav>
</template>

<script>


</script>

<style>

.navbar ul {

  overflow: hidden;
  padding: 0;
  list-style: none;
  margin-left: 20%;
  margin-right: 20%;
  
}
.navbar li {
  float: left;
  
}
.navbar a {
  display: block;
  padding: 1em;
  text-decoration: none;
  color: aliceblue;
  font-family: "Montserrat";
  font-size: 18px;
}
.navbar  :hover{
border-radius: 5px;
  
  color: #000;
    
  
}
.navbar li :hover{
  background-color: #2eabff;
  box-shadow: 10px 10px 100px 6px #5dbdff;
}
</style>