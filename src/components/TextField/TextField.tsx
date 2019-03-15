import * as React from 'react';

/** View */
import {TextFieldBase} from '../TextFieldBase/TextFieldBase';

// interface ITextFieldProps {
//     input?: any,
//     meta?: any,
//     [propName: string]: any,
// }


export class TextField extends React.Component<any> {

    render() {
        const {input} = this.props;
        return (<TextFieldBase
            {...this.props}
            {...input}
        />);
    }
}

export default TextField;
