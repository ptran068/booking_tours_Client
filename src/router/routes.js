// single pages
import HomePage from '../pages/Home.vue'
import NotFoundPage from '../pages/NotFound.vue'
import Payment from '../components/payment/Payment.vue'
import PaymentSuccess from '../components/payment/complete.vue'
import ManageUser from '../components/user/Manage.vue'

import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: HomePage,
    meta: { title: `${DOMAIN_TITLE} | home` }
  },

  {
    path: '*',
    component: NotFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  },
  {
    path: '/payment',
    component: Payment,
    meta: { title: `${DOMAIN_TITLE} | payment` }
  },
  {
    path: '/payment/complete',
    component: PaymentSuccess,
    meta: { title: `${DOMAIN_TITLE} | complete` }
  },
  {
    path: '/user/manage',
    component: ManageUser,
    meta: { title: `${DOMAIN_TITLE} | manage` }
  }
]
