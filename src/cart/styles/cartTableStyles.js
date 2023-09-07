import {makeStyles} from "@material-ui/core/styles";
export default makeStyles((theme)=>({
    containerButton : {
        display : "flex",
        margin : "5px" ,
        flexDirection:"column",
        height:'30px',
    },
    addButton : {
       margin : '5px',
    },
    actionButton : {
        margin : "5px"
    },
    tableHeader : {
        backgroundColor : "black" ,
        color : "white"    
    },
    container : {
        display : "flex",
    },
    dropdown : {
        top : 'auto'
    },
    checkoutButton :{
        margin : '10px',
        display : 'flex',
        justifyContent : "center"
    }

}));