// import { Spinner, SpinnerType } from 'office-ui-fabric-react';


import * as React from 'react';
import {Flex} from './Flex/Flex';
import {Box} from './Box/Box';

export interface ProgressProps {
    logo: string;
    message?: string;
    title?: string;
}

export default class Progress extends React.Component<ProgressProps> {
    render() {
        const {
            logo,
            title,
        } = this.props;

        return (
            <Flex
                position={'fixed'}
                top={0}
                bottom={0}
                left={0}
                right={0}
                zIndex={10000}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                width={'100%'}
                height={'100vh'}
                backgroundColor={'color4'}
            >
                <Box maxWidth={'300px'}>
                    <img width={'100%'} src={logo} alt={title} title={title}/>
                </Box>
            </Flex>
        );
    }
}
