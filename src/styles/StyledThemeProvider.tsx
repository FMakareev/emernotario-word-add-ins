import * as React from 'react';
import {ThemeProvider} from 'styled-components';
// import { Provider as ThemeProvider } from 'rebass';

// /** Variants */
import { ButtonVariant } from './variants/buttonVariant';
import { ButtonSize } from './variants/buttonSize';
import {InputVariant} from './variants/InputVariant';

//
export const ColorPallet = {
    color0: '#ffffff',
    color1: '#e0e0e0',
    color2: '#AEAEAE',
    color3: '#FDF396',
    color4: '#4F4F4F',
    color5: '#E5E5E5',
    color6: '#BDBDBD',
    color7: '#000',
    color8: '#FFB74D',
    color9: '#FB8C00',
    color10: '#E65100',
    color11: '#E57373',
    color12: '#E53935',
    color13: '#B71C1C',
    color14: '#333333',
};

const Space = [
    0,
    2,
    4,
    8,
    12,
    16,
    18,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    68,
    72,
    76,
    80,
];

const Weight = [300, 500, 700];

const boxShadow = [
    '2px 4px 8px 0px rgba(138,138,138,0.5)',
    '2px 4px 8px 0px rgba(138,138,138,0.5)',
    '2px 2px 4px 0px rgba(0,127,175,1)',
];

const textAlign = ['left', 'center', 'right'];




export const StyledThemeProvider = ({children}) => (
    <ThemeProvider
        theme={{
            space: Space,
            fontSizes: Space,
            fontWeight: Weight,
            lineHeight: Space,
            textAlign: textAlign,
            boxShadow,
            borderRadius: Space,
            borderColor: ColorPallet,
            colors: ColorPallet,
            variant: {
                buttons: ButtonVariant({colors: ColorPallet}),
                buttonSize: ButtonSize,
                inputVariant: InputVariant({colors: ColorPallet})
            },
            fontFamily: {
                primary300: 'Museo Sans 300',
                primary500: 'Museo Sans 500',
                primary700: 'Museo Sans 700',
                secondary: 'Circe Regular',
                secondaryBold: 'Circe Bold',
            },
        }}>
        {children}
    </ThemeProvider>
);


export default StyledThemeProvider;
