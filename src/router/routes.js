// single pages
import HomePage from '../pages/Home.vue'
import TourDetail from '../components/tour/TourDetail.vue'
import NotFoundPage from '../pages/NotFound.vue'

import { DOMAIN_TITLE } from '../.env.js'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: HomePage,
    meta: { title: `${DOMAIN_TITLE} | home` }
  },

  {
    path: '/tour/:id',
    name: 'tour',
    component: TourDetail,
    meta: { title: `${DOMAIN_TITLE} | home` }
  },

  {
    path: '*',
    component: NotFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
