import React from 'react'
import styles from './styles'
import { withStyles, CssBaseline, Paper, Typography, FormControl, InputLabel, Input, Button, Select, Backdrop, CircularProgress } from '@material-ui/core'
import firebase from 'firebase'

class NewChatComponent extends React.Component {

    constructor(){
        super()
        this.state={
            username: null,
            message: null,
            noUser: false,
            loader: false  
        }
    }

    render(){
    
        const { classes, allUsersInfo }= this.props

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
                    <Typography className={classes.typoCenter} component='h1' variant='h5'>NEW CHAT</Typography>
                    <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
                        <FormControl required className={`${classes.formControl} ${classes.dropdownSelect}`}>
                            <InputLabel htmlFor="friend-email">Find your Friends</InputLabel>
                            <Select
                            autoFocus
                            native
                            value={this.state.username}
                            onChange={(e) => this.handleChange('username', e)}
                            name="username"
                            >
                            {
                                this.usersNameExtractor(allUsersInfo).map((userObj,index) => {
                                const retVal= 
                                    index === 0 ? 
                                        <React.Fragment>
                                            <option key={index} aria-label="None" value="" />
                                            <option key={index + 1} value={userObj.email}>{userObj.name}</option>
                                        </React.Fragment> 
                                    : 
                                        <option key={index + 1} value={userObj.email}>{userObj.name}</option>
                                return retVal
                                }
                            )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={classes.formcontrol}>
                            <InputLabel htmlFor='new-chat-message'>Enter your First Message</InputLabel>
                            <Input required
                                onChange={(e) => this.handleChange('message', e)}
                                id='new-chat-message'>
                            </Input>
                        </FormControl>
                        <Button fullWidth
                            className={classes.submit}
                            variant='outlined'
                            color='primary'
                            type='submit'>
                            Start Chat
                        </Button>
                        <Button fullWidth
                            className={classes.cancelButton}
                            variant='outlined'
                            color='secondary'
                            onClick={this.cancelButton}>
                            Cancel
                        </Button>
                    </form>
                </Paper>
            </main>}
        </React.Fragment>
        )

    }

    handleChange=(type, e) => {
        switch(type){
            case 'username':
                this.setState({username: e.target.value})
                break
            case 'message':
                this.setState({message: e.target.value})
                break
            default:
                break
        }
    }

    submitNewChat= async (e) => {
        e.preventDefault()
        this.setState({loader: true})
        if(await this.userExists()){
            await this.chatExists() ? this.goToChat() : this.createChat()
        }
        else{
            this.setState({
                noUser: true
            })
        }
    }

    createChat= () => this.props.createChat({
        friendEmail: this.state.username,
        message: this.state.message
    })

    cancelButton= async () =>  {
        await this.setState({loader: true})
        this.props.returnToDashBoard()
    }

    goToChat= () => this.props.goToChat(this.buildDocKey(), this.state.message)
    
    buildDocKey= () => [firebase.auth().currentUser.email, this.state.username].sort().join(':')

    chatExists= async () => {
        const docKey= this.buildDocKey()
        const chat = await firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .get()
        return chat.exists
    }

    userExists= async () => {
        const userSnapshot= await firebase
            .firestore()
            .collection('users')
            .get()
        const userExists= userSnapshot.docs.map(doc => doc.data().email).includes(this.state.username)
        return userExists
    }

    //extract name and email and put it into an array of objects
    usersNameExtractor=(allUsersInfo) => {
        //filtering out usernames who are not currentuser
        let userNames= allUsersInfo.filter(userObj => userObj.email !== this.props.userEmail)
        userNames= userNames.map(userObj => {
            if(userObj.displayName){
                return {
                    email: userObj.email,
                    name: userObj.displayName 
                } 
            }else{
                let userName= userObj.email.substring(0, userObj.email.indexOf('@'))
                userName= userName.charAt(0).toUpperCase()+userName.slice(1,)
                return {
                    email: userObj.email,
                    name: userName 
                }
            }
        })
        return userNames
    }
}

export default withStyles(styles)(NewChatComponent)