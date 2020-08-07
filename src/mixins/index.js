/**
 * import and init global mixins
 */

import Vue from 'vue'

import currentUser from '../mixins/currentUser'
import jumpTo from '../mixins/jumpTo'
import formatDateTime from '../mixins/formatDateTime'
import formatTime from '../mixins/formatTime'
import image from '../mixins/image'

Vue.mixin(currentUser)
Vue.mixin(jumpTo)
Vue.mixin(formatDateTime)
Vue.mixin(image)
Vue.mixin(formatTime)
