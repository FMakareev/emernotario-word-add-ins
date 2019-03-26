import DocumentSettingPage from './view/documentSettingPage';
import NotarizationResultPage from './view/notarizationResult';
import NotaryDataPage from './view/notaryDataPage';

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
];
