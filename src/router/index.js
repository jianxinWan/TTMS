import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import Login from '../components/Login.vue'
import Register from '../components/register.vue'
import Film from '../components/film.vue'
import Theater from '../components/theater.vue'
import indexContent from '../components/indexContent.vue'
import filmDetail from '../components/filmDetail.vue'
import nowShowing from '../components/nowShowing.vue';
import afterShowing from '../components/afterShowing.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/index/nowShowing',
      children:[
        {
          path: '/index',
          name: 'indexContent',
          component: indexContent,
          redirect: '/index/nowShowing',
          children:[
            {
              path: '/index/nowShowing',
              name: 'nowShowing',
              component: nowShowing
            },
            {
              path: '/index/afterShowing',
              name: 'afterShowing',
              component: afterShowing
            },
          ]
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
          path: '/theater',
          name: 'theater',
          component: Theater
        }
      ]
    }
  ]
})
