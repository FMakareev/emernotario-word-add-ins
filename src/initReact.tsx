import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App';

import './styles.less';
import 'office-ui-fabric-react/dist/css/fabric.min.css';


let isOfficeInitialized = false;

const title = 'emernotario-word-add-ins';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component title={title} isOfficeInitialized={isOfficeInitialized}/>
        </AppContainer>,
        document.getElementById('container')
    );
};


export default () => {
    render(App);

    if ((module as any).hot) {
        (module as any).hot.accept('./components/App', () => {
            const NextApp = require('./App').default;
            render(NextApp);
        });
    }
};