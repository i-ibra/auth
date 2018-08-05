import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const validate = values => {
    const errors = {}
    const requiredFields = [
      'email',
      'password'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'ce champ est obligatoire'
      }
    })
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors
  }

  const InputTextPass = ({ input,label, meta: { touched, error }, ...custom },) =>
   (<FormControl error={error && touched} fullWidth >
            <TextField
                label={label}
                error={error && touched}
                {...input}
                {...custom} />
            {error && touched && <FormHelperText id="name-error-text">{error}</FormHelperText>}
    </FormControl>)
    
  const InputText = ({ input, label, meta: { touched, error }, ...custom },) =>
   (<FormControl error={error && touched} fullWidth >
            <TextField
                label={label}
                error={error && touched}
                {...input}
                {...custom} />
            {error && touched && <FormHelperText id="name-error-text">{error}</FormHelperText>}
    </FormControl>)

class RegisterForm extends Component {

    componentWillReceiveProps(next) {
        if(next.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    componentDidMount() {
        if(this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    handleSubmitRegister = () => {
        this.props.handleRegister(this.props.history);
    }

    render(){
        return(
            <div className="registerForm auth">
                <Grid container>

                    <Grid item md={4} sm={2}/>
                    <Grid item md={4} sm={8} xs={12}>

                        <Paper className="PaperAuth">
                            <form onSubmit={ this.props.handleSubmit(() =>  this.handleSubmitRegister()) } >
                                <legend>Sign up</legend>

                            {this.props.getRegisterErrors ? <Paper><h3 className="alert-error">{this.props.getRegisterErrors}</h3></Paper> : null}

                            <Field type='text' component={InputText} label="Name" name="name"/>

                            <Field type="email" component={InputText} label="Email" name="email"/>

                            <Field type='password' component={InputTextPass} label="Password" name="password"/>

                            <Field type='password' component={InputTextPass} label="Confirm Password" name="password_confirm"/>

                                <Grid item xs={12} className="formBtn">
                                    <Button type="submit" variant="raised" size="large" color="primary">
                                        { this.props.isLoadingR ? <CircularProgress thickness={4} style={{color: '#fff'}}/> : 'Register'}
                                    </Button>
                                </Grid>
                            </form>
                        </Paper>

                    </Grid>
                    <Grid item md={4} sm={2}/>

                </Grid>
            </div>
        )
    }
}


export default reduxForm({
    form: 'registerForm', // a unique identifier for this form
    validate
  })(RegisterForm)