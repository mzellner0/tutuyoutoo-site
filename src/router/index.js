import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue';

const routes = [
  {
    path: '/:lang',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/:lang/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicyView
  }
];

const router = createRouter({
  history: createWebHistory('/tutuyoutoo-site/'),
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.name === 'Home' ||
    to.name === 'PrivacyPolicy'
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
