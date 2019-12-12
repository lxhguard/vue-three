<template>
  <div id="app">
    <router-link to="/helloworld">helloworld</router-link><br/>
    <router-link to="/dna">DNA</router-link><br/>
    <router-link to="/tween">tween</router-link><br/>
    <router-link to="/lizi">粒子</router-link><br/>
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  /* margin-top: 60px; */
}
*{
  margin:0;
  padding:0;
}
</style>
