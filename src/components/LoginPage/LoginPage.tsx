import React from 'react';
import Login from "../Login/Login";
import {makeStyles} from "@material-ui/core";
import {fullHeightFlex} from "../../styles/fullHeight";


const useStyles = makeStyles(
    (theme) => ({
        root: {
            ...fullHeightFlex,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }),
    {name: 'LoginPage'},
);

function LoginPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Login/>
        </div>
    );
}

export default LoginPage;
