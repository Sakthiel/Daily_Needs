import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme)=>({

    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
      },
      header: {
        backgroundColor: '#400080',
        color: 'white',
        padding: theme.spacing(4),
        textAlign: 'center',
        borderRadius: '8px',
      },
      introText: {
        marginTop: theme.spacing(4),
      },
      getStartedButton: {
        marginTop: theme.spacing(3),
        backgroundColor: '#FFA726',
        color: 'white',
        '&:hover': {
          backgroundColor: '#FF9800',
        },
      },
      image: {
        maxWidth: '100%',
        height: 'auto',
      },

}));