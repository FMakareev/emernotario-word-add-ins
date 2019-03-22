import HomePage from './view/registration/index';
import NotarialActionPage from './view/notarialAction/index';
import {NotarizationResultPage} from './view/notarizationResult';

export const routes = [
    {
        component: HomePage,
        exact: true,
        name: 'Главная',
        path: '/',
    },
    {
        component: NotarialActionPage,
        exact: true,
        name: 'Нотаризация',
        path: '/notarization',
    },
    {
        component: NotarizationResultPage,
        exact: true,
        name: 'Нотаризация',
        path: '/notarization-result',
    },
];
