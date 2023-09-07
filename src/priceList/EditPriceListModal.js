import {Modal , Typography , FormControl , FormLabel , TextField , Button} from "@material-ui/core"
import { useState } from "react";
import styles from "./styles/addPriceListModalStyles";
import priceListService from "./service/priceListService";
const EditPriceListModal = ({open , handleClose, itemId, initialData, priceList, setPriceList, index }) => {

    const[productName , setProductName] = useState(initialData.productName);
    const[category , setCategory] = useState(initialData.category);
    const[price , setPrice] = useState(initialData.unitPrice.toString());
    const classes =  styles();

    

    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {productName , category , unitPrice  : parseFloat(price)}
        console.log(payload);

        const response = await priceListService.editPriceList(payload, itemId);
        console.log("edit");
        console.log(response.data);
        priceList.splice(index, 1, response.data);
        const updatedPriceList = priceList;
        setPriceList(updatedPriceList);
        handleClose();
    }

    return(<Modal open = {open} onClose={handleClose}>
        <div className= {classes.addListModal}>
            <div className= {classes.addListHeader}>
                <Typography variant="h5" component= "h2" id = "simple-modal-title">
                    Edit a Price List
                </Typography>
            </div>
            <form onSubmit = {handleSubmit}>
                <FormLabel>
                    Product Name
                </FormLabel>
                <TextField required data-testid = "productname-input" fullWidth value = {productName} onChange = {(e) => {setProductName(e.target.value)}}></TextField>
                <FormLabel>
                    Category
                </FormLabel>
                <TextField  required data-testid = "category-input" fullWidth value = {category} onChange = {(e) => {setCategory(e.target.value)}}></TextField>
                <FormLabel>
                    Price
                </FormLabel>
                <TextField  required data-testid = "price-input" fullWidth type = "number" value = {price} onChange = {(e) => {setPrice(e.target.value)}}></TextField>
                <Button color = "primary" variant = "contained" type = "submit">
                    Submit
                </Button>
            </form>
        </div>

    </Modal>
   )

}
export default EditPriceListModal;