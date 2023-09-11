

import LatestPage from "@/pages/LatestPage"
import FavoritePage from "@/pages/FavoritePage"


import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: LatestPage },
    { path: '/favorite', component: FavoritePage },
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  export default router;