<template>
  <n-button @click="activate('bottom')" class="addbtn" type="info" circle size="large">
      <n-icon size="40">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
            d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
        />
        </svg>
    </n-icon>
  </n-button>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content>
      <template #header>
        添加事项
      </template>
      <label for="addtodo">
        <input type="text" name="addtodo" class="subinput" v-model="title" placeholder="填写添加事项标题"/>
      </label>
      
      <template #footer>
        <n-button @click="add()">提交</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";
import {NCard,NSpace,NButton,NIcon,NDynamicInput,NDrawerContent,NDrawer} from 'naive-ui'
import { nanoid } from "nanoid";
import { useStore } from 'vuex'
export default {
    name:'Addbtn',
    emits:['addTodo'],
    components:{
        NCard,NSpace,NButton,NIcon,NDynamicInput,NDrawerContent,NDrawer
    },
    setup(props,ctx) {
    const store = useStore()
    const title=ref()
    const active = ref(false);
    const placement = ref("right");
    const activate = (place) => {
      active.value = true;
      placement.value = place;
    }
    
    function add(){
        if(!title.value.trim()) {
            alert('代办事项不能为空')
            return; 
        }
        const todoObj = {
            id: nanoid(),
            title: title.value,
            complete:false
        }
        store.commit("addTodo",todoObj);
        title.value = '';
    }
    return {
      active,
      placement,
      activate,
      title,
      add
    };
  }


}
</script>

<style>
.addbtn{
    box-shadow:0px 0px 5px 1px rgba(0,0,0,0.5);
    position: absolute;
    bottom:30px;
    right:20px;
    
}
.subinput{
  font-size: 20px;
  padding: 5px;
  width:90%;
  margin:0 3%;
}
</style>