import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Grid
} from '@material-ui/core';
import cartService from "../cart/service/cartService";
import styles from "../cart/styles/cartTableStyles"
const Bill = ({ setCartItemCount }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const classes = styles();

    useEffect(() => {
        async function fetchData() {
            try {
                const cartItemsResponse = await cartService.getCartItems();
                console.log(cartItemsResponse.data);
                const cartItemList = cartItemsResponse.data;
                setCartItems(cartItemList);
                setCartItemCount(cartItemList.length);

                const calculatedPrice = cartItemList.reduce((total, item) => {
                    return total + item.product.unitPrice * item.quantity;
                }, 0);
                setTotalPrice(calculatedPrice);
                console.log(totalPrice);

            } catch (error) {
                console.error("Error fetching version details:", error);
            }
        }

        fetchData();
    }, []);
    return (
        <div>
            <h1>
                Bill
            </h1>
            <div>
                <Box p={3}>
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeader} >Product Name</TableCell>
                                    <TableCell className={classes.tableHeader} align="right">Unit Price</TableCell>
                                    <TableCell className={classes.tableHeader} align="right">Quantity</TableCell>
                                    <TableCell className={classes.tableHeader} align="right" >Category</TableCell>
                                    <TableCell className={classes.tableHeader} align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product.productName}</TableCell>
                                        <TableCell align="right">Rs {item.product.unitPrice.toFixed(2)}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">{item.product.category}</TableCell>
                                        <TableCell align="right">Rs {(item.product.unitPrice * item.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{marginTop : "10px"}}>
                    <Grid container justifyContent="flex-end" mt={2} >
                        <Grid item xs={6}>
                            <Typography variant="h5" align="right">
                                Total Price: Rs {totalPrice.toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                    </div>
                </Box>
            </div>
        </div>
    )
}
export default Bill;