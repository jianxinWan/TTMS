import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/pages/index/index.vue'
import Login from '../components/pages/login/Login.vue'
import Register from '../components/pages/register/register.vue'
import Film from '../components/pages/film/film.vue'
import Theater from '../components/pages/theater/theater.vue'
import indexContent from '../components/pages/index/indexContent.vue'
import filmDetail from '../components/pages/film/filmDetail.vue'
import BuyTicket from '../components/pages/buy/buyTickets.vue'

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect:'/index',
      children:[
        {
          path: '/index',
          name: 'indexContent',
          component: indexContent
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        },
        {
          path: '/film',
          name: 'film',
          component:Film
        },
        {
          name: 'filmInfo',
          path: '/film/:id',
          component: filmDetail
        },
        {
          name: 'buyTickets',
          path: '/film/:pid/:sid',
          component: BuyTicket
        },
        {
          path: '/theater',
          name: 'theater',
          component: Theater
        }
      ]
    }
  ]
})
