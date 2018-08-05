import {loginUserApi,registerUserApi} from '../apis/authApis'
import {actionCreator,setAuthToken} from '../utils/helper'
import { GET_ERRORS_LOGIN , GET_ERRORS_REGISTER , SET_CURRENT_USER,LOGIN,REGISTER,SUCCESS_REGISTER } from '../typeActions/authType'
import jwt_decode from 'jwt-decode';



export function loginUser(history){
    return (dispatch,getState) => {

            dispatch(sendReqLogin())

            loginUserApi(getState().form.loginForm.values)
            .then((res) => {

                dispatch(recieveResLogin());

                const { token , success , errors } = res.data;

                    if(success){
                        localStorage.setItem('jwtToken', token);
                        setAuthToken(token);
                        const decoded = jwt_decode(token);
                        dispatch(setCurrentUser(decoded));
                        dispatch(getLoginErrors(null));
                    }else{
                        dispatch(getLoginErrors(errors));
                    }
                
            }).catch((errors) => {
                //console.log(JSON.stringify(errors));
                //dispatch(getErrors(errors));
            });
          
    }
}

export function registerUser(history){
    return (dispatch,getState)=>{
        
            dispatch(sendReqRegister())

            registerUserApi(getState().form.registerForm.values)
            .then((res) => {

                dispatch(recieveResRegister());

                const { success , errors } = res.data;

                if(success){
                    dispatch(registerSuccess());
                    dispatch(getLoginErrors(null));
                    history.push('/login');
                }else{
                    dispatch(getRegisterErrors(errors));
                }
                    
                
            }).catch((err) => {
                //dispatch(getErrors(err))
            });
          
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    if(history){ history.push('/login');}

}

/*** Login */
function sendReqLogin(){
    return {
        type : actionCreator(LOGIN, 'req')
    }
}

function recieveResLogin(){
    return {
        type : actionCreator(LOGIN, 'res')
    }
}

/*** Register */
function sendReqRegister(){
    return {
        type : actionCreator(REGISTER, 'req')
    }
}

function recieveResRegister(data){
    return {
        type : actionCreator(REGISTER, 'res'),
        data
    }
}
/*** Message */
function registerSuccess(){
    return {
        type : SUCCESS_REGISTER
    }
}
/*** Errors */
function getLoginErrors(data){
    return {
        type : GET_ERRORS_LOGIN,
        payload : data
    }
}
function getRegisterErrors(data){
    return {
        type : GET_ERRORS_REGISTER,
        payload : data
    }
}
