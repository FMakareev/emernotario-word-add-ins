import * as React from 'react';
import Flex from '../Flex/Flex';
// import Box from '../Box/Box';
import Link from '../../modules/router/components/Link/Link';
import styled from 'styled-components';
import {Translate} from 'react-localize-redux';

const LinkStyled = styled(Link)`
    display: block;
    cursor: pointer;
    padding: 12px;
    background-color: #fff;
    color: #4F4F4F;
    text-decoration: none;
    :hover {
        background-color: #FDF396;
    }
    &.activeLink {
        background-color: #FDF396;
        box-shadow: 0px 0 12px rgba(0, 0, 0, 0.25);
        position: relative;
    }
`;

export class Navigation extends React.Component {

    render() {
        return (<Flex justifyContent={'center'} p={5} backgroundColor={'color4'}>
            <Translate>
                {
                    ({translate}) => <>
                        <LinkStyled to={'/'}>
                            {translate('navigation.notaryData')}
                        </LinkStyled>
                        <LinkStyled to={'/notarization'}>
                            {translate('navigation.notarization')}
                        </LinkStyled>
                        <LinkStyled to={'/notarization-result'}>
                            {translate('navigation.result')}
                        </LinkStyled>
                    </>
                }
            </Translate>
        </Flex>);
    }

}

export default Navigation;