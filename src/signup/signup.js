import React from 'react';
import { Link } from'react-router-dom';
import { FormControl, InputLabel, Input, Paper, withStyles, CssBaseline, Typography, Button, Backdrop, CircularProgress }from '@material-ui/core';
import styles from './styles';
import firebase from 'firebase';

class SignupComponent extends React.Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            passwordConfirmation:'',
            signupError:'',
            loader: false
        }
    }
    render(){
        const { classes }= this.props;
        return(
            <React.Fragment>
            {   
            this.state.loader ?   
            <Backdrop className={classes.backdrop} open={this.state.loader}>
                <CircularProgress color="inherit" />
            </Backdrop>    :    
            <main className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.paper}>
                <Typography className={classes.fantaHeader} component='h1' variant='h5'>Fanta Chat</Typography>
                <Typography className= {classes.typoCenter} component='h1' variant='h5'>Sign Up</Typography>
                <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-email-input' >Enter your Email</InputLabel>
                        <Input autoComplete='email' autoFocus id='signup-email-input'
                            onChange={(e) => this.userInputChange('email', e)}>
                        </Input>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-password-input'>Create your Password</InputLabel>
                        <Input type='password' id='signup-password-input' 
                            onChange={(e) => this.userInputChange('password', e)}>
                        </Input>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor='signup-password-confirmation-input'>Confirm your Password</InputLabel>
                        <Input type='password' id='signup-password-confirmation-input'
                            onChange={(e) => this.userInputChange('passwordConfirmation', e)}>
                        </Input>
                    </FormControl>
                    <Button style={{'&:hover': 'green'}} type='submit' fullWidth variant='outlined' color='primary' className={classes.submit}>
                        Submit
                    </Button>
                </form>
                {
                    this.state.signupError? 
                    <Typography component='h5' variant='h6' className={classes.errorText}>
                        {this.state.signupError}
                    </Typography>: null
                }
                <Typography component='h5' variant='h6' className={classes.hasAccountHeader}>
                    Already have an Account?
                </Typography>
                <Link className={classes.logInLink} to='/login'>Log In</Link>
            </Paper>
        </main>}
            </React.Fragment>
        )
    }

    formInputValid=() => this.state.password === this.state.passwordConfirmation;

    submitSignup= (e) =>{
        this.setState({loader: true})
        e.preventDefault();
        if(!this.formInputValid()){
            this.setState({
                signupError:'Passwords donot Match!',
                loader: false
            })
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authRes => {
                const userObj={
                    email: authRes.user.email
                }
                firebase.firestore().collection('users').doc(this.state.email).set(userObj)
                    .then(()=>{
                        this.props.history.push('./dashboard')  
                    })
                    .catch(dbError => {
                        this.setState({
                            signupError: 'Failed to add user to DB',
                            loader: false
                        })
                        console.log(dbError)
                    })
            })
            .catch(authError => {
                this.setState({
                    signupError: 'Signup Error, Try again',
                    loader: false
                })
                console.log(authError)
            })
    }
    userInputChange= (type, e) => {
        switch(type){
            case 'email':
                this.setState({email: e.target.value})
                break;
            case 'password':
                this.setState({password: e.target.value})
                break;
            case 'passwordConfirmation':
                this.setState({passwordConfirmation: e.target.value})
                break;
            default:
                break;
        }
    }
}

export default withStyles(styles)(SignupComponent);