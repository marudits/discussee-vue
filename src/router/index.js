import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '../pages/todoList'
import TodoDetail from '../pages/todoDetail'
import TodoForm from '../pages/todoForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    },
    {
    	path: '/detail/:id',
    	name: 'TodoDetail',
    	component: TodoDetail
    },
    {
      path: '/add',
      name: 'TodoAdd',
      component: TodoForm
    },
    {
      path: '/update/:id',
      name: 'TodoUpdate',
      component: TodoForm
    },
  ]
})
