const styles = theme => ({

    sendBtn: {
      color: '#8089C4',
      cursor: 'pointer',
      '&:hover': {
        color: '#8D95C4'
      },
      paddingLeft: '1px'
    },
  
    chatTextBoxContainer: {
      backgroundColor: 'white',
      position: 'absolute',
      bottom: '0px',
      padding: '7px 0px 15px 22px',
      boxSizing: 'border-box',
      overflow: 'auto',
      width: '95% '
    },
  
    chatTextBox: {
      width: 'calc(100% - 25px)'
    }
  
  });
  
  export default styles;