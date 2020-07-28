import { ListItem, styled } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
export const StyledListItem = styled(ListItem)({
  "&.Mui-selected": {
    backgroundColor: "#7A86D4"
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#838FE1"
  }
});

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '100%',
      boxShadow: '0px 0px 2px black'
    },
    rootNew: {
      flexGrow: 1
    },
    sideBarIcon: {
      color: '#707BC4'
    },
    sideBarIconSize:{
      height: '40px', 
      width: '40px'
    },
    sideDrawer: {
      backgroundCcolor: 'black'
    },
    list: {
      width: 250,
    },
    appBar: {
      backgroundColor: '#707BC4',
      boxShadow: '0px 0px 2px 0px #000000'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    fabIcon: {
      position: 'fixed',
      bottom: '85px',
      right: '50px',
      backgroundColor: '#448A03',
      zIndex: 1
    },
    title: {
      flexGrow: 1,
      left: '5px'
    },
    customBadge: {
      backgroundColor: "#56AE05"
    },
    dashBoardTitle: {
      right: '2px',
      fontWeight: 500
    },
    listItem: {
      '&:hover':{
        backgroundColor: '#C0C7F3'
      },
      cursor: 'pointer'
    },
    avatarColor: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
    },
    accountHeader: {
      float: 'left',
      height: '22px',
      color: 'white',
      marginLeft: '10px'
    },
    nameDisplay:{
      marginLeft: '63px'
    },
    userHeader: {
      height: '46px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#2D8BB4',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: '#3299C6'
      }
    },
    newChatBtn: {
      height: '46px',
      backgroundColor: '#727DC8',
      borderRadius: '0px',
      boxShadow: '10px 0px white',
      color: 'white',
      '&:hover': {
        backgroundColor: '#7B87D6'
      }
    },
    unreadMessage: {
    top: '20px',
    color: '#448A03',
    right: '41px',
    width: '30px',
    height: '30px',
    position: 'absolute'
    }
  });
  
  export default styles;