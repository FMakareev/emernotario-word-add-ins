const CreateElementState = (style: any) => ({
    ':hover': {
        ...style,
    },
    ':focus': {
        ...style,
    },
    ':active': {
        ...style,
    },
    'active': {
        ...style,
    },
});

export enum ButtonEnum {
    default = 'default',
    primary = 'primary',
    secondary = 'secondary',
    error = 'error',
}

export interface IButton {
    default: any,
    primary: any,
    secondary: any,
    error: any,
}

export interface IButtonVariant {
    flat: IButton,
    raised: IButton,
}


export const ButtonVariant = (theme: any): IButtonVariant => {
    return {
        flat: {
            'default': {
                color: theme.colors['color4'],
                backgroundColor: 'transparent',
                ...CreateElementState({
                    textDecoration: 'none',
                    color: theme.colors['color3'],
                    '> svg': {
                        fill: theme.colors['color3'],
                    }
                }),
            },
            'primary': {
                color: theme.colors['color3'],
                backgroundColor: 'transparent',
                ...CreateElementState({
                    textDecoration: 'none',
                    color: theme.colors['color0'],
                    '> svg': {
                        fill: theme.colors['color0'],
                    }
                }),
            },
            'secondary': {
                color: theme.colors['color6'],
                backgroundColor: 'transparent',

                ...CreateElementState({
                    textDecoration: 'none',
                    backgroundColor: 'rgba(225, 0, 80, 0.12)',
                }),
            },
            'error': {
                color: theme.colors['color12'],
                backgroundColor: 'transparent',
                ...CreateElementState({
                    textDecoration: 'none',
                    backgroundColor: 'rgba(225, 0, 80, 0.12)',
                }),
            },
        },
        raised: {
            'default': {
                color: theme.colors['color3'],
                backgroundColor: 'transparent',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 4px',
                ...CreateElementState({
                    textDecoration: 'none',
                    backgroundColor: theme.colors['color3'],
                    color: theme.colors['color2'],
                    '> svg': {
                        fill: theme.colors['color2'],
                    }
                }),
            },
            'primary': {
                color: theme.colors['color4'],
                backgroundColor: theme.colors['color3'],
                borderRadius: '5%',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 4px',
                ...CreateElementState({
                    textDecoration: 'none',
                    color: theme.colors['color4'],
                    backgroundColor: theme.colors['color0'],
                }),
            },
            'secondary': {
                color: theme.colors['color3'],
                backgroundColor: theme.colors['color4'],
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 4px',
                ...CreateElementState({
                    textDecoration: 'none',
                    color: theme.colors['color4'],
                    backgroundColor: theme.colors['color3'],
                    '> svg': {
                        fill: theme.colors['color4'],
                    }
                }),
            },
            'error': {
                color: theme.colors['color1'],
                backgroundColor: theme.colors['color12'],
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 4px',
                ...CreateElementState({
                    textDecoration: 'none',
                    opacity: 0.5
                }),
            },
        },
    };
};