import React from 'react';
import styles from './styles';
import { Link } from'react-router-dom';
import { FormControl, InputLabel, Input, Paper, withStyles, CssBaseline, Typography, Button, Backdrop, CircularProgress  }from '@material-ui/core';
import firebase from 'firebase';

class LoginComponent extends React.Component {

    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            loginError:'',
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
                </Backdrop>    
                :   
                <main className={classes.main}> 
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                   <Typography className={classes.fantaHeader} component='h1' variant='h5'>Fanta Chat</Typography>
                   <Typography className={classes.typoCenter} component='h2' variant='h5'>Log In</Typography>
                   <form onSubmit={(e) => this.submitInput(e)}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='user-input-email'>Enter your Email</InputLabel>
                            <Input autoComplete='email' autoFocus id='user-input-email' onChange={(e) => this.userInputChange('email', e)}>
                            </Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='user-input-password'>Enter your Password</InputLabel>
                            <Input type='password' id='user-input=password' onChange={(e) => this.userInputChange('password', e)}></Input>
                        </FormControl>
                        <Button type='submit' color='primary' fullWidth variant='outlined' className={classes.submit}>
                            Log In
                        </Button>
                        <div onClick={this.googleLogin} className={classes.googleLogin} tabIndex={0}>
                            <img height='20' width='20' alt='G' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' 
                                className={classes.googleImage}/>
                            GOOGLE SIGN IN
                        </div>
                    </form>
                    {
                        this.state.loginError?
                        <Typography component='h5' variant='h6' className={classes.errorText}>
                            {this.state.loginError}
                        </Typography>:
                        null
                    }
                    <Typography component='h5' variant='h6' className={classes.noAccountHeader}>
                        Dont have an Account?
                    </Typography>
                    <Link to='/signup' className={classes.signUpLink}>Sign Up</Link>
                    <Typography component='h5' variant='h7' className={classes.info}>
                        *click 'Add to Home screen' in browser options to use as mobile application
                    </Typography>
                </Paper>
                </main>
                }
            </React.Fragment>
        )
    }

    submitInput=(e) => {
        e.preventDefault()
        this.setState({loader: true})
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.props.history.push('/dashboard')
                })
                .catch((error) => {
                    this.setState({
                        loginError: 'Authentication Error, Try again',
                        loader: false
                })
                    console.log(error)
                }
                )
    }

    closeLoader = () => {
        this.setState({loader: false});
      };
    openLoader = () => {
        this.setState({loader: true});
      };

    googleLogin=() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.setState({loader: true})
        firebase.auth().signInWithPopup(provider).then((result) => {
            const userObj={
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            }
            firebase.firestore().collection('users').doc(result.user.email).set(userObj)
                .then(()=>{
                    this.props.history.push('./dashboard')
                })
                .catch(dbError => {
                    this.setState({
                        loginError: 'Failed to add user to DB',
                        loader: false
                    })
                    console.log(dbError)
                })
          }).catch((error) => {
                this.setState({
                    loginError: 'Authentication Error',
                    loader: false
            })
            console.log(error)
          });
    }

    userInputChange(type, e){
        switch(type){
            case 'email':
                this.setState({email:e.target.value});
                break;
            case 'password':
                this.setState({password:e.target.value});
                break;
            default:
                break;
        }
    }

}

export default withStyles(styles)(LoginComponent);