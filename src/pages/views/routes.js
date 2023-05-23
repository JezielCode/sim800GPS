//import EmptyWrapper from 'src/pages/app/shared/components/EmptyWrapper.vue'
import Login from "src/pages/views/LoginView.vue";

const LOGIN_ROUTES = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { layout: "full-layout" },
  },
];

export default LOGIN_ROUTES;
