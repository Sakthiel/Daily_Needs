import { useState, useEffect } from "react";
import cartService from "./service/cartService";
import { TableContainer, TableBody, TableCell, Table, TableHead, TableRow, Paper, Button, Select, FormControl, InputLabel, MenuItem, TextField ,IconButton } from "@material-ui/core";
import { Category , AddCircle , Delete , RemoveCircle } from "@material-ui/icons";
import styles from "./styles/cartTableStyles";
import DeleteCartItemModal from "./DeleteCartItemModal";
import { getUserName } from "../helper/authService";
const Cart = ({setCartItemCount}) => {
    const classes = styles();
    const [cartItems, setCartItems] = useState([]);
    const cartHeader = ["ProductName" , "Category" ,"UnitPrice" , "Quantity" , "Actions"];

    const [deleteModelOpen ,setDeleteModelOpen] = useState();
    const [deleteIndex, setDeleteIndex] = useState(null);
    const handleDeleteModalClose = () => {
        setDeleteIndex(null);
        setDeleteModelOpen(false);
    }
    const handleDelete = async (index) => {
        const id = cartItems[index].id;
        try {
            const response = await cartService.deleteCartItem(id);
            console.log(response);
            cartItems.splice(index, 1);
            const updatedCartItems = [...cartItems];
            setCartItems(updatedCartItems);
            setCartItemCount(updatedCartItems.length);
        }
        catch (error) {
            console.error(error);
        }
    }

   

    useEffect(() => {
        async function fetchData() {
            try {
                const cartItemsResponse = await cartService.getCartItems();
                console.log(cartItemsResponse.data);
                const cartItemList = cartItemsResponse.data;
                setCartItems(cartItemList);
                setCartItemCount(cartItemList.length);
                
            } catch (error) {
                console.error("Error fetching version details:", error);
            }
        }

        fetchData();
    }, []);

    // const handleQuantityChange = (e , index) => {
    //     const newQuantity = e.target.value;
    //     const item = cartItems[index];
    //     const updatedItem = {...item , quantity: newQuantity};
    //    cartItems.splice(index , 1, updatedItem);
    //    const updatedItemlist = cartItems;
    //    setCartItems(updatedItemlist); 

    // }

    const handleIncrement = async (index) => {
            const item = cartItems[index];
            console.log(item);
           
            const userName = getUserName();
            const payload = {productId : item.product.id,
                            userName : userName,
                            quantity : 1}
            try{
            const response = await cartService.putCartItem(payload);
            console.log(response.data);
            
            const updatedItem = {...item , quantity : ++item.quantity};
            cartItems.splice(index , 1,updatedItem);
            const newList = [...cartItems];
            setCartItems(newList);
            }
           
        catch(error){
            console.error(error);
        }
        
    }

    const handleDecrement = async (index) => {
        const item = cartItems[index];
        if(item.quantity > 1){
        console.log(item);
       
        const payload = {...item , quantity : --item.quantity};
        try{
        const response = await cartService.decrementCartItem(payload , item.id);
        console.log(response.data);
        
        cartItems.splice(index , 1,response.data);
        const newList = [...cartItems];
        setCartItems(newList);
        }
        
       
    catch(error){
        console.error(error);
    }
}
    
}


    return (<div>
        <h1>
            Cart Items
        </h1>

        <div>
        <DeleteCartItemModal open={deleteModelOpen} handleClose={handleDeleteModalClose} index={deleteIndex} handleDelete={handleDelete} />
            <TableContainer>
                <Table aria-label = "simple table" data-testid = "table">
                    <TableHead>
                        <TableRow>
                            {
                                cartHeader.map((header,index) => {
                                    return(<TableCell key={index} className= {classes.tableHeader}> {header} </TableCell>)
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cartItems.length > 0 ? cartItems.map((item ,index) => {
                                return(
                                    <TableRow key = {item.id}>
                                        <TableCell>
                                            {item.product.productName}
                                        </TableCell>
                                        <TableCell>
                                            {item.product.category}
                                        </TableCell>
                                        <TableCell>
                                            {item.product.unitPrice}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton  onClick={() => {handleIncrement(index)}}> 
                                                <AddCircle/>
                                           </IconButton > 
                                            <span data-testid = "quantity"> {item.quantity}</span>
                                            <IconButton  data-testid = "minusButton" onClick={() => {handleDecrement(index)}}>
                                               <RemoveCircle/>
                                           </IconButton> 
                                            {/* <TextField style={{ width: '25%' }} inputProps={{ min: '1' }} value = {item.quantity} onChange = {(e , index) => {handleQuantityChange(e ,index)}} variant="outlined" type="number" required ></TextField> */}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color = "primary"  onClick ={()=>{setDeleteIndex(index); setDeleteModelOpen(!deleteModelOpen)} }>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : "No cart Items Found"
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className= {classes.checkoutButton}> 
                <a href = "/bill"><Button variant="contained" color = "primary"> Checkout </Button></a>
                
            </div>
        </div>
    </div>

    )
}

export default Cart;