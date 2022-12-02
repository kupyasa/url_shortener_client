import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatisticsView from '../views/StatisticsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{title:"URL Kısaltıcı"}
    },
    {
      path: '/istatistikler',
      name: 'istatistikler',
      component: StatisticsView,
      meta:{title:"İstatistikler"}
    },
  ]
});

const DEFAULT_TITLE = 'Some Default Title';
router.afterEach((to, from,next) => {
    
    document.title = to.meta.title ||`URL Kısaltıcı`;
    next();
});

export default router
