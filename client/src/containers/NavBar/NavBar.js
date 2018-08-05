import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class ButtonAppBar extends Component {

  handleBtnLogout = () => {
    this.props.handleLogoutUser(this.props.history);
  }

    render() {
      const { classes } = this.props;
      const {isAuthenticated,user} = this.props.auth;
      let notConnected = (<div className="navAuth"><Link to="/register"> <Button color="inherit">Register</Button> </Link>
                                  <Link to="/login"> <Button  color="inherit">Login</Button> </Link></div>)
      let connected = (<Button color="inherit" onClick={() => { this.handleBtnLogout() } }>Logout</Button>)

        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Welcome {isAuthenticated ? user.name : null}
                </Typography>

                  {isAuthenticated ? connected : notConnected}

              </Toolbar>
            </AppBar>
          </div>
        );
    
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);