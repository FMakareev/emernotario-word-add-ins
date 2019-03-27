import * as React from 'react';
import SHA512 from 'sha512-es';
import {IFormRegistrationValues} from '../modules/home/view/notaryDataPage';
import Progress from '../components/Progress';
import {
    IFormNotarialActionValues
} from '../modules/home/view/documentSettingPage/FormNotarialAction';


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

    getHash512DocumentContent: any,
    getHash512DateOfDocumentAndNotary: any,
    getHash512DataOfNotarisation: any,
    getFile: any,

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

    /** @desc чтение документа, метод получает содержимое документа */
    getFile = () => {
        return new Promise((resolve) => {
            Office.context.document.getFileAsync(Office.FileType.Text, {sliceSize: 4194304  /*64 KB*/},
                async (result) => {
                    // https://stackoverflow.com/questions/41063377/word-add-in-get-full-document-text
                    if (result.status === Office.AsyncResultStatus.Succeeded) {
                        // If the getFileAsync call succeeded, then
                        // result.value will return a valid File Object.
                        let myFile = result.value;
                        console.log('result.value: ', result.value);
                        let sliceCount = myFile.sliceCount;
                        let slicesReceived = 0, gotAllSlices = true, docDataSlices = [];
                        console.log('File size:' + myFile.size + ' #Slices: ' + sliceCount);

                        // Get the file slices.
                        resolve(await this.getSliceFileAsync(myFile, 0, sliceCount, gotAllSlices, docDataSlices, slicesReceived));
                    }
                    else {
                        console.log('Error:', result.error.message);
                    }
                });
        });

    };

    getSliceFileAsync = (file, nextSlice, sliceCount, gotAllSlices, docDataSlices, slicesReceived) => {
        return new Promise((resolve) => {
            file.getSliceAsync(nextSlice, async (sliceResult) => {
                if (sliceResult.status === 'succeeded') {
                    if (!gotAllSlices) { // Failed to get all slices, no need to continue.
                        return;
                    }
                    docDataSlices[sliceResult.value.index] = sliceResult.value.data;
                    if (++slicesReceived === sliceCount) {
                        file.closeAsync();
                        console.log(docDataSlices);
                        resolve(docDataSlices);
                    }
                    else {
                        resolve(await this.getSliceFileAsync(file, ++nextSlice, sliceCount, gotAllSlices, docDataSlices, slicesReceived));
                    }
                }
                else {
                    gotAllSlices = false;
                    file.closeAsync();
                    console.log('getSliceAsync Error:', sliceResult.error.message);
                }
            });
        });
    };

    /** @desc получить sha512 содержимого документа (хеш 3)*/
    getHash512DocumentContent = async () => {
        try {
            const docDataObject = await this.getFile();
            let docText = '';
            Object.entries(docDataObject).forEach((item) => docText += item[1]);
            return SHA512.hash(docText);
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    /** @desc получить sha512 данных нотаризации (хеш 2)*/
    getHash512DataOfNotarisation = () => {
        // TODO: вопрос: номер в реестре и номер свидетельства в презентации омещаются  вразные хеши это нормально?
        try {
            return SHA512.hash(JSON.stringify(Object.assign({}, this.state.notarizationData, {
                notary: this.state.notary,
            })));
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    /** @desc получить sha512 (хеш 1)*/
    getHash512DateOfDocumentAndNotary = () => {
        try {
            return SHA512.hash(JSON.stringify({
                certificateNumber: this.state.notary.certificateNumber,
                numberInTheRegistry: this.state.notarizationData.numberInTheRegistry,
                documentDate: new Date().toISOString(),
            }));
        } catch (error) {
            console.log(error);
        }
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

                getFile: this.getFile,

                getHash512DataOfNotarisation: this.getHash512DataOfNotarisation,
                getHash512DocumentContent: this.getHash512DocumentContent,
                getHash512DateOfDocumentAndNotary: this.getHash512DateOfDocumentAndNotary,
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
