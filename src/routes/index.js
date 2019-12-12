
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import DNA from '../components/DNA.vue'
import Tween from '../components/Tween.vue'
import Lizi from '../components/Lizi.vue'



Vue.use(Router)

const routes = [
    {  
        path: "/helloworld", 
        name:'HelloWorld',
        meta:{
          deepFlag:'00'
        },
        component: HelloWorld
    },
    {
      path: "/dna",
      name: 'DNA',
      component: DNA
    },
    {
      path: "/lizi",
      name: 'Lizi',
      component: Lizi
    },
  {
    path: "/tween",
    name: 'Tween',
    component: Tween
  },
  { path: '/', redirect: '/helloworld' }
]
const router = new Router({routes})
export default router