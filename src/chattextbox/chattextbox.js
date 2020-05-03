import  React from 'react'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'
import TextField from'@material-ui/core/TextField'
import Send from '@material-ui/icons/Send'

class ChatTextBoxComponent extends React.Component {

    constructor(){
        super();
        this.state={
            chatText: ''
        }
    }

    render(){

        const { classes }= this.props

        return(
        <div className={classes.chatTextBoxContainer}>
            <TextField placeholder='Type your message...'
                className={classes.chatTextBox}
                onKeyUp={(e) => this.userTyping(e)}
                onChange={(e) => this.setValueInState(e)}
                id='chattextbox'
                autoFocus={true}
                onFocus={this.userClickedInput}
                value={this.state.chatText}>
            </TextField>
            <Send onClick={() => this.submitMessage()} className={classes.sendBtn}></Send>
        </div>
        )
    }

    userTyping=(e) => {
        e.keyCode === 13 ? this.submitMessage() : 
        this.setState({chatText: e.target.value})
    }

    setValueInState=(e) => {
        this.setState({chatText: e.target.value})
    }

    messageValid=(text) => text && text.replace(/\s/g, '').length

    submitMessage=() => {
        if(this.messageValid(this.state.chatText)){
            this.props.submitMessage(this.state.chatText);
            this.setState({chatText:''})
        }
    }

    userClickedInput=() => this.props.messageHasRead()
}

export default withStyles(styles)(ChatTextBoxComponent)