import NavBar  from './NavBar';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction'
import {withRouter} from 'react-router-dom'

const mapStateToProps = ({auth}) =>({
    auth : auth,
})
   
const mapDispatchToProps = (dispatch) =>({
      handleLogoutUser : (option)=>{
       dispatch(logoutUser(option))
      }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))