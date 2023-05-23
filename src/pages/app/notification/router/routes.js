import EmptyWrapper from "src/pages/app/shared/components/EmptyWrapper.vue";
import Notification from "src/pages/app/notification/pages/NotificationMsg.vue";

const NOTIFICATION_ROUTES = [
  {
    path: "/notification",
    component: EmptyWrapper,
    children: [
      {
        path: "",
        name: "notification",
        component: Notification,
      },
    ],
  },
];

export default NOTIFICATION_ROUTES;
