import * as React from 'react';
import {Form, Field} from 'react-final-form';
import TextField from '../../../components/TextField/TextField';
import Box from '../../../components/Box/Box';
import ButtonBase from '../../../components/ButtonBase/ButtonBase';
import FormNotarialAction from './FormNotarialAction';



export interface IFormRegistrationValues  {
    lastName: string,
    firstName: string,
    patronymic: string,
    certificateNumber?: string,
}

export interface IFormRegistrationProps  {
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



export class HomePage extends React.Component {

    onSubmit = async (values: object) => {
        console.log(values);
    };

    render() {
        return (<Box>
            <FormRegistration onSubmit={this.onSubmit}/>
            <br/>
            <FormNotarialAction onSubmit={this.onSubmit}/>
        </Box>);
    }
}

export default HomePage;
