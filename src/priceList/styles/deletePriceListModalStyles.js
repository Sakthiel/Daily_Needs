import {makeStyles} from "@material-ui/core/styles";
export default makeStyles((theme)=>({
    deleteListModal: {
        position: "absolute",
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        outline: 0,
        fontWeight: "bold"
    },
    buttonContainer: {
        display: "flex",
        justifyContent : "flex-end"
    },
    typography: {
        marginTop : "10px",
        marginBottom: "20px",
    },
    button: {
        margin: "5px"
    }
}));