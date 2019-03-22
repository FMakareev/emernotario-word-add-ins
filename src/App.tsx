/* global Office, Excel */

import * as React from 'react';

import {RouterProvider, RouterConsumer} from './modules/router';

import home from './modules/home/index';

import StyledThemeProvider from './styles/StyledThemeProvider';
import {Layout} from './components/Layout/Layout';
import {AppProvider} from './store/AppStore';


export interface AppProps {
    title: string;
    isOfficeInitialized: boolean;
}

export interface AppState {

}

const AppProviderWithRouterConsumer = (props) => {

    return <RouterConsumer>
        {value => {
            return <AppProvider {...value} {...props}/>;
        }}
    </RouterConsumer>;
};


export default class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
    }


    componentDidCatch(error) {
        console.log('componentDidCatch: ', error);
    }

    render() {
        return (
            <RouterProvider
                routes={[
                    ...home.routes,
                ]}
            >
                <AppProviderWithRouterConsumer {...this.props}>
                    <StyledThemeProvider>
                        <Layout/>
                    </StyledThemeProvider>
                </AppProviderWithRouterConsumer>
            </RouterProvider>
        );
    }
}
