/* global Office, Excel */

import * as React from 'react';
import fetch from 'unfetch';
import {
    RouterProvider,
    RouterConsumer
} from './modules/router';
import {withLocalize} from 'react-localize-redux';

import home from './modules/home/index';

import StyledThemeProvider from './styles/StyledThemeProvider';
import {Layout} from './components/Layout/Layout';
import {AppProvider} from './store/AppStore';

export interface AppProps {
    title: string;
    isOfficeInitialized: boolean;

    [propName: string]: any,
}

export interface AppState {
    [propName: string]: any,
}

const AppProviderWithRouterConsumer = (props) => {

    return <RouterConsumer>
        {value => {
            return <AppProvider {...value} {...props}/>;
        }}
    </RouterConsumer>;
};


export class App extends React.Component<AppProps, AppState> {

    static defaultProps = {
        activeLanguage: {},
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.initLocalization();
    }

    get initialState() {
        return {
            languages: [],
            languagesLoading: true,
            languagesError: null,
        };
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate prevProps: ', prevProps);
        console.log('componentDidUpdate this.props: ', this.props);
        const hasActiveLanguageChanged =
            prevProps.activeLanguage.code !== this.props.activeLanguage.code;
        if (hasActiveLanguageChanged) {
            this.addTranslationsForActiveLanguage(this.props.activeLanguage.code);
        }
    }

    addTranslationsForActiveLanguage = (code) => {
        return fetch(`./assets/messages/${code}.json`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(`Для языка с кодом "${code}", нет словаряю`);
                    return this.addTranslationsForActiveLanguage(this.props.defaultLanguage);
                }
            })
            .then(response => {
                console.log('response addTranslationsForActiveLanguage: ', response);
                this.props.addTranslationForLanguage(response, code);
                return response;
            })
            .catch(error => {
                console.error('Error addTranslationsForActiveLanguage: ', error);
                return error;
            });
    };

    /**
     * @return {promise}
     * @desc инициализация языков
     * */
    initLocalization = async () => {
        const languages = await this.getLocalizationList();
        this.addTranslationsForActiveLanguage('RU');

        if (languages.length) {
            this.props.initialize({
                languages: [
                    ...languages
                ],
                translation: {},
                options: {
                    defaultLanguage: 'RU',
                    renderToStaticMarkup: false,
                }
            });
        }

    };

    /**
     * @return {promise}
     * @desc метод выполняет получение списка ячыков для приложения
     * */
    getLocalizationList = () => {
        return fetch('./assets/messages/localization.json').then(response => {
            console.log('response getLocalizationList: ', response);
            return response.json();
        }).catch(error => {
            console.error('Error getLocalizationList: ', error);
            return error;
        });
    };


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


export default withLocalize(App);
