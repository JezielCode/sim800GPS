import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import error404 from "src/pages/views/ErrorNotFound.vue";
import DASHBOARD_ROUTES from "src/pages/app/dashboard/router/routes.js";
import LOGIN_ROUTES from "src/pages/views/routes.js";
import MIAUTO_ROUTES from "src/pages/app/miauto/router/routes.js";
import NOTIFICATION_ROUTES from "src/pages/app/notification/router/routes";
import ABOUTAPP_ROUTES from "src/pages/app/aboutapp/router/routes";
import PROFILE_ROUTES from "src/pages/app/profile/router/routes";
import MIPERSON_ROUTES from "src/pages/app/miperson/router/routes";
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: [
      // {
      //   path: "/",
      //   component: () => import("layouts/FullLayout.vue"),
      //   children: [
      //     { path: "", component: () => import("src/pages/views/Login.vue") },
      //   ],
      // },
      {
        path: "/",
        redirect: (to) => {
          // the function receives the target route as the argument
          // we return a redirect path/location here.
          return { path: "/login" };
        },
      },
      ...LOGIN_ROUTES,
      ...DASHBOARD_ROUTES,
      ...MIAUTO_ROUTES,
      ...NOTIFICATION_ROUTES,
      ...ABOUTAPP_ROUTES,
      ...PROFILE_ROUTES,
      ...MIPERSON_ROUTES,

      {
        path: "/:catchAll(.*)*",
        component: error404,
      },
    ],
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
