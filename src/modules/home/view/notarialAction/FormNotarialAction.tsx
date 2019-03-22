import * as React from 'react';
import {Form, Field} from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import {FieldArray} from 'react-final-form-arrays';
import TextField from '../../../../components/TextField/TextField';
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Flex from '../../../../components/Flex/Flex';
import {IFormRegistrationValues} from '../registration/index';



export interface IFormNotarialActionUser extends IFormRegistrationValues{
    tin?: string,
}

export interface IFormNotarialActionValues {
    customers: IFormNotarialActionUser[],
    numberInTheRegistry?: string,
    documentDate?: string,
    existingTo?: string,
    documentType?: string,

    [propName: string]: any,
}


export interface IFormNotarialActionProps {
    onSubmit(values: IFormNotarialActionValues): Promise<void>,

    initialValues?: IFormNotarialActionValues,
}

export interface IDataOfParticipantOfTheNotarialActProps {
    index: number,
    name: string,
    fields: any,

    [propName: string]: any,
}

const DataOfParticipantOfTheNotarialAct: React.FC<IDataOfParticipantOfTheNotarialActProps> = ({index, name, fields}) => (
    <Flex key={name + index}>
        <Box width={'100%'}>
            <Box mb={5}>
                {/* Фамилия */}
                <Field name={`${name}.lastName`} component={TextField} placeholder='Прізвище*'/>
            </Box>
            <Box mb={5}>
                {/* Имя  */}
                <Field name={'${name}.firstName'} component={TextField} placeholder='Ім`я*'/>
            </Box>
            <Box mb={5}>
                {/* Отчество */}
                <Field name={`${name}.patronymic`} component={TextField} placeholder='По-батькові*'/>
            </Box>
            <Box mb={7}>
                {/* ИНН */}
                <Field name={`${name}.tin`} component={TextField} placeholder='ІПН (або номер паспорту)'/>
            </Box>
        </Box>
        <Box
            pl={5}
            onClick={() => fields.remove(index)}
            style={{cursor: 'pointer'}}
        >
            ❌
        </Box>
    </Flex>
);


export const FormNotarialAction: React.FC<IFormNotarialActionProps> = ({onSubmit, initialValues}) => (<Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    mutators={{
        ...arrayMutators
    }}
    render={({
                 handleSubmit,
                 pristine,
                 invalid,
                 form: {
                     mutators: {push}
                 }
             }) => (
        <form onSubmit={handleSubmit}>

            <Box mb={9}>
                <FieldArray name='customers'>
                    {
                        ({fields}) =>
                            fields.map((name, index) => <DataOfParticipantOfTheNotarialAct
                                index={index}
                                name={name}
                                fields={fields}
                            />)
                    }
                </FieldArray>

                <ButtonBase type='button' onClick={() => push('customers', undefined)}>
                    Добавить участника
                </ButtonBase>
            </Box>

            <Box>
                <Box mb={5}>
                    {/* номер в реестре */}
                    <Field name='numberInTheRegistry' component={TextField} placeholder='Номер в реєстрі*'/>
                </Box>
                <Box mb={5}>
                    {/* Дата документа (по умолчанию текущая) */}
                    <Field name='documentDate' component={TextField}
                           placeholder='Дата документу (за замовчуванням поточна)'/>
                </Box>
                <Box mb={5}>
                    {/* Действующий до (если есть) */}
                    <Field name='existingTo' component={TextField} placeholder='Чинний до (якщо є)'/>
                </Box>

                <Box mb={5}>
                    {/* Тип документа */}
                    <Field name='documentType' component={TextField} placeholder='Тип документу'/>
                </Box>
            </Box>

            <ButtonBase type='submit' disabled={pristine || invalid}>
                Підписати
            </ButtonBase>
        </form>
    )}
/>);


export default FormNotarialAction;
