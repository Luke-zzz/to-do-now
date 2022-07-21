<template>
  <n-card class="nav">
    <n-space justify="space-around" size="large">
      <router-link to="/">主页</router-link> 
      <router-link to="/done">归档</router-link>
    </n-space>
  </n-card>
  <router-view 
  :alllist="todos"
  :todolist="todolist"
  :donelist="donelist"
  @addTodo="addTodo"
  @updateAllTodo="updateAllTodo"
  @checkTodo="checkTodo"
  @updateTodo="updateTodo"
  >
  </router-view>

  <Addbtn
  @addTodo="addTodo"/>
</template>

<script>
import {reactive,ref,computed,toRaw} from 'vue'
import {NCard,NSpace,NButton,NIcon} from 'naive-ui'
import { nanoid } from 'nanoid'
import Addbtn from './components/Addbtn.vue'

export default {
  name: 'App',
  components:{NCard,NSpace,NButton,NIcon,Addbtn},
  setup(){
    // let todos = reactive(JSON.parse(localStorage.getItem('todos'))) || reactive([]) ;
    let todos=reactive([
      {id:nanoid(),title:'完成事项一',complete:false},
      {id:nanoid(),title:'完成事项一222',complete:false},
      {id:nanoid(),title:'完成事项一333',complete:true},
      {id:nanoid(),title:'完成事项一444',complete:false},
      {id:nanoid(),title:'完成事项一555',complete:false},
    ])
    let todolist=computed(()=>todos.filter((todo)=>todo.complete==false))
    let donelist=computed(()=>todos.filter((todo)=>todo.complete==true))

    function addTodo(todo){
      todos.unshift(todo);
    }
    function updateAllTodo(parm){
      console.log(parm)
      todos.splice(0,todos.length)
      parm.forEach(element => {
        todos.push(element)
      });
    }
    function checkTodo(id){
      const todo = todos.find(todo => todo.id === id);
      todo.complete = !todo.complete;
    }
    function updateTodo(id, title){
      const todo = todos.find(todo => todo.id === id);
      todo.title = title;
      console.log(todos)
    }

    return{
      todos,
      todolist,
      donelist,
      addTodo,
      updateAllTodo,
      checkTodo,
      updateTodo
    }
  },
  watch:{
    //深度监视
    todos:{
      deep: true,
      handler(newValue) {
        localStorage.setItem("todos", JSON.stringify(newValue))
      }
    },
  }
 
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
