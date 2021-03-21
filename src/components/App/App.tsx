import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStore} from "../../@redux/reducers";
import {makeStyles} from "@material-ui/core";
import {fullHeightFlex} from "../../styles/fullHeight";
import LoginPage from "../LoginPage/LoginPage";
import Heroes from "../Heroes/Heroes";
import Header from "../Header/Header";


const useStyles = makeStyles(
    (theme) => ({
        root: {
            ...fullHeightFlex
        },
        content: {
            ...fullHeightFlex,
            padding: theme.spacing(3)
        }
    }),
    {name: 'DuckApp'},
);

function App() {

    const classes = useStyles();

    const user = useSelector((state: AppStore) => state.user);
    console.log(user);

    const getRoutes = () => {

        if (!user) {
            return <Switch>
                <Route component={LoginPage}/>
            </Switch>
        }


        return <Switch>
            <Route component={Heroes}/>
        </Switch>
    }

    return (
        <Router>
            <div className={classes.root}>
                <Header/>
                <div className={classes.content}>
                    {getRoutes()}
                </div>
            </div>
        </Router>
    );
}

export default App;
