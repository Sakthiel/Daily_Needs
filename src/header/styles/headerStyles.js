import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    headerLink: {
        color: theme.palette.primary.contrastText,
        display: 'flex',
        justifyContent: "flex-start",
        textDecoration: 'none'
    },
    toolbar: {
        display: 'flex',
        justifyContent: "space-between",
        padding: "0 4em"
    },
    appBar : {
        display:'flex',
        backgroundColor: 'purple'
    },
    headerLogo: {
        marginLeft: '0.15em'
    },
    logoutLink: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        marginLeft: "15px"
    }
})
);