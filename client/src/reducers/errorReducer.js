import { GET_ERRORS_LOGIN , GET_ERRORS_REGISTER} from '../typeActions/authType';

const initialState = {
    errorsLogin : null,
    errorsRegister : null,
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS_LOGIN:
            return {
                errorsLogin : action.payload
            }
        case GET_ERRORS_REGISTER:
            return {
                errorsRegister : action.payload
            }
        default: 
            return state;
    }
}