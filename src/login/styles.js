import '../fonts.css'

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing() * 3,
      marginRight: theme.spacing() * 3,
      [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    typoCenter: {
      marginTop: theme.spacing(3),
      color: '#707BC4',
      fontWeight: 500
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: '#D5DFE2'
    },
    paper: {
      marginTop: theme.spacing() * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing() * 3,
    },
    googleLogin: {
      marginTop: theme.spacing() * 3,
      height: '34px',
      color: '#3f51b5',
      fontWeight: 500,
      display: 'flex',
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      cursor: 'pointer',
      border: '1px solid rgba(63, 81, 181, 0.5)',
      borderRadius:'5px',
      '&:hover':{
        backgroundColor: '#F3F7F9'
      }
    },
    googleImage: {
      marginRight: '10px'
    },
    noAccountHeader: {
      width: '100%',
      color: '#707BC4',
      fontWeight: 500,
      marginTop: theme.spacing() * 2
    },
    info:{
      width: '100%',color: '#448A03',
      fontWeight: 500,
      marginTop: theme.spacing() * 2
    },
    signUpLink: {
      width: '100%',
      textDecoration: 'none',
      color: '#707BC4',
      fontWeight: 600
    },
    fantaHeader :{
      textAlign: 'center',
      color: '#448A03',
      fontSize: '50px',
      fontWeight: 600,
      fontFamily: 'Kaushan Script, cursive'
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      fontWeight: 500,
      marginTop: theme.spacing() * 2
    }
  });
  
  export default styles;