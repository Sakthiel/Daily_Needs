import {makeStyles} from "@material-ui/core/styles";
export default makeStyles((theme)=>({
    addListModal: {
        position: "absolute",
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        outline: 0,
        fontWeight: "bold"
      },
      addListHeader: {
        display: "flex",
        justifyContent: "space-between",
        padding: 0,
        marginBottom: "8px",
        fontWeight: "bold"
      },
      modalText: {
        color: "#0063cc",
        fontWeight: "bold"
      },
      scheduleButton: {
        display: "flex",
        justifyContent: "flex-end"
      },
      scheduleSelect: {
        minWidth: '400px',
      }
}));