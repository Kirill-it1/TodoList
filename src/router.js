import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import Tasks from './Tasks.vue'
import HomeTaskView from './HomeTaskView.vue'
import TaskView from './TaskView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  { 
    path: '/tasks/', 
    component: Tasks,
    children: [
      {
        path: '',
        component: HomeTaskView
      },
      {
        path: ':id',
        name: 'tasks',
        component: TaskView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
