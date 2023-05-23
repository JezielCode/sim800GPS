import EmptyWrapper from "src/pages/app/shared/components/EmptyWrapper.vue";
import AboutApp from "src/pages/app/aboutapp/pages/AboutApp.vue";

const ABOUTAPP_ROUTES = [
  {
    path: "/aboutapp",
    component: EmptyWrapper,
    children: [
      {
        path: "",
        name: "aboutapp",
        component: AboutApp,
      },
    ],
  },
];

export default ABOUTAPP_ROUTES;
