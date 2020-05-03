import React from 'react'
import styles from './styles'
import { withStyles, CssBaseline, Paper, TextField, Typography, Button, Backdrop, CircularProgress, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import firebase from 'firebase'

class EditDisplayNameComponent extends React.Component {

    constructor(){
        super()
        this.state={
            loader: false,
            updatedName: null 
        }
    }

    render(){
    
        const { classes, userEmail }= this.props

        return(
        <React.Fragment>
            {   
                this.state.loader   ?   
                <Backdrop className={classes.backdrop} open={this.state.loader}>
                    <CircularProgress color="inherit" />
                </Backdrop>    :    
                <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}open={this.state.nameChanged} autoHideDuration={6000} onClose={this.handleClose}>
                        <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity="success" >
                            User Name changed succesfully
                        </MuiAlert>
                    </Snackbar>
                    <Typography className={classes.typoCenter} component='h1' variant='h5'>Edit User Name</Typography>
                    <form onSubmit={()=>this.updateName(userEmail)}>
                        <TextField fullWidth className={classes.formcontrol}
                            required
                            id='standard-helperText'
                            label='Enter New Username'
                            value={this.state.updatedName}
                            onChange= {(e)=>this.userTyping(e)}
                            helperText="*This name is what your friends see" >
                        </TextField>
                        <Button fullWidth
                            className={classes.submit}
                            variant='outlined'
                            color='primary'
                            type='submit'>
                            Update
                        </Button>
                        <Button fullWidth
                            className={classes.cancelButton}
                            variant='outlined'
                            color='secondary'
                            onClick={this.returnToDashBoard}>
                            Cancel
                        </Button>
                    </form>
                </Paper>
            </main>}
        </React.Fragment>
        )

    }

    updateName= async (userEmail) => {
        this.setState({loader : true})
        await firebase
            .firestore()
            .collection('users')
            .doc(userEmail)
            .update({
                displayName: this.state.updatedName
            })
        this.setState({
            loader: false
        })
        this.props.returnToDashBoardwithNameChangeSuccessful()
    }

    returnToDashBoard=() => this.props.returnToDashBoard()

    userTyping=(e)=> this.setState({updatedName: e.target.value})

}

export default withStyles(styles)(EditDisplayNameComponent)