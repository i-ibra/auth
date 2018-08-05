import axios from 'axios';

export function actionCreator(action, type)
{
    switch(type){
        case 'req' : return  action + '_REQUEST';
        case 'res' : return action + '_SUCCESS';
        case 'error' : return action + '_FAILED';
        default  : return action + '_FAILED';
    }
}

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

export const setAuthToken = token => {
    if(token && token !== 'undefined') {
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}