import {Modal , Typography , FormControl , FormLabel , TextField , Button} from "@material-ui/core"
import { useState } from "react";
import styles from "./styles/addPriceListModalStyles";
import priceListService from "./service/priceListService";
const EditPriceListModal = ({open , handleClose}) => {

    const[productName , setProductName] = useState('');
    const[category , setCategory] = useState('');
    const[price , setPrice] = useState('0');
    const classes =  styles();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {productName , category , unitPrice  : parseFloat(price)}
        console.log(payload);

        await priceListService.createPriceList(payload);
        handleClose();
        window.location.reload();
    }

    return(<Modal open = {open} onClose={handleClose}>
        <div className= {classes.scheduleModal}>
            <div className= {classes.scheduleHeader}>
                <Typography variant="h5" component= "h2" id = "simple-modal-title">
                    Add a New Price List
                </Typography>
            </div>
            <form onSubmit = {handleSubmit}>
                <FormLabel>
                    Product Name
                </FormLabel>
                <TextField required fullWidth onChange = {(e) => {setProductName(e.target.value)}}></TextField>
                <FormLabel>
                    Category
                </FormLabel>
                <TextField  required fullWidth onChange = {(e) => {setCategory(e.target.value)}}></TextField>
                <FormLabel>
                    Price
                </FormLabel>
                <TextField  required fullWidth type = "number" onChange = {(e) => {setPrice(e.target.value)}}></TextField>
                <Button color = "primary" variant = "contained" type = "submit">
                    Submit
                </Button>
            </form>
        </div>

    </Modal>
   )

}
export default EditPriceListModal;