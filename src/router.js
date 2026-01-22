import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import TaskView from './TaskView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/:id', component: TaskView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
