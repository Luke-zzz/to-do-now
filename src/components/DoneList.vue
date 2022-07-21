<template>
    <draggable 
    v-model="todos" 
    item-key="id" 
    class="todolist" 
    animation="500"
    handle=".handle"
    chosenClass="chosen"
    >
    <template #item="{element}" >
        <div class="todo">
          <n-icon class="handle" size="30">
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path fill="none" d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
                c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
                s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
                c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"></path>
            </svg>
          </n-icon>
            <swiper
            :id="element.id"
            :initialSlide="1"
            :space-between="10"
            @slideChange="onSlideChange">
              <swiper-slide class="complete">Undo</swiper-slide>
              <swiper-slide @dblclick="changetodo(element.id)">
              <s>{{element.title}}</s></swiper-slide>
              <swiper-slide class="delete">Delete</swiper-slide>
            </swiper>
        </div>
    </template>
  </draggable>
</template>

<script>
import { watch,computed } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from 'vuex'
import {NIcon} from 'naive-ui'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';


export default {
    name:'TodoList',
    components:{draggable,NIcon,Swiper,
      SwiperSlide},
    setup(props,ctx){   
      const store = useStore()
      let todos=computed({
        get:()=>{
          return store.state.todos.filter((todo)=>todo.complete==true)
        },
        set:(parm)=>{
          store.commit('updateAllTodo',parm)
        }
      })
      const onSlideChange = (swiper) =>{
        if(swiper.isEnd){
          let newtodos=store.state.todos.filter(todo => todo.id !== swiper.el.id)
          store.commit('updateAllTodo',newtodos)
        }
        if(swiper.isBeginning){
          store.commit('checkTodo',swiper.el.id)
        }
      }
      watch(store.state.todos,(newValue)=>{
          localStorage.setItem('todos', JSON.stringify(newValue))
      },{deep:true})
      return{
        todos,
        onSlideChange,
      }
    }
    
}
</script>

<style>
/* swiper */
.swiper {
  width: 90%;
  height: 48px;
}

.handle{
  width:5%;
}
.todolist{
  padding:0 3px;
  height:84vh;
  overflow: scroll;
}
.todo{
  height:48px;
  line-height: 48px;
  margin-top:2px;
  border-radius: 3px;
  background-color: #fff;
  padding-left: 5px;
  display: flex;
  align-items: center;
}
.chosen{
    background-color: rgb(199, 199, 199) !important;
  }

.complete{
  background-color: rgb(110, 143, 251);
  text-align: center;
}
.delete{
  background-color: rgb(255, 78, 113);
  text-align: center;
}
  /* ICon */
  .svg-icon {
  width: 1em;
  height: 1em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #000000;
}

.svg-icon circle {
  stroke: #000000;
  stroke-width: 1;
}
</style>