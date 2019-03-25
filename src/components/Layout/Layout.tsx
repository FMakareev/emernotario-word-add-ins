import * as React from 'react';
import CreateRoute from '../../modules/router/components/CreateRoute/CreateRoute';
import Header from '../Header/Header';
import Box from '../Box/Box';
import Navigation from '../Navigation/Navigation';


export class Layout extends React.Component {
    render() {
        return (<React.Fragment>
            <Box pb={'88px'}>
                <Box mx={-5} mb={5}>
                    <Header/>
                </Box>

                <CreateRoute/>

                <Box width={'100%'} zIndex={100} position={'fixed'} bottom={0} mx={-5}>
                    <Navigation/>
                </Box>
            </Box>
        </React.Fragment>);
    }
}


export default Layout;