import RegisterForm  from './Register';
import {connect} from 'react-redux';
import {registerUser} from '../../../actions/authAction'

const mapStateToProps = ({auth , errors}) =>({
    isLoadingR : auth.isLoadingRegister,
    isAuthenticated : auth.isAuthenticated,
    getRegisterErrors : errors.errorsRegister
})
   
const mapDispatchToProps = (dispatch) =>({
        handleRegister : (option)=>{
            dispatch(registerUser(option))
        }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)