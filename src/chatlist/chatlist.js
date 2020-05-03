import React from 'react';
import styles, { StyledListItem } from './styles';
//material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { List, Drawer} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SpellcheckRoundedIcon from '@material-ui/icons/SpellcheckRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ListItem from '@material-ui/core/ListItem';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class ChatListComponent extends React.Component {

    constructor(){
        super()
        this.state={
            anchorEl:  null,
            drawer: true,
            left: false
        }
    }

    render(){

        const { classes, chats, allUsersInfo, userEmail }= this.props

            return(
                <main className={classes.root}> 
                    <div className={classes.rootNew}>
                        <AppBar position="static" className={classes.appBar}>
                            <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon onClick={()=>this.toggleDrawer(true)}> 
                                </MenuIcon>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                               Hi, {this.userName(allUsersInfo, userEmail)}
                            </Typography>
                            <span className={classes.dashBoardTitle}>
                                DASHBOARD
                            </span>
                            </Toolbar>
                        </AppBar>
                        <React.Fragment >
                        <Drawer anchor={'left'} open={this.state.left} onClose={()=>this.toggleDrawer(false)}>
                            <div className={classes.list} role="presentation">  
                            <List onClick={()=> this.toggleDrawer(false)}>
                                <ListItem button>
                                    <ListItemIcon >
                                    {this.userPhoto(allUsersInfo, userEmail) ? 
                                    <Avatar className={classes.avatarColor} alt='Friend' src={this.userPhoto(allUsersInfo, userEmail)} />
                                    : 
                                    <AccountCircleRoundedIcon className={`${classes.sideBarIcon} ${classes.sideBarIconSize}`}  />}
                                    </ListItemIcon>
                                    <ListItemText primary='My Profile' />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                {['Edit User Name', 'Logout'].map((text, index) => (
                                <React.Fragment>
                                <ListItem onClick={index === 0 ? this.editDisplayName : this.logOut } button key={text}>
                                        <ListItemIcon >
                                            {index === 0 ? <SpellcheckRoundedIcon className={classes.sideBarIcon}/> 
                                                : <ExitToAppRoundedIcon className={classes.sideBarIcon} />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                </ListItem>
                                    { index === 0 ? <Divider /> : null }
                                </React.Fragment>
                                ))}
                            </List>
                        </div> 
                        </Drawer>
                        </React.Fragment>
                    </div>
                    <Fab color="primary" aria-label="add" className={classes.fabIcon} onClick={this.newChat}>
                        <AddIcon />
                    </Fab>
                    { chats.length > 0 &&  
                    <List>
                        {chats.map((chat, index) => {
                            return (
                            <div key={index}>
                                <StyledListItem 
                                onClick={() => this.selectChat(index)}
                                align-item='flex-start'
                                className={classes.listItem}
                                selected={this.props.selectedChatIndex === index}>
                                <ListItemAvatar>
                                {
                                    chat.receiverHasRead === false && !this.userIsSender(chat) ? 
                                        <Badge badgeContent={this.badgeContentCalculator(chat)} color='secondary' classes={{ badge: classes.customBadge }} >
                                            <Avatar className={classes.avatarColor} alt='Friend' src={this.friendInfo(chat, allUsersInfo).photo}>
                                                {this.friendName(chat).split('')[0]}
                                            </Avatar>
                                        </Badge>    :      
                                    <Avatar className={classes.avatarColor} alt='Friend' src={this.friendInfo(chat, allUsersInfo).photo}>
                                        {this.friendName(chat).split('')[0]}
                                    </Avatar>
                                }
                                </ListItemAvatar>
                                <ListItemText primary = {this.friendInfo(chat, allUsersInfo).name} 
                                    secondary= {
                                    <React.Fragment>
                                        <Typography component='span'>
                                        {/*checking if messages has length greater than 27 or not */}
                                        {this.chatListSecondaryContent(chat)}
                                        </Typography>
                                    </React.Fragment>
                                    }
                                />
                                </StyledListItem>
                                <Divider></Divider>
                            </div>
                            )
                        })}
                    </List> }
                    
                </main>
            )
    }

    

    editDisplayName=() => {
        this.props.editDisplayName()
    }
    newChat= () => {
        this.props.newChat();
    }

    selectChat= (index) => {
        this.props.selectChat(index);
    }

    friendName=(chat) => {
        let friendName= chat.users.filter(user => user !== this.props.userEmail)[0]
        friendName= friendName.substring(0, friendName.indexOf('@'))  //extracting name
        friendName= friendName.charAt(0).toUpperCase()+friendName.slice(1) //capitalizing first letter
        return friendName
    }

    friendInfo= (chat, allUsersInfo) => {
        const friendName= chat.users.filter(user => user !== this.props.userEmail)[0]
        const friendNameObj= allUsersInfo.filter(user => friendName === user.email)[0]
        const displayName= friendNameObj && friendNameObj.displayName
        const photoURL= friendNameObj && friendNameObj.photoURL
        if(displayName){
            return {
                name: displayName,
                photo: photoURL
            }
        }
        else
            return {
                name: this.friendName(chat),
                photo: null
            }
    }
    userName= (allUsersInfo, userEmail) => {
        const userNameArray= allUsersInfo.filter(user => user.email === userEmail)  //getting username to check if displayname is present or not
        const userNameObj=userNameArray[0]
        const displayName= userNameObj && userNameObj.displayName
        const userName= userEmail.substring(0, userEmail.indexOf('@'))
        //checking username does have firstname and lastname, if it does have then return only firstname
        if(displayName){
            const name= displayName.indexOf(' ') !== -1 ? displayName.substring(0, displayName.indexOf(' ')) : displayName
            return name.charAt(0).toUpperCase()+name.slice(1,)
        }
            
        else
            //if display-name is not present, then return their name extracted from email
            return userName.charAt(0).toUpperCase()+userName.slice(1,)
    }

    userPhoto=(allUsersInfo, userEmail) => {
        const userInfo= allUsersInfo.filter(user => user.email === userEmail)[0]
        return userInfo.photoURL
    }
    
    userIsSender= (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail

    toggleDrawer = (condition) => {
        this.setState({left: condition});
      };

    logOut=() => this.props.logOut()

    badgeContentCalculator=(chat) => {
        const { userEmail }= this.props
        //finding last message by currentuser by reversing the array
        const usersLastMessage= chat.messages.slice(0).reverse().find(message => message.sender === userEmail)
        //finding index of last message
        let usersLastMessageIndex= chat.messages.slice(0).reverse().indexOf(usersLastMessage)
        usersLastMessageIndex= usersLastMessageIndex === -1 ? chat.messages.length : usersLastMessageIndex
        return usersLastMessageIndex
    }

    chatListSecondaryContent=(chat) => {
        const messages= chat.messages
        const chatListSecondaryContent= messages[messages.length - 1].message.length >= 27 ? 
                chat.messages[chat.messages.length -1].message.substring(0, 27)+'.....' :    
                    chat.messages[chat.messages.length -1].message
        return chatListSecondaryContent
    }

}

export default withStyles(styles)(ChatListComponent);