import * as React from 'react';
import Flex from '../Flex/Flex';
import Box from '../Box/Box';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';


export const Header = () => {
    return (<Flex  justifyContent={'space-between'} p={5} backgroundColor={'color4'}>
        <Box>
            <img height={'40px'} src={'assets/icon_logo.svg'}/>
        </Box>
        <Box>
            <LanguageSwitcher/>
        </Box>
    </Flex>);
};

export default Header;