import * as React from 'react';
import {Form, Field} from 'react-final-form';
import TextField from '../../../../components/TextField/TextField';
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import {AppConsumer, IAppContextProps} from '../../../../store/AppStore';
import {Translate} from 'react-localize-redux';
import Flex from '../../../../components/Flex/Flex';


export interface IFormRegistrationValues {
    lastName: string,
    firstName: string,
    patronymic: string,
    certificateNumber?: string,
}

export interface IFormRegistrationProps {
    onSubmit(values: IFormRegistrationValues): Promise<void>,

    initialValues?: IFormRegistrationValues,
}

const FormRegistration: React.FC<IFormRegistrationProps> = ({onSubmit, initialValues}) => (<Form
    onSubmit={onSubmit}
    initialValues={initialValues}
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


interface IHomePageProps extends IAppContextProps {
    [propName: string]: any,
}

interface IHomePageState {
    [propName: string]: any,
}

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {

    constructor(props) {
        super(props);
        this.state = this.initialState;

    }

    get initialState() {
        return {};
    }

    onSubmit = async (values: IFormRegistrationValues) => {
        console.log(values);
        this.props.setNotaryDataToAppStore(values);
    };

    render() {
        return (<Flex alignItems={'center'} flexDirection={'column'}>
            <Box color={'color4'} textAlign={'center'} maxWidth={'320px'} mb={5} fontSize={9} lintHeght={9}>
                <Translate id={'notaryDataPage.welcomeToApp'}/>
            </Box>
            <Box textAlign={'center'}  fontSize={5} lintHeght={7} mb={9} maxWidth={'320px'}>
                <Translate id={'notaryDataPage.notaryDataSettingsInfo'}/>
            </Box>
            <Box fontSize={7} lintHeght={9} fontWeight={'bold'} textAlign={'center'} mb={5} maxWidth={'320px'}>
                <Translate id={'notaryDataPage.notaryDataTitle'}/>
            </Box>
            <FormRegistration
                initialValues={{
                    ...this.props.notary,
                }}
                onSubmit={this.onSubmit}
            />
        </Flex>);
    }
}

const HomePageWithAppStoreConsumer = (props) => {

    return <AppConsumer>
        {value => {
            return <HomePage {...value} {...props}/>;
        }}
    </AppConsumer>;
};
export default HomePageWithAppStoreConsumer;
