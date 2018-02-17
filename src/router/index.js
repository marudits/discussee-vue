import Vue from 'vue'
import Router from 'vue-router'

//pages
import TodoList from '../pages/todoList'
import TodoDetail from '../pages/todoDetail'
import TodoForm from '../pages/todoForm'
import Auth from '../pages/auth'

//utils
import { getCurrentUser } from '../utils/api/todo';

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList,
      meta: {
        requiresAuth: true
      }
    },
    {
    	path: '/detail/:id',
    	name: 'TodoDetail',
    	component: TodoDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add',
      name: 'TodoAdd',
      component: TodoForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '*',
      redirect: '/auth'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = getCurrentUser(),
    requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser){
    next('/auth')
  } else if(!requiresAuth && currentUser){
    next('/')
  } else {
    next()
  }
})

export default router;
