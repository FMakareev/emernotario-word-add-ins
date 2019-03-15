import * as React from 'react';
import {SpeedingWheel} from '../SmallPreloader/SmallPreloader';
import Box from '../Box/Box';

export interface ISpinnerProps {
    label?: string;
    size: string
    spinnerColor: string
    labelColor: string
    labelSize: string
}

export class Spinner extends React.Component<ISpinnerProps> {

    static defaultProps = {
        size: 7,
        spinnerColor: 'color0',
        labelColor: 'color0',
        labelSize: 5,
    };

    render() {
        const {size, label, spinnerColor, labelColor, labelSize} = this.props;

        return (<Box textAlign={'center'}>
            <Box mb={5} fontSize={size}>
                <SpeedingWheel borderColor={spinnerColor}/>
            </Box>
            {
                label &&
                <Box fontSize={labelSize} color={labelColor}>
                    {label}
                </Box>
            }
        </Box>);
    }

}