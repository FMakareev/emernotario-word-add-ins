import TextField from '../../../../components/TextField/TextField';
import * as React from 'react';
import {IDataOfParticipantOfTheNotarialActProps} from './FormNotarialAction';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import {Translate} from 'react-localize-redux';
import {Field} from 'react-final-form';


export const DataOfParticipantOfTheNotarialAct: React.FC<IDataOfParticipantOfTheNotarialActProps> = ({index, name, fields}) => (
    <Flex>
        <Box width={'100%'}>

            {/* Фамилия */}
            <Translate>
                {({translate}) => <>
                    <Box mb={5}>
                        <Field
                            name={`${name}.lastName`}
                            component={TextField}
                            placeholder={translate('user.lastName')}
                        />
                    </Box>
                    <Box mb={5}>
                        {/* Имя  */}
                        <Field
                            name={`${name}.firstName`}
                            component={TextField}
                            placeholder={translate('user.firstName')}
                        />
                    </Box>
                    <Box mb={5}>
                        {/* Отчество */}
                        <Field
                            name={`${name}.patronymic`}
                            component={TextField}
                            placeholder={translate('user.patronymic')}
                        />
                    </Box>
                    <Box mb={7}>
                        {/* ИНН */}
                        <Field
                            name={`${name}.tin`}
                            component={TextField}
                            placeholder={translate('user.tin')}
                        />
                    </Box>
                </>}
            </Translate>
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

export default DataOfParticipantOfTheNotarialAct;