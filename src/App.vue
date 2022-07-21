<template>
  <n-card class="nav">
    <n-space justify="space-around" size="large">
      <router-link to="/">主页</router-link> 
      <router-link to="/done">归档</router-link>
    </n-space>
  </n-card>
  <router-view>
  </router-view>

  <Addbtn/>
</template>

<script>
import {NCard,NSpace,NButton,NIcon} from 'naive-ui'
import Addbtn from './components/Addbtn.vue'

export default {
  name: 'App',
  components:{NCard,NSpace,NButton,NIcon,Addbtn},
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.nav{
  text-align: center;
  width:100%;
  
}
body{
  margin:0;
  height: 100vh;
  background-color: #dfedf9;
}
a{
   text-decoration: none;
   font-size: 20px; 
   color: #2c3e50;
   padding:10px;
}
a.router-link-exact-active{
    border-bottom: 3px solid #18a058;
}
</style>
