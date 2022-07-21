import { createRouter,createWebHashHistory } from "vue-router";
import DoneList from "@/components/DoneList.vue"
import TodoList from "@/components/TodoList.vue"
// import Test from "@/components/Test.vue"


const routes=[
    { path: '/', component: TodoList },
    { path: '/done', component: DoneList },
    // { path: '/test', component: Test },

    
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router