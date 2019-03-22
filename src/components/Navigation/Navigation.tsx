import * as React from 'react';
import Flex from '../Flex/Flex';
import Box from '../Box/Box';
import Link from '../../modules/router/components/Link/Link';


export class Navigation extends React.Component {

    render() {
        return (<Flex justifyContent={'center'} p={5} backgroundColor={'color4'}>
            <Box>
                <Link to={'/'}>
                    HomePage
                </Link>
            </Box>
            <Box>
                <Link to={'/notarization'}>
                    NotarialActionPage
                </Link>
            </Box>
            <Box>
                <Link to={'/notarization-result'}>
                    NotarizationResultPage
                </Link>
            </Box>
        </Flex>);
    }

}

export default Navigation;