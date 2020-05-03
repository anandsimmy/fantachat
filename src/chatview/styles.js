const styles = theme => ({

    content: {
      height: 'calc(100vh - 122px)',
      overflow: 'auto',
      padding: '25px',
      boxSizing: 'border-box',
      overflowY: 'scroll',
      top: '57px',
      width: '100%',
      position: 'absolute'
    },
  
    userSent: {
      float: 'right',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '10px',
      backgroundColor: '#707BC4',
      color: 'white',
      width: '250px',
      borderRadius: '10px'
    },
  
    friendSent: {
      float: 'left',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '10px',
      backgroundColor: '#448A03',
      color: 'white',
      width: '250px',
      borderRadius: '10px'
    },
  
    chatHeader: {
      width: '100%',
      height: '56px',
      backgroundColor: '#2D8BB4',
      position: 'fixed',
      fontSize: '18px',
      color: 'white',
      paddingTop: '10px',
      textAlign: 'center',
      boxSizing: 'border-box',
      '&:hover': {
        backgroundColor: '#3299C6'
      }
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    appBar: {
      backgroundColor: '#707BC4',
      boxShadow: '0px 0px 2px 0px #000000'
    },
    backButton :{
      float: 'left',
      paddingLeft: '20px'
    },
    chatHeaderAlign: {
      position: 'absolute'
    }
  });
  
  export default styles;