import {Modal , Typography , FormLabel ,  Button ,TextField } from "@material-ui/core"
import { useState } from "react";
import styles from "./styles/addPriceListModalStyles";
import priceListService from "./service/priceListService";
const AddPriceListModal = ({open , handleClose , editModal , itemId , initialData}) => {
    
        const[productName , setProductName] = useState('');
    const[category , setCategory] = useState('');
    const[price , setPrice] = useState('0');
    
    const classes =  styles();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {productName , category , unitPrice  : parseFloat(price)}
        console.log(payload);
        if(!editModal){
        await priceListService.createPriceList(payload);
        console.log("create")
        }
        else{
            await priceListService.editPriceList(payload , itemId);
            console.log("edit");
            editModal = false;
        }
        handleClose();
        window.location.reload();
    }

    return(<Modal open = {open} onClose={handleClose}>
        <div className= {classes.addListModal}>
            <div className= {classes.addListHeader}>
                <Typography variant="h5" component= "h2" id = "simple-modal-title">
                    {editModal ? "Edit Price List" :"Add a New Price List"}
                </Typography>
            </div>
            <form onSubmit = {handleSubmit} data-testid = "form">
                <FormLabel>
                    Product Name
                </FormLabel>
                <TextField data-testid = "productname-input" required fullWidth onChange = {(e) => {setProductName(e.target.value)}}  ></TextField>
                <FormLabel>
                    Category
                </FormLabel>
                <TextField  data-testid = "category-input" required fullWidth onChange = {(e) => {setCategory(e.target.value)}} ></TextField>
                <FormLabel>
                    Price
                </FormLabel>
                <TextField  data-testid = "price-input" required fullWidth type = "number" onChange = {(e) => {setPrice(e.target.value)} }></TextField>
                <Button color = "primary" variant = "contained" type = "submit">
                    Submit
                </Button>
            </form>
        </div>

    </Modal>
   )

}
export default AddPriceListModal;