import EmptyWrapper from 'src/pages/app/shared/components/EmptyWrapper.vue'
import ProfileView from 'src/pages/app/dashboard/pages/ProfileView.vue'

const DASHBOARD_ROUTES = [
  {
    path: '/dashboard',
    component: EmptyWrapper,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: ProfileView
      }
    ]
  }
]

export default DASHBOARD_ROUTES
