import React from 'react';
import {AppBar, Avatar, Button, Container, Link, makeStyles, SvgIcon, Toolbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStore} from "../../@redux/reducers";
import {logout} from "../../@redux/actions";


const useStyles = makeStyles(
    (theme) => {
        return ({
            fill: {
                flex: 1
            },
            userContainer: {
                display: "flex",
                alignItems: "center",
            },
            user: {
                display: "flex",
                flexDirection: "column",
                marginRight: theme.spacing(2),
                alignItems: "flex-end",
            },
            disconnect: {
                fontSize: 12,
                cursor: 'pointer'
            },
            avatar: {
                background: theme.palette.secondary.light
            }
        });
    },
    {name: 'Header'},
);

const Header = () => {

    const classes = useStyles();
    const user = useSelector((state: AppStore) => state.user);
    const dispatch = useDispatch();

    const disconnect = () => {
        dispatch(logout())
    }

    if (!user) {
        return null;
    }

    return (

        <AppBar position="sticky">
            <Container maxWidth={'lg'} disableGutters>
                <Toolbar>

                    <div className={classes.fill}/>

                    <div className={classes.userContainer}>
                        <div className={classes.user}>
                            <Link
                                color={'textPrimary'}
                                className={classes.disconnect}
                                variant="body2"
                                onClick={disconnect}
                            >
                                Disconnect
                            </Link>
                        </div>
                        <Avatar alt="Avatar" variant={'rounded'} classes={{colorDefault: classes.avatar}}>
                            U
                        </Avatar>
                    </div>
                </Toolbar>

            </Container>
        </AppBar>
    );
}

export default Header;
