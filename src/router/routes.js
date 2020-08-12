// single pages
import HomePage from '../pages/Home.vue'
import TourDetail from '../components/tour/TourDetail.vue'
import NotFoundPage from '../pages/NotFound.vue'
import Payment from '../components/payment/Payment.vue'
import PaymentSuccess from '../components/payment/complete.vue'
import ManageUser from '../components/user/Manage.vue'
import SearchTour from '../components/tour/Search.vue'

import { DOMAIN_TITLE } from '../.env'
import ReviewDetail from '../components/review/ReviewDetail.vue'

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
  },
  {
    path: '/payment/:id',
    name: 'payment',
    component: Payment,
    meta: { title: `${DOMAIN_TITLE} | payment` }
  },
  {
    path: '/complete',
    component: PaymentSuccess,
    meta: { title: `${DOMAIN_TITLE} | complete` }
  },
  {
    path: '/user/manage',
    name: 'manage-user',
    component: ManageUser,
    meta: { title: `${DOMAIN_TITLE} | manage` }
  },
  {
    path: '/search?search=:content',
    name: 'search',
    component: SearchTour,
    meta: { title: `${DOMAIN_TITLE} | results` }
  }
]
