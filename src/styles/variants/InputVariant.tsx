export const InputVariant: any = (theme: any) => {
    return {
        default: {
            border: 'none',
            backgroundColor: theme.colors['color3'],
            color: theme.colors['color14'],
            borderRadius: '0',
            padding: '12px',
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 4px',
            '::placeholder': {
                color: theme.colors['color14'],
            }
        },
    };
};