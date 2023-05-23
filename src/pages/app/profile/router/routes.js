import EmptyWrapper from "src/pages/app/shared/components/EmptyWrapper.vue";
import Profile from "src/pages/app/profile/pages/ProfileUser.vue";

const PROFILE_ROUTES = [
  {
    path: "/profile",
    component: EmptyWrapper,
    children: [
      {
        path: "",
        name: "profile",
        component: Profile,
      },
    ],
  },
];

export default PROFILE_ROUTES;
