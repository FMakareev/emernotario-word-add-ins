import * as React from 'react';
import Flex from '../Flex/Flex';


export const Header = () => {
    return (<Flex  justifyContent={'center'} p={5} backgroundColor={'color4'}>
        <img width={'200px'} height={'45px'} src={'assets/icon_logo.svg'}/>
    </Flex>);
};

export default Header;