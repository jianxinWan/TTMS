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
import Mydoc from '../components/pages/mydoc/mydoc.vue'
import Indent from '../components/pages/mydoc/indent.vue'
import Pay from '../components/pages/buy/pay.vue'
import FinishedPay from '../components/pages/buy/finishPay.vue'
import userInfo from '../components/pages/mydoc/userInfo.vue'

//admin
import adminIndex from '../admin/components/pages/adminIndex.vue'
import managePlay from '../admin/components/pages/managePlay.vue'
import manageHall from '../admin/components/pages/manageHall.vue'
import managePlan from '../admin/components/pages/managePlan.vue'
import processOrder from '../admin/components/pages/processOrder.vue'
import collectPlay from '../admin/components/pages/collectPlays.vue'
import alterHall from '../admin/components/pages/alterHall.vue'
import showHall from '../admin/components/pages/showHall.vue'
import adminLogin from '../admin/components/pages/adminLogin.vue'

Vue.use(Router);
export default new Router({
  hashbang: true,
  history: true,
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
          path: '/mydoc',
          name: 'mydoc',
          component:Mydoc,
          children:[
            {
              name: 'indent',
              path: '/mydoc/indent',
              component: Indent
            },
            {
              name: 'userInfo',
              path: '/mydoc/userInfo',
              component: userInfo
            },
          ]
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
          name: 'pay',
          path: '/pay',
          component: Pay
        },
        {
          name: 'finishPay',
          path: '/pay/finish',
          component: FinishedPay
        },
        {
          path: '/theater',
          name: 'theater',
          component: Theater
        }
      ]
    },
    {
      path: '/ttms/TTT/admin',
      name: 'admin',
      component: adminIndex,
      children:[
        {
          path: '/ttms/TTT/admin/plays',
          name: 'managePlay',
          component:managePlay
        },
        {
          path: '/ttms/TTT/admin/halls',
          name: 'manageHall',
          component:manageHall,
          children:[
            {
              path:"/ttms/TTT/admin/halls/alterHall/:sid/:row/:col/:name",
              name:"alterHall",
              component:alterHall
            },
            {
              path:"/ttms/TTT/admin/halls/showHall",
              name:"showHall",
              component:showHall
            }
          ]
        },
        {
          path: '/ttms/TTT/admin/plans',
          name: 'managePlan',
          component:managePlan
        },
        {
          path: '/ttms/TTT/admin/orders',
          name: 'processPrder',
          component:processOrder
        },
        {
          path: '/ttms/TTT/admin/collect',
          name: 'collectPlay',
          component:collectPlay
        }
      ]
    },
    {
      path: '/ttms/TTT/admin/login',
      name: 'adminLogin',
      component: adminLogin,
    }
  ]
})
