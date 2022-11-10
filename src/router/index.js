import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DownloadRedirectView from '../views/DownloadRedirectView.vue';
import Landing from '../views/Landing.vue';
import OpenOnMobile from '../views/OpenOnMobile.vue';
import StorageView from '../views/StorageView.vue';
import PaymentSuccessView from '../views/PaymentSuccessView.vue';
import PaymentCancelView from '../views/PaymentCancelView.vue';
import VotePhotoAlbumView from '../views/VotePhotoAlbumView.vue';

const routes = [
  {
    path: '/:lang/payment-success',
    name: 'PaymentSuccess',
    component: PaymentSuccessView
  },
  {
    path: '/:lang/payment-cancel',
    name: 'PaymentCancel',
    component: PaymentCancelView
  },
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
    path: '/:lang/vote-photo-album/:vote',
    name: 'VotePhotoAlbum',
    component: VotePhotoAlbumView
  },
  {
    path: '/:lang/storage/:groupId/:userId/:groupName',
    name: 'Storage',
    component: StorageView
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
    to.name === 'DownloadRedirect' ||
    to.name === 'Storage' ||
    to.name === 'VotePhotoAlbum' ||
    to.name === 'PaymentSuccess' ||
    to.name === 'PaymentCancel'
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
