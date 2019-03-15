import AuthPage from './view';

console.log(AuthPage);

export const routes = [
    {
        component: AuthPage,
        exact: true,
        name: 'Авторизация',
        path: '/login',
    },
];
