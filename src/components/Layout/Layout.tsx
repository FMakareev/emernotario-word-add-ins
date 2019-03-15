import * as React from 'react';
import CreateRoute from '../../modules/router/components/CreateRoute/CreateRoute';
import Header from '../Header/Header';
import Box from '../Box/Box';


export class Layout extends React.Component {
    render() {
        return (<React.Fragment>
            <Box mx={-5}>
                <Header/>
            </Box>
            <CreateRoute/>
        </React.Fragment>);
    }
}


export default Layout;