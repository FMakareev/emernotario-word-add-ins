import * as React from 'react';
import {Form, Field} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {withLocalize} from 'react-localize-redux';

import {FieldArray} from 'react-final-form-arrays';
import TextField from '../../../../components/TextField/TextField';
import Box from '../../../../components/Box/Box';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Flex from '../../../../components/Flex/Flex';
import {IFormRegistrationValues} from '../notaryDataPage';
import {ILocalize} from '../../../../interfaces/react-localize-redux';
import DataOfParticipantOfTheNotarialAct from './DataOfParticipantOfTheNotarialAct';
import {validateFormNotarialActionUser} from './validation';


export interface IFormNotarialActionUser extends IFormRegistrationValues {
    tin?: string,
}

export interface IFormNotarialActionValues {
    customers?: IFormNotarialActionUser[],
    numberInTheRegistry?: string,
    documentDate?: string,
    existingTo?: string,
    documentType?: string,

    [propName: string]: any,
}


export interface IFormNotarialActionProps extends ILocalize {
    onSubmit(values: IFormNotarialActionValues): Promise<void>,

    onSaveDocument(values: IFormNotarialActionValues): void,

    initialValues?: IFormNotarialActionValues,

    [propName: string]: any,
}

export interface IDataOfParticipantOfTheNotarialActProps {
    index: number,
    name: string,
    fields: any,

    [propName: string]: any,
}





export const FormNotarialAction: React.FC<IFormNotarialActionProps> = ({onSubmit, onSaveDocument, initialValues, translate}) => (
    <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validateFormNotarialActionUser(translate)}
        mutators={{
            ...arrayMutators
        }}
        render={({
                     handleSubmit,
                     // pristine,
                     invalid,
                     form: {
                         mutators: {push},
                     },
                     values,
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
                                    key={name + index}
                                />)
                        }
                    </FieldArray>

                    <ButtonBase type='button' onClick={() => push('customers', undefined)}>
                        {translate('button.addAMember')}
                    </ButtonBase>
                </Box>

                <Box>
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
                </Box>
                <Flex width={'100%'} justifyContent={'space-between'}>
                    <Box pr={'12px'}>
                        <ButtonBase type='button' onClick={() => {
                            onSaveDocument(values);
                        }}>
                            {translate('button.save')}
                        </ButtonBase>
                    </Box>
                    <Box>
                        <ButtonBase type='submit' disabled={invalid}>
                            {translate('button.createQRCode')}
                        </ButtonBase>
                    </Box>
                </Flex>
            </form>
        )}
    />);


export default withLocalize(FormNotarialAction);
