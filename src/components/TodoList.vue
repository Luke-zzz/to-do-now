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
              <swiper-slide class="complete">Complete</swiper-slide>
              <swiper-slide @dblclick="changetodo(element.id)">
              <span v-show="element.edit">
                <input 
                ref="inputTitle" 
                type="text" 
                :value="element.title"
                @blur="handleBlur(element,$event)"
                >
              </span>
              <span v-show="!element.edit">{{element.title}}</span></swiper-slide>
              <swiper-slide class="delete">Delete</swiper-slide>
            </swiper>
        </div>
    </template>
  </draggable>
</template>

<script>
import { reactive,watch,ref,computed,onMounted,nextTick } from 'vue'
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
import {NCard,NSpace,NButton,NIcon} from 'naive-ui'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';



export default {
    name:'TodoList',
    components:{draggable,NIcon,Swiper,
      SwiperSlide},
    props:['todolist','updateAllTodo','checkTodo','updateTodo'],
    setup(props,ctx){
      
      let inputTitle=ref(null);
      let todos=computed({
        get:()=>{
          return props.todolist
        },
        set:(parm)=>{
          ctx.emit('updateAllTodo',parm)
        }
      })
      todos.value.forEach(todo => {
         todo.edit=false
      })
      const onSlideChange = (swiper) =>{
        if(swiper.isEnd){
          let newtodos=todos.value.filter(todo => todo.id !== swiper.el.id)
          ctx.emit('updateAllTodo',newtodos)
        }
        if(swiper.isBeginning){
          ctx.emit('checkTodo',swiper.el.id)
        }
      }
      function changetodo(id){
        todos.value.forEach(todo => {
         if(todo.id === id) todo.edit = true;
        })
        nextTick(()=>{
          inputTitle.value.focus()
        })
      }
      function handleBlur(todo, e){
        todo.edit = false;
        if(!e.target.value.trim()) {
        alert('输入不能为空');
        return;
      }
        ctx.emit('updateTodo',todo.id,e.target.value)
      }
      return{
        todos,
        onSlideChange,
        changetodo,
        inputTitle,
        handleBlur
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