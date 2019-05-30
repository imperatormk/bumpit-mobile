import Vue from 'nativescript-vue'

import ViewContainer from '@/components/containers/ViewContainer'
import StateButton from '@/components/common/StateButton'
import Navigation from '@/components/common/Navigation'
import Split from '@/components/common/layout/Split'
import FlexRow from '@/components/common/layout/FlexRow'
import FlexCol from '@/components/common/layout/FlexCol'
import DataGrid from '@/components/common/DataGrid'
import LabelButton from '@/components/common/LabelButton'
import Textbox from '@/components/common/Textbox'
import StarRating from '@/components/plugins/star-rating/StarRating'

Vue.component('ViewContainer', ViewContainer)
Vue.component('StateButton', StateButton)
Vue.component('Navigation', Navigation)
Vue.component('Split', Split)
Vue.component('FlexRow', FlexRow)
Vue.component('FlexCol', FlexCol)
Vue.component('DataGrid', DataGrid)
Vue.component('LabelButton', LabelButton)
Vue.component('Textbox', Textbox)

Vue.component('StarRating', StarRating)

Vue.registerElement('CreditCardView', () => require('nativescript-stripe').CreditCardView)

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel)
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem)

Vue.config.silent = true

import Master from '@/components/containers/Master'
import InitialItem from '@/components/views/order/AfterCheckout'

import store from '@/store'

new Vue({
  render: h => h(Master, [h(InitialItem)]),
  store
}).$start()