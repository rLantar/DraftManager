import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {store} from "./@redux/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "react-query";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import {theme} from "./styles";

const queryClient = new QueryClient()

ReactDOM.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                </ThemeProvider>
        </QueryClientProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
