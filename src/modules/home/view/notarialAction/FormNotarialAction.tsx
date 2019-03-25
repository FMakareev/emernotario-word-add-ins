import * as React from 'react';
import {Form, Field} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {Translate} from 'react-localize-redux';

import {FieldArray} from 'react-final-form-arrays';
import TextField from '../../../../components/TextField/TextField';
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Flex from '../../../../components/Flex/Flex';
import {IFormRegistrationValues} from '../registration';


export interface IFormNotarialActionUser extends IFormRegistrationValues {
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
                <Translate>
                    {({translate}) => <Field
                        name={`${name}.lastName`}
                        component={TextField}
                        placeholder={translate('user.lastName')}
                    />}
                </Translate>
            </Box>
            <Box mb={5}>
                {/* Имя  */}
                <Translate>
                    {({translate}) => <Field
                        name={`${name}.firstName`}
                        component={TextField}
                        placeholder={translate('user.firstName')}
                    />}
                </Translate>
            </Box>
            <Box mb={5}>
                {/* Отчество */}
                <Translate>
                    {({translate}) => <Field
                        name={`${name}.patronymic`}
                        component={TextField}
                        placeholder={translate('user.patronymic')}
                    />}
                </Translate>
            </Box>
            <Box mb={7}>
                {/* ИНН */}
                <Translate>
                    {({translate}) => <Field
                        name={`${name}.tin`}
                        component={TextField}
                        placeholder={translate('user.tin')}
                    />}
                </Translate>
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
        <form style={{width: '100%', maxWidth: '320px'}} onSubmit={handleSubmit}>

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
                    <Translate id={'button.addAMember'}/>
                </ButtonBase>
            </Box>

            <Box>
                <Translate>
                    {({translate}) => <>
                        <Box mb={5}>
                            {/* номер в реестре */}
                            <Field
                                name='numberInTheRegistry'
                                component={TextField}
                                placeholder={translate('document.numberInTheRegistry')}
                            />
                        </Box>
                        <Box mb={5}>
                            {/* Дата документа (по умолчанию текущая) */}
                            <Field
                                name='documentDate'
                                component={TextField}
                                placeholder={translate('document.documentDate')}
                            />
                        </Box>
                        <Box mb={5}>
                            {/* Действующий до (если есть) */}
                            <Field
                                name='existingTo'
                                component={TextField}
                                placeholder={translate('document.existingTo')}
                            />
                        </Box>

                        <Box mb={5}>
                            {/* Тип документа */}
                            <Field
                                name='documentType'
                                component={TextField}
                                placeholder={translate('document.documentType')}
                            />
                        </Box>
                    </>}
                </Translate>

            </Box>

            <ButtonBase type='submit' disabled={pristine || invalid}>
                <Translate id={'button.signDocument'}/>
            </ButtonBase>
        </form>
    )}
/>);


export default FormNotarialAction;
