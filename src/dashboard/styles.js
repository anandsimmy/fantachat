const styles = theme => ({
    signOutBtn: {
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      width: '100%',
      backgroundColor: '#707BC4',
      '&:hover': {
        backgroundColor: '#3299C6'
      },
      height: '40px',
      boxShadow: 'none',
      color: 'white'
    },
    bottomContainer: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    flexRight:{
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: '#D5DFE2'
    }
  });
  
  export default styles;