import React from 'react'
import ChatListComponent from '../chatlist/chatlist'
import ChatViewComponent from '../chatview/chatview'
import ChatTextBoxComponent from '../chattextbox/chattextbox'
import NewChatComponent from '../newchat/newchat'
import EditDisplayNameComponent from '../displayname/displayname'
import { Button, withStyles, Backdrop, CircularProgress, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import styles from './styles'
import firebase from 'firebase'

class DashboardComponent extends React.Component {

    constructor(){
        super();
        this.state={
            selectedChatIndex: null,
            newChatFormVisible: false,
            allUsersInfo: [],
            email: null,
            chats: [],
            loader: true,
            nameChanged: false,
            editDisplayName: false
        }
    }

    render(){

        const { classes }= this.props

        return(
            <React.Fragment>
            {
            this.state.loader ?  
                <Backdrop className={classes.backdrop} open={this.state.loader} onClick={this.closeLoader}>
                    <CircularProgress color="inherit" />
                </Backdrop>   :   
                <React.Fragment>
                {   
                    this.state.newChatFormVisible ? 
                    <NewChatComponent 
                            goToChat={this.goToChat}
                            createChat={this.createChat}
                            allUsersInfo={this.state.allUsersInfo}
                            userEmail={this.state.email}
                            returnToDashBoard={this.returnToDashBoard}>
                    </NewChatComponent>   :  this.state.selectedChatIndex !== null ?

                    <React.Fragment>
                        <ChatViewComponent
                            userEmail={this.state.email}
                            chat={this.state.chats[this.state.selectedChatIndex]}
                            allUsersInfo={this.state.allUsersInfo}
                            returnToDashBoard={this.returnToDashBoard}
                            history={this.props.history}>
                        </ChatViewComponent>
                        <ChatTextBoxComponent 
                            submitMessage={this.submitMessage}
                            messageHasRead={this.messageHasRead}>
                        </ChatTextBoxComponent>
                    </React.Fragment>     :   this.state.editDisplayName ?
                    <EditDisplayNameComponent
                        returnToDashBoard={this.returnToDashBoard}
                        userEmail={this.state.email}
                        returnToDashBoardwithNameChangeSuccessful={this.returnToDashBoardwithNameChangeSuccessful}>
                    </EditDisplayNameComponent>    :  
                    <React.Fragment>
                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                            open={this.state.nameChanged} autoHideDuration={4000} onClose={this.handleSnackBarClose}>
                            <MuiAlert elevation={6} variant="filled" onClose={this.handleSnackBarClose} severity="success" >
                                User Name changed successfully
                            </MuiAlert>
                        </Snackbar>
                        <ChatListComponent 
                            history={this.props.history}
                            newChat={this.newChat}
                            selectChat={this.selectChat}
                            chats={this.state.chats}
                            userEmail={this.state.email} 
                            selectedChatIndex= {this.state.selectedChatIndex}
                            allUsersInfo={this.state.allUsersInfo}
                            logOut={this.logOut}
                            editDisplayName={this.editDisplayName}>
                        </ChatListComponent>
                        <div className={classes.bottomContainer}>
                        <Button onClick={this.logOut} className={classes.signOutBtn}>
                            Logout
                        </Button>
                        </div> 
                    </React.Fragment>  
                } 
                </React.Fragment>
            }
            </React.Fragment>
        )
    }

    editDisplayName=() => {
        this.setState({editDisplayName: true})
    }

    returnToDashBoard=() => {
        this.setState({
            newChatFormVisible: null,
            selectedChatIndex: null,
            editDisplayName: false
        })
    }

    returnToDashBoardwithNameChangeSuccessful=() => {
        this.setState({
            newChatFormVisible: null,
            selectedChatIndex: null,
            editDisplayName: false,
            nameChanged: true
        })
    }

    selectChat= async (index) => {
        await this.setState({
            newChatFormVisible: false,
            selectedChatIndex: index
        })
        this.messageHasRead()
    }

    handleSnackBarClose=()=> this.setState({nameChanged: false})

    closeLoader = () => {
        this.setState({loader: false});
      };
    openLoader = () => {
        this.setState({loader: true});
      };

    logOut=() => firebase.auth().signOut()
    
    //finding friend's email ie who is not currentuser
    friendEmail=() => this.state.chats[this.state.selectedChatIndex].users.filter(user => user !== this.state.email)[0]

    submitMessage=(chatMessage) => {
        const docKey= this.buildDocKey(this.friendEmail())
        firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    message: chatMessage,
                    sender: this.state.email,
                    timestamp: Date.now()
                }),
                receiverHasRead: false
            });
    }

    buildDocKey=(friendEmail) => [friendEmail, this.state.email].sort().join(':')

    messageHasRead=() => {
        const docKey= this.buildDocKey(this.friendEmail())
        if(this.chatLastMessageByFriend()){
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .update({
                    receiverHasRead: true
                })
        }
    }

    chatLastMessageByFriend=() => {
        const messages= this.state.chats[this.state.selectedChatIndex].messages
        const lastMessage= messages[messages.length - 1]
        return lastMessage.sender !== this.state.email
    }

    newChat=() => {
        this.setState({
            selectedChatIndex: null,
            newChatFormVisible: true
        })
    }

    goToChat= async (docKey, message) => {
        const usersInChat= docKey.split(':')
        //checking in which chat both users are included
        const chat= this.state.chats.find(chat => usersInChat.every(user => chat.users.includes(user)))
        this.selectChat(this.state.chats.indexOf(chat))
        this.submitMessage(message)
    }

    createChat= async (chatObj) => {
        const docKey= this.buildDocKey(chatObj.friendEmail)
        await firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .set({
                receiverHasRead: false,
                users: [this.state.email, chatObj.friendEmail],
                messages: [{
                    message: chatObj.message,
                    sender: this.state.email,
                    timestamp: Date.now()
                }]
            })
        const usersInChat= docKey.split(':')
        //checking in which chat both users are included
        const chat= this.state.chats.find(chat => usersInChat.every(user => chat.users.includes(user)))
        this.selectChat(this.state.chats.indexOf(chat))
    } 

    componentDidMount(){
        firebase.auth().onAuthStateChanged(async user => {
            if(!user){
                this.props.history.push('/login')
            }
            else{
                await this.setState({loader: true})
                await firebase.firestore().collection('chats')
                    .where('users', 'array-contains', user.email)
                    .onSnapshot(async res => {
                        const chats= res.docs.map(doc => doc.data())
                        await this.setState({
                            email: user.email,
                            chats: chats
                        })
                    })
                let allUsersInfo= await firebase
                            .firestore()
                            .collection('users')
                            .get()
                allUsersInfo= allUsersInfo.docs.map(user => user.data()) //retrieving all docs in 'users' collection
                this.setState({
                    loader: false,
                    allUsersInfo: allUsersInfo
                })
                await firebase
                            .firestore()
                            .collection('users')
                            .onSnapshot(res=> {
                                const allUsersInfo= res.docs.map(doc=>doc.data())
                                this.setState({
                                    loader: false,
                                    allUsersInfo: allUsersInfo
                                })
                            })
                }
        })
    } 

}

export default withStyles(styles)(DashboardComponent);