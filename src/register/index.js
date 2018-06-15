import Poster from '../components/component/poster.vue'
import Footer from '../components/pages/index/footer.vue'
import Loading from '../components/component/loading.vue'
import Seat from '../components/component/selectSeat.vue'
import BuyBar from '../components/component/buyBar.vue'
import Indent from '../components/component/indent.vue'

//admin
import addAndalter from "../admin/components/common/addAndalter.vue"
import Vue from 'vue'
const components = [
  Poster,
  Footer,
  Loading,
  Seat,
  BuyBar,
  Indent,
  addAndalter
];
components.map(component => Vue.component(component.name, component));
export  default {
  Poster,
  Footer,
  Loading,
  Seat,
  BuyBar,
  Indent,
  addAndalter
}

