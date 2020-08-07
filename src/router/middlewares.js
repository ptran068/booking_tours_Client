import $store from '../store'
import { getToken } from '../services/auth.service'

/**
 * Current user state initialization
 * @WARN Must be always first in middleware chain
 */
export async function initCurrentUserStateMiddleware (to, from, next) {
  const currentUserId = $store.state.user.currentUser.id

  if (!currentUserId && getToken()) {
    try {
      await $store.dispatch('user/getCurrent')
      next()
    } catch (e) {
      console.log(e)
    }
  }

  next()
}

/**
 * Check access permission to auth routes
 */
export function checkAccessMiddleware (to, from, next) {
  const currentUserId = $store.state.user.currentUser.id
  const isAuthRoute = to.matched.some(item => item.meta.isAuth)

  if (isAuthRoute && currentUserId) return next()
  if (isAuthRoute) return next({ name: 'index' })
  next()
}

export function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)

  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}
