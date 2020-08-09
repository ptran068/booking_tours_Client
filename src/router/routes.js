// single pages
import HomePage from '../pages/Home.vue'
import TourDetail from '../components/tour/TourDetail.vue'
import NotFoundPage from '../pages/NotFound.vue'
import ReviewDetail from '../components/review/ReviewDetail.vue'

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
    path: '/tour/review/:id',
    name: 'review',
    component: ReviewDetail,
    meta: { title: `${DOMAIN_TITLE} | Review` }
  },
  {
    path: '*',
    component: NotFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
