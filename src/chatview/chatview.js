import React from 'react'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

class ChatViewComponent extends React.Component {

    componentDidMount(){
        const container= document.getElementById('chatview-container')
        if(container){
            container.scrollTo(0, container.scrollHeight)
        }

        window.addEventListener('popstate', () => {
            console.log('popstate activated')
            this.props.history.push('/dashboard')
            this.props.returnToDashBoard()
        })
    }
    componentDidUpdate(){
        const container= document.getElementById('chatview-container')
        if(container){
            container.scrollTo(0, container.scrollHeight)
        }
    }
    componentWillUnmount(){
        window.removeEventListener('popstate',()=> {
            console.log('popstate de-activated')
            this.props.history.push('/dashboard')
            this.props.returnToDashBoard()
        })
    }

    render () {

        const { classes, chat, userEmail, allUsersInfo }= this.props

        return (
            <div>
            {
                chat && chat.messages && chat.messages.length > 0 && 
                <React.Fragment>
                    <AppBar position="static" className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <ArrowBackRoundedIcon onClick={this.returnToDashBoard} />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                {this.friendInfo(chat, allUsersInfo)}
                                </Typography>
                            </Toolbar>
                    </AppBar>
                <main id='chatview-container' className={classes.content}>
                    {
                        chat.messages.map((messageObj, index) => {
                        return(
                        <div key={index} className={userEmail === messageObj.sender ? classes.userSent : classes.friendSent}>
                            {messageObj.message}
                        </div>
                        )})
                    }
                </main>
                </React.Fragment>
            }
            </div>
        )
    }

    //calculating how much from left name should be displayed..needs to be removed in future
    styleComputing= (chat, allUsersInfo)=>{
        const friendName= this.friendInfo(chat, allUsersInfo);
        const left= 50 - Math.round((friendName.length*5)/4) 
        return { left: left+'%' }
    }

    friendName=(chat) => {
        let friendName= chat.users.filter(user => user !== this.props.userEmail)[0]
        friendName= friendName.substring(0, friendName.indexOf('@'))  //extract name
        friendName= friendName.charAt(0).toUpperCase()+friendName.slice(1) //capitalizing first letter
        return friendName
    }
    friendInfo= (chat, allUsersInfo) => {
        const friendName= chat.users.filter(user => user !== this.props.userEmail)[0]
        const friendNameObj= allUsersInfo.filter(user => friendName === user.email)[0]
        const displayName= friendNameObj && friendNameObj.displayName
        if(displayName)
            return displayName
        else
            return this.friendName(chat)
    }

    returnToDashBoard= () => this.props.returnToDashBoard()
}

export default withStyles(styles)(ChatViewComponent);