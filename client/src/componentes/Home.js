import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class Home extends Component {

    componentDidMount() {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                Welcome Home
            </div>
        );
    }
}

const mapStateToProps = ({auth}) =>({
      isAuthenticated : auth.isAuthenticated
})

export default connect(mapStateToProps, null)(withRouter(Home))
