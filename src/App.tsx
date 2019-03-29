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
import {ILanguage} from './interfaces/react-localize-redux';

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

const toggleClassName = (Container: any, add: string, remove: string) => {
    if (!Container.classList.contains(add)) {
        Container.classList.add(add);
    }
    if (Container.classList.contains(remove)) {
        Container.classList.remove(remove);
    }
};

export class App extends React.Component<AppProps, AppState> {

    appContainer = null;

    static defaultProps = {
        activeLanguage: {},
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.initLocalization();
        this.appContainer = document.getElementById('container');
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

    changeDirection = (dir) => {
        switch (dir) {
            case('rtl'): {
                toggleClassName(this.appContainer, 'dir-rtl', 'dir-ltr');
                break;
            }
            case('ltr'): {
                toggleClassName(this.appContainer, 'dir-ltr', 'dir-rtl');
                break;
            }
            default: {
                toggleClassName(this.appContainer, 'dir-ltr', 'dir-rtl');
                break;
            }
        }
    };

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
        const languages: ILanguage[] = await this.getLocalizationList();
        const config = {
            languages: [],
            translation: {},
            changeDirection: this.changeDirection,
            options: {
                defaultLanguage: 'en-us',
                renderToStaticMarkup: false,
            }
        };
        const defaultLanguageAddIns: ILanguage = languages.find((lang: ILanguage) => lang.default);
        const userDisplayLanguage: string = Office.context.displayLanguage;

        const userLanguageInAddInDictionary: ILanguage = languages.find((lang: ILanguage) => lang.code.toLowerCase() === userDisplayLanguage.toLowerCase());

        if (userLanguageInAddInDictionary) {
            this.addTranslationsForActiveLanguage(userLanguageInAddInDictionary.code.toLowerCase());
            config.options.defaultLanguage = userLanguageInAddInDictionary.code.toLowerCase();
            this.changeDirection(userLanguageInAddInDictionary.dir);
        } else {
            this.addTranslationsForActiveLanguage(defaultLanguageAddIns.code.toLowerCase());
            config.options.defaultLanguage = defaultLanguageAddIns.code.toLowerCase();
            this.changeDirection(defaultLanguageAddIns.dir);
        }

        if (languages.length) {
            config.languages = languages;
            this.props.initialize(config);
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
            <StyledThemeProvider>
                <RouterProvider
                    routes={[
                        ...home.routes,
                    ]}
                >
                    <AppProviderWithRouterConsumer {...this.props}>
                        <Layout/>
                    </AppProviderWithRouterConsumer>
                </RouterProvider>
            </StyledThemeProvider>
        );
    }
}


export default withLocalize(App);
