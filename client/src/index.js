import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Layout';
import store from './store/Store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import jwt_decode from 'jwt-decode';
import {setAuthToken} from './utils/helper';
import { setCurrentUser, logoutUser } from './actions/authAction';

if(localStorage.jwtToken && localStorage.jwtToken !== 'undefined') {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser(''));
        window.location.href = '/login'
    }
}

const theme = createMuiTheme({
    palette: {
        primary: { main: "#0077E2" },
        secondary: green,
    },
    status: {
        danger: 'orange',
        error: 'red'
    },
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme} >
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
document.getElementById('root'));