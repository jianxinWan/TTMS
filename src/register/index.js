import Poster from  '../components/poster.vue'
import Footer from '../components/footer.vue'
import Loading from '../components/loading.vue'
import Vue from 'vue'
const components = [
  Poster,
  Footer,
  Loading
]
components.map(component => Vue.component(component.name, component));
export  default {
  Poster,
  Footer,
  Loading
}

