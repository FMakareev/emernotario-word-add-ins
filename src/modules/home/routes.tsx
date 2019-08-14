import DocumentSettingPage from './view/documentSettingPage';
import NotarizationResultPage from './view/notarizationResult';
import NotaryDataPage from './view/notaryDataPage';
import TestPageWithAppStore from './view/test';

export const routes = [
    {
        component: NotaryDataPage,
        exact: true,
        name: 'Главная',
        path: '/',
    },
    {
        component: DocumentSettingPage,
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
    {
        component: TestPageWithAppStore,
        exact: true,
        name: 'Нотаризация',
        path: '/test',
    },
];
