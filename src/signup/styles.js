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
    paper: {
      marginTop: theme.spacing() * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor: '#D5DFE2'
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing() * 3,
    },
    hasAccountHeader: {
      marginTop: theme.spacing() * 2,
      width: '100%',
      color: '#448A03'
    },
    logInLink: {
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