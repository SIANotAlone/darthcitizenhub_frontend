

import LatestPage from "@/pages/LatestPage"
import FavoritePage from "@/pages/FavoritePage"
import EpisodePage from "@/pages/EpisodePage"
import NotationPage from "@/pages/NotationPage"
import NewEpisode from "@/pages/NewEpisode"
import Statistics from "@/pages/StatisticsPage"
import Scenarios from "@/pages/ScenariosPage"
import Scenario from "@/pages/ScenarioPage"
import NewScenario from "@/pages/NewScenario"

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: LatestPage },
    { path: '/favorite', component: FavoritePage },
    {path: '/episode', component: EpisodePage},
    {path: '/episode/:id', component: NotationPage, props: true},
    {path:'/episode/new', component: NewEpisode},
    {path: '/statistics', component: Statistics},
    {path: '/scenarios', component: Scenarios},
    {path: '/scenario/:id', component: Scenario, props: true},
    {path: '/scenario/new/', component: NewScenario},
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  export default router;