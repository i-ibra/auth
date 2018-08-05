import {LOGIN,REGISTER, SET_CURRENT_USER,SUCCESS_REGISTER} from '../typeActions/authType';
import {isEmpty ,actionCreator} from '../utils/helper';

const initialState = {
    isAuthenticated : false,
    isLoadingLogin : false,
    isLoadingRegister : false,
    message : null,
    user: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case actionCreator(LOGIN, 'req') : 
            return Object.assign({}, state ,
            {
                isLoadingLogin :true,
        })
        case actionCreator(LOGIN, 'res') : 
            return Object.assign({}, state ,
            {
                isLoadingLogin :false,
        })
        case actionCreator(REGISTER, 'req') : 
            return Object.assign({}, state ,
            {
                isLoadingRegister :true,
        })
        case actionCreator(REGISTER, 'res') : 
            return Object.assign({}, state ,
            {
                isLoadingRegister :false,
        })
        case SUCCESS_REGISTER: 
            return Object.assign({}, state ,
            {
                message : "You have successfully signed up ^_^ ",
        })
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default: 
            return state;
    }
}