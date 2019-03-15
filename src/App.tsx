/* global Office, Excel */

import * as React from 'react';
// import {ApolloProvider} from 'react-apollo';
// import apollo from '../modules/apollo';


// import Progress from './components/Progress';

import {RouterProvider} from './modules/router';

import home from './modules/home/index';
import auth from './modules/auth/index';

import Link from './modules/router/components/Link/Link';
import StyledThemeProvider from './styles/StyledThemeProvider';
import {Layout} from './components/Layout/Layout';


export interface AppProps {
    title: string;
    isOfficeInitialized: boolean;
}

export interface AppState {

}


export default class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
    }


    componentDidCatch(error) {
        console.log('componentDidCatch: ', error);
    }

    render() {
        // const {
        //     title,
        //     isOfficeInitialized,
        // } = this.props;


        return (
            <RouterProvider
                routes={[
                    ...home.routes,
                    ...auth.routes,
                ]}
            >
                <StyledThemeProvider>
                    <React.Fragment>

                        {/*{*/}
                            {/*!isOfficeInitialized &&*/}
                            {/*<Progress*/}
                                {/*title={title}*/}
                                {/*logo='assets/icon_logo.svg'*/}
                                {/*message='Please sideload your addin to see app body.'*/}
                            {/*/>*/}
                        {/*}*/}
                        <div>
                            <Link to={'/'}>
                                HomePage
                            </Link>
                            <Link to={'/login'}>
                                AuthPage
                            </Link>
                            <Layout/>
                        </div>
                    </React.Fragment>
                </StyledThemeProvider>
            </RouterProvider>
        );
    }
}