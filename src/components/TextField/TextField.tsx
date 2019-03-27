import * as React from 'react';
// import styled from 'styled-components';

/** View */
import {TextFieldBase} from '../TextFieldBase/TextFieldBase';
import Box from '../Box/Box';

// interface ITextFieldProps {
//     input?: any,
//     meta?: any,
//     [propName: string]: any,
// }

// const Message = styled()

export class TextField extends React.Component<any> {

    render() {
        const {input, meta} = this.props;
        return (<Box>
            <Box mb={3}>
                <TextFieldBase
                    {...this.props}
                    {...input}
                />
            </Box>
            {
                meta.error && meta.touched && <Box fontSize={5} lineHeight={'24px'} color={'color13'}>{meta.error}</Box>
            }
        </Box>);
    }
}

export default TextField;
