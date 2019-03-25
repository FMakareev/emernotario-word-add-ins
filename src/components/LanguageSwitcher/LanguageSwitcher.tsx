import * as React from 'react';
import {withLocalize} from 'react-localize-redux';
import styled from 'styled-components';
import Box from '../Box/Box';

interface ILanguageSwitcherProps {
    [propName: string]: any,
}


const DropDownContainer = styled(Box)`
    position: relative;
    background-color: #fff;
    color: #4F4F4F;

    :hover .DropDownContent {
        opacity: 1;
        height: auto;
    }
`;

const DropDownContent = styled(Box)`
    position: absolute;
    top: 40px;
    right: 0;
    overflow: hidden;
    opacity: 0;
    height: 0;
    background-color: #fff;
    box-shadow: 0px 0 4px rgba(0, 0, 0, 0.25);
`;


const DropDownToggle = styled(Box)`
    cursor: pointer;
    padding: 12px;
    background-color: #fff;
    :hover {
        background-color: #e0e0e0;
    }
`;

const DropDownContentItem = styled(Box)`
    padding: 12px;
    cursor: pointer;
    color: #4F4F4F;
    :hover {
        background-color: #FDF396;
    }
    &.activeLanguage {
        background-color: #FDF396;
    }
`;


export const LanguageSwitcher: React.FC<ILanguageSwitcherProps> = ({languages, activeLanguage, setActiveLanguage}) => {
    console.log('LanguageSwitcher: ', languages, activeLanguage, setActiveLanguage);
    return (
        <DropDownContainer>
            <DropDownToggle>{activeLanguage.name}</DropDownToggle>
            <DropDownContent className={'DropDownContent'}>
                {languages.map((lang) => (
                    <DropDownContentItem className={activeLanguage.code === lang.code ? 'activeLanguage' : ''}
                                         onClick={() => setActiveLanguage(lang.code)} key={lang.code}>
                        {lang.name}
                    </DropDownContentItem>
                ))}
            </DropDownContent>
        </DropDownContainer>
    );
};

LanguageSwitcher.defaultProps = {
    languages: [],
    activeLanguage: {},
};


export default withLocalize(LanguageSwitcher);