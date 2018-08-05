import LoginForm  from './Login';
import {connect} from 'react-redux';
import {loginUser} from '../../../actions/authAction'

const mapStateToProps = ({auth , errors}) =>({
      isLoadingL : auth.isLoadingLogin,
      message : auth.message,
      isAuthenticated : auth.isAuthenticated,
      getLoginErrors : errors.errorsLogin
})
   
const mapDispatchToProps = (dispatch) =>({
      handleLogin : (option)=>{
       dispatch(loginUser(option))
      }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)