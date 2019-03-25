import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {LocalizeProvider} from 'react-localize-redux';

import App from './App';

import './styles.less';
import 'office-ui-fabric-react/dist/css/fabric.min.css';


let isOfficeInitialized = false;

const title = 'emernotario-word-add-ins';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <LocalizeProvider>
            <Component title={title} isOfficeInitialized={isOfficeInitialized}/>
            </LocalizeProvider>
        </AppContainer>,
        document.getElementById('container')
    );
};

Office.initialize = () => {
    isOfficeInitialized = true;
    render(App);
};



/* Initial render showing a progress bar */
render(App);

if ((module as any).hot) {
    (module as any).hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}
