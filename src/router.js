import { createRouter, createWebHistory } from 'vue-router'
import ChartPage from './components/chartpage.vue';
import TablePage from './components/tablepage.vue';
const routes = [
    {
      path: '/',
      name: 'chart',
      component: ChartPage
    },
    {
      path: '/table',
      name: 'table',
      component: TablePage
    }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  export default router