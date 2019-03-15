// import { Spinner, SpinnerType } from 'office-ui-fabric-react';


import * as React from 'react';
import {Flex} from './Flex/Flex';
import {Box} from './Box/Box';
import {Spinner} from './Spinner/Spinner';

export interface ProgressProps {
    logo: string;
    message: string;
    title: string;
}

export default class Progress extends React.Component<ProgressProps> {
    render() {
        const {
            logo,
            message,
            title,
        } = this.props;

        return (
            <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'} width={'100%'}
                  height={'100vh'} backgroundColor={'color4'}>
                <Box maxWidth={'300px'}>
                    <img width={'100%'} src={logo} alt={title} title={title}/>
                </Box>
                <Box>
                    <Box mb={7} fontSize={9}>{title}</Box>
                    <Spinner label={message}/>
                </Box>
            </Flex>
        );
    }
}
