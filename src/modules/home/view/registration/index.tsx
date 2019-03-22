import * as React from 'react';
import {Form, Field} from 'react-final-form';
import TextField from '../../../../components/TextField/TextField';
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import {AppConsumer, IAppContextProps} from '../../../../store/AppStore';


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
        <form onSubmit={handleSubmit}>
            <Box>
                <Box mb={5}>
                    {/* Фамилия */}
                    <Field name='lastName' component={TextField} placeholder='Прізвище'/>
                </Box>
                <Box mb={5}>
                    {/* Имя  */}
                    <Field name='firstName' component={TextField} placeholder='Ім`я'/>
                </Box>
                <Box mb={5}>
                    {/* Отчество */}
                    <Field name='patronymic' component={TextField} placeholder='По-батькові'/>
                </Box>
                <Box mb={7}>
                    {/* номер свидетельства */}
                    <Field name='certificateNumber' component={TextField} placeholder='Номер свідоцтва'/>
                </Box>
            </Box>

            <ButtonBase type='submit' disabled={pristine || invalid}>
                Зберегти
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
        return (<Box>
            <FormRegistration
                initialValues={{
                    ...this.props.notary,
                }}
                onSubmit={this.onSubmit}
            />
        </Box>);
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
