import {createMuiTheme, Theme} from '@material-ui/core/styles';

import {deepPurple, teal} from '@material-ui/core/colors';

export const createTheme = (): Theme => {
    return createMuiTheme({
        typography: {},
        palette: {
            type: 'dark',
            primary: {
                main: deepPurple[500],
            },
            secondary: {
                main: teal[500]
            }
        },
        shape: {
            borderRadius: 8
        }
    });
};

export const theme = createTheme();
