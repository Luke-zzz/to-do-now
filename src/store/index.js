import Vuex from 'vuex'
import { nanoid } from 'nanoid'

export default new Vuex.Store({
  state: {
    todos:JSON.parse(localStorage.getItem('todos'))||[]
  },
  getters: {
  },
  mutations: {
    updateAllTodo(state,parm){
      state.todos.splice(0,state.todos.length)
      parm.forEach(element => {
        state.todos.push(element)
      })
    },
    checkTodo(state,id){
      const todo = state.todos.find(todo => todo.id === id);
      todo.complete = !todo.complete;
    },
    updateTodo(state,news){
      const todo = state.todos.find(todo => todo.id === news.id);
      todo.title = news.title;
    },
    addTodo(state,todo){
      state.todos.unshift(todo);
    }
  },
  actions: {
  },
  modules: {
  }
})