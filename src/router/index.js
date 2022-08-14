import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DownloadRedirectView from '../views/DownloadRedirectView.vue';
import Landing from '../views/Landing.vue';
import OpenOnMobile from '../views/OpenOnMobile.vue';

const routes = [
  {
    path: '/:lang',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/:lang/landing',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/:lang/open-on-mobile',
    name: 'OpenOnMobile',
    component: OpenOnMobile
  },
  {
    path: '/:lang/download-redirect',
    name: 'DownloadRedirect',
    component: DownloadRedirectView
  },
  {
    path: '/:lang/update',
    name: 'Update',
    component: DownloadRedirectView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.name === 'Home' ||
    to.name === 'Update' ||
    to.name === 'Landing' ||
    to.name === 'OpenOnMobile' ||
    to.name === 'DownloadRedirect'
  ) {
    if (to.params.lang !== "en" && to.params.lang !== "fr") {
      next({ name: to.name, params: { lang: "fr" } });
    } else {
      next();
    }
  } else {
    next({ name: 'Home', params: { lang: "fr" } });
  }
});

export default router;
