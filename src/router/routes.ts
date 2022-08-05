import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('src/pages/Home.vue'),
      },
      {
        path: '/tracking/history',
        component: () => import('src/pages/ProductTrackingHistory.vue'),
      },
      {
        path: '/tracking/realtime',
        component: () => import('src/pages/ProductTrackingRealtime.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
