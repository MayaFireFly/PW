import { routes } from '../constants';

import Main from '../pages/Main';
import Auth from '../pages/Auth';
import User from '../pages/User';
import PW from '../pages/PW';


export const configRoutes = [
  {
    path: routes.base,
    exact: true,
    component: Main,
    title: 'Main'
  },
  {
    path: routes.user,
    exact: true,
    isPrivate: true,
    component: User,
    title: 'Info'
  },
  {
    path: routes.pw,
    exact: true,
    isPrivate: true,
    component: PW,
    title: 'PW'
  },
  {
    path: routes.auth,
    exact: true,
    component: Auth,
    title: 'SignIn',
    privateTitle: 'Logout'
  }
];