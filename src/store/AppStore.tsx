import * as React from 'react';
import {IFormRegistrationValues} from '../modules/home/view/registration';
import Progress from '../components/Progress';
import {
    IFormNotarialActionValues
} from '../modules/home/view/notarialAction/FormNotarialAction';


export interface IInitStatus {
    [propName: string]: any,
}


export interface IAppContextProps {
    notarizationData?: IFormNotarialActionValues,
    notary?: IFormRegistrationValues,
    status: IInitStatus,
    getNotaryDataFromDocumentSetting: any,
    setNotaryDataToAppStore: any,
    removeNotaryDataFromDocumentSetting: any,

    getNotarizationDataDataFromDocumentSetting: any,
    setNotarizationDataDataToAppStore: any,
    removeNotarizationDataDataFromDocumentSetting: any,

    [propName: string]: any,
}


export const {Provider, Consumer: AppConsumer} = React.createContext<Partial<IAppContextProps>>({});


interface IAppProviderProps {
    isOfficeInitialized: boolean,
    title?: string,

    [propName: string]: any,
}

interface IAppProviderState {
    [propName: string]: any,
}


export class AppProvider extends React.Component<IAppProviderProps, IAppProviderState> {


    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
            notary: this.getNotaryDataFromDocumentSetting(),
            notarizationData: this.getNotarizationDataDataFromDocumentSetting(),
            status: {
                loading: true,
                error: null,
            },
        };
    }

    /**
     * @desc метод выполняет сохранение локальных данных записаных через метод Office.context.document.settings.set в документ
     * */
    saveDataToCurrentDocument = (state) => {
        return new Promise((resolve, reject) => {
            Office.context.document.settings.saveAsync((asyncResult) => {
                if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                    reject(asyncResult.status);
                } else {
                    resolve(state);
                }
            });
        });
    };



    /**
     * @desc метод получает из локального кеша документа данные нотариуса
     * */
    getNotaryDataFromDocumentSetting = (): IFormRegistrationValues => {
        try {

            const notary = Office.context.document.settings.get('notary');

            if (notary) {
                this.props.action.push('/notarization');
            } else {
                this.props.action.push('/');
            }

            this.setState({
                notary: JSON.parse(notary),
                status: {
                    loading: false,
                    error: null,
                }
            });
            return JSON.parse(notary);
        } catch (error) {
            console.error('Error getNotaryDataFromDocumentSetting: ', error);
            this.setState({
                notary: null,
                status: {
                    loading: false,
                    error: error,
                }
            });
            return null;
        }
    };

    /** @desc метод выполняет запись данных нотариуса в кеш документа */
    setNotaryDataToAppStore = (notary: IFormRegistrationValues) => {

        Office.context.document.settings.set('notary', JSON.stringify(notary));


        this.saveDataToCurrentDocument({notary: notary})
            .then(response => {
                console.log(response);
                this.setState({
                    ...response,
                    status: {
                        loading: false,
                        error: null,
                    }
                });
                this.props.action.push('/notarization');
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({
                    status: {
                        loading: false,
                        error,
                    }
                });
                this.props.action.push('/');
            });

    };

    /** @desc метод выполняет удаление данных нотариуса из кеша документа */
    removeNotaryDataFromDocumentSetting = () => {
        Office.context.document.settings.remove('notary');
        this.saveDataToCurrentDocument({notary: null})
            .then(response => {
                console.log('response:', response);
                this.state = this.initialState;
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };



    /** @desc метод получает данные нотаризации из кеша документа */
    getNotarizationDataDataFromDocumentSetting = (): IFormNotarialActionValues => {
        try {

            const notarizationData = Office.context.document.settings.get('notarizationData');

            this.setState({
                notarizationData: JSON.parse(notarizationData),
                status: {
                    loading: false,
                    error: null,
                }
            });
            return JSON.parse(notarizationData);
        } catch (error) {
            console.error('Error getNotarizationDataDataFromDocumentSetting: ', error);
            this.setState({
                notary: null,
                status: {
                    loading: false,
                    error: error,
                }
            });
            return null;
        }
    };

    /** @desc метод записывает данные нотаризации в кеш документа */
    setNotarizationDataDataToAppStore = (notarizationData) => {
        Office.context.document.settings.set('notarizationData', JSON.stringify(notarizationData));
        return new Promise((resolve, reject) => {
            this.saveDataToCurrentDocument({notarizationData: notarizationData})
                .then(response => {
                    console.log('response: ', response);
                    this.setState({
                        ...response,
                        status: {
                            loading: false,
                            error: null,
                        }
                    }, () => {
                        resolve({notarizationData});
                    });
                })
                .catch(error => {
                    console.error('Error setNotarizationDataDataToAppStore :', error);
                    this.setState({
                        status: {
                            loading: false,
                            error,
                        }
                    });
                    reject({
                        notarizationData,
                        error,
                    });
                });
        });
    };

    /** @desc метод удаляет данные нотаризации из кеша документа */
    removeNotarizationDataDataFromDocumentSetting = () => {
        Office.context.document.settings.remove('notarizationData');
        this.saveDataToCurrentDocument({notarizationData: null})
            .then(response => {
                console.log('response:', response);
                this.state = this.initialState;
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    render() {
        const {children, isOfficeInitialized, title} = this.props;

        return (<Provider
            value={{
                notarizationData: this.state.notarizationData,
                notary: this.state.notary,
                status: this.state.status,

                getNotaryDataFromDocumentSetting: this.getNotaryDataFromDocumentSetting,
                setNotaryDataToAppStore: this.setNotaryDataToAppStore,
                removeNotaryDataFromDocumentSetting: this.removeNotaryDataFromDocumentSetting,

                getNotarizationDataDataFromDocumentSetting: this.getNotarizationDataDataFromDocumentSetting,
                setNotarizationDataDataToAppStore: this.setNotarizationDataDataToAppStore,
                removeNotarizationDataDataFromDocumentSetting: this.removeNotarizationDataDataFromDocumentSetting,
            }}
        >
            {
                isOfficeInitialized &&
                <React.Fragment>
                    {children}
                </React.Fragment>
            }
            {
                !isOfficeInitialized &&
                <Progress
                    title={title}
                    logo='assets/icon_logo.svg'
                    message='Please sideload your addin to see app body.'
                />
            }
        </Provider>);
    }
}

export default {
    AppProvider,
    AppConsumer
};
