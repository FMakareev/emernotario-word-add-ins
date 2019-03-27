import * as React from 'react';
import {Form, Field} from 'react-final-form';
import TextField from '../../../../components/TextField/TextField';
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import {AppConsumer, IAppContextProps} from '../../../../store/AppStore';
import {Translate} from 'react-localize-redux';
import Flex from '../../../../components/Flex/Flex';
import {withLocalize} from 'react-localize-redux';
import {ILocalize} from '../../../../interfaces/react-localize-redux';
import {
    KeyKeeperApi
} from '../../../../keyKeeperApi';



export interface IFormRegistrationValues {
    lastName?: string,
    firstName?: string,
    patronymic?: string,
    certificateNumber?: string,
}

export interface IFormRegistrationProps extends ILocalize {
    onSubmit(values: IFormRegistrationValues): Promise<void>,

    initialValues?: IFormRegistrationValues,

    [propName: string]: any,
}


const validate = (translate: any) => (values: IFormRegistrationValues) => {
    const errors: IFormRegistrationValues = {};
    if (!values.firstName) {
        errors.firstName = translate('validation.required');
    }
    if (!values.lastName) {
        errors.lastName = translate('validation.required');
    }
    if (!values.patronymic) {
        errors.patronymic = translate('validation.required');
    }
    if (!values.certificateNumber) {
        errors.certificateNumber = translate('validation.required');
    }

    return errors;
};

const FormRegistration: React.FC<IFormRegistrationProps> =
    ({onSubmit, initialValues, translate}) => (<Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate(translate)}
        render={({handleSubmit, pristine, invalid}) => (
            <form style={{width: '100%', maxWidth: '320px'}} onSubmit={handleSubmit}>
                <Box width={'100%'}>
                    <Box mb={5}>
                        {/* Фамилия */}
                        <Translate>
                            {({translate}) => <Field
                                name='lastName'
                                component={TextField}
                                placeholder={translate('user.lastName')}
                            />}
                        </Translate>
                    </Box>
                    <Box mb={5}>
                        {/* Имя  */}
                        <Translate>
                            {({translate}) => <Field
                                name='firstName'
                                component={TextField}
                                placeholder={translate('user.firstName')}
                            />}
                        </Translate>
                    </Box>
                    <Box mb={5}>
                        {/* Отчество */}
                        <Translate>
                            {({translate}) => <Field
                                name='patronymic'
                                component={TextField}
                                placeholder={translate('user.patronymic')}
                            />}
                        </Translate>
                    </Box>
                    <Box mb={7}>
                        {/* номер свидетельства */}
                        <Translate>
                            {({translate}) => <Field
                                name='certificateNumber'
                                component={TextField}
                                placeholder={translate('notary.certificateNumber')}
                            />}
                        </Translate>
                    </Box>
                </Box>

                <ButtonBase type='submit' disabled={pristine || invalid}>
                    <Translate id={'button.save'}/>
                </ButtonBase>
            </form>
        )}
    />);

const FormRegistrationWithLocalize = withLocalize(FormRegistration);

interface INotaryDataPageProps extends IAppContextProps {
    [propName: string]: any,
}

interface INotaryDataPageState {
    [propName: string]: any,
}

export class NotaryDataPage extends React.Component<INotaryDataPageProps, INotaryDataPageState> {
    rpcClient: any = null;

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.rpcClient = new KeyKeeperApi();
    }

    get initialState() {
        return {};
    }

    onSubmit = async (values: IFormRegistrationValues) => {
        console.log(values);
        this.props.setNotaryDataToAppStore(values);
    }


    render() {
        return (<Flex alignItems={'center'} flexDirection={'column'}>
            <Box color={'color4'} textAlign={'center'} maxWidth={'320px'} mb={5} fontSize={9} lintHeght={9}>
                <Translate id={'notaryDataPage.welcomeToApp'}/>
            </Box>
            <Box textAlign={'center'} fontSize={5} lintHeght={7} mb={9} maxWidth={'320px'}>
                <Translate id={'notaryDataPage.notaryDataSettingsInfo'}/>
            </Box>
            <Box fontSize={7} lintHeght={9} fontWeight={'bold'} textAlign={'center'} mb={5} maxWidth={'320px'}>
                <Translate id={'notaryDataPage.notaryDataTitle'}/>
            </Box>

            <FormRegistrationWithLocalize
                initialValues={{
                    ...this.props.notary,
                }}
                onSubmit={this.onSubmit}
            />
        </Flex>);
    }
}

const NotaryDataPageWithAppStoreConsumer = (props) => {

    return <AppConsumer>
        {value => {
            return <NotaryDataPage {...value} {...props}/>;
        }}
    </AppConsumer>;
};
export default NotaryDataPageWithAppStoreConsumer;