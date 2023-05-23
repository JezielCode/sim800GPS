import EmptyWrapper from "src/pages/app/shared/components/EmptyWrapper.vue";
import Miperson from "src/pages/app/miperson/pages/MiPerson.vue";

const MIPERSON_ROUTES = [
  {
    path: "/mi-person",
    component: EmptyWrapper,
    children: [
      {
        path: "",
        name: "mi-person",
        component: Miperson,
      },
    ],
  },
];

export default MIPERSON_ROUTES;
