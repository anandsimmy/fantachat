const styles = theme => ({
    main: {
      width: 'auto',
      paddingLeft: '20px'
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: '#D5DFE2'
    },
    typoCenter: {
      textAlign: 'center',
      color: '#707BC4',
      fontWeight: 600
    },
    dropdownSelect: {
      marginTop: theme.spacing(2),
      width: '100%'
    },
    paper: {
      padding:'35px',
      position: 'absolute',
      alignItems: 'center',
      width: '90%',
      top: '60px',
      justifyContent: 'center'
    },
    formcontrol: {
      marginTop: theme.spacing() * 5,
      minWidth: 120,
    },
    form: {
      width: '100%'
    },
    submit: {
      marginTop: theme.spacing() * 5
    },
    cancelButton: {
      marginTop: theme.spacing() * 3,
      color: 'red'
    },
    errorText: {
      color: 'red',
      textAlign: 'center'
    }
  });
  
  export default styles;