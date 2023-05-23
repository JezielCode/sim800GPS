import EmptyWrapper from "src/pages/app/shared/components/EmptyWrapper.vue";
import MiAuto from "src/pages/app/miauto/pages/MiAuto.vue";

const MIAUTO_ROUTES = [
  {
    path: "/mi-auto",
    component: EmptyWrapper,
    children: [
      {
        path: "",
        name: "mi-auto",
        component: MiAuto,
      },
    ],
  },
];

export default MIAUTO_ROUTES;
