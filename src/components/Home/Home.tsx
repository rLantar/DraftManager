import React from 'react';
import {makeStyles} from "@material-ui/core";
import {fullHeightFlex} from "../../styles/fullHeight";


const useStyles = makeStyles(
    (theme) => ({
        root: {
            ...fullHeightFlex,
            justifyContent: 'center',
            textAlign: 'center'
        },
        headerCard: {
            marginBottom: '10px',
        }
    }),
    {name: 'Home'},
);

function Home() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            Home
        </div>
    );
}

export default Home;
