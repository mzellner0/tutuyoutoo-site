import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PollView from '../views/PollView.vue';
import AmbassadorVoteView from '../views/AmbassadorVoteView.vue';
import EmailView from '../views/EmailView.vue';
import DownloadRedirectView from '../views/DownloadRedirectView.vue';

const routes = [
  {
    path: '/:lang',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/:lang/poll',
    name: 'Poll',
    component: PollView
  },
  {
    path: '/:lang/email',
    name: 'CollectEmails',
    component: EmailView
  },
  {
    path: '/:lang/ambassador-vote',
    name: 'AmbassadorVote',
    component: AmbassadorVoteView
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
    to.name === 'Poll' ||
    to.name === 'CollectEmails' ||
    to.name === 'AmbassadorVote' ||
    to.name === 'Update' ||
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
