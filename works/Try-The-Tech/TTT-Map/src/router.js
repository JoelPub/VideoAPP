import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/",
      name: "TryTheTech",
      component: () => import("./views/TryTheTech.vue")
    },
    {
      path: "/demo",
      name: "demo",
      component: () => import("./views/demo.vue")
    },
    {
      path: "/talk",
      name: "talk",
      component: () => import("./views/Talk.vue")
    }
  ]
})
