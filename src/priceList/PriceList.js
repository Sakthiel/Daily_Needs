import { useState, useEffect } from "react";
import priceListService from "./service/priceListService";
import { TableContainer, TableBody, TableCell, Table, TableHead, TableRow, Paper, Button, Select, FormControl, InputLabel, MenuItem  ,TextField} from "@material-ui/core";
import AddPriceListModal from "./AddPriceListModal";
import EditPriceListModal from "./EditPriceListModal";
import DeletePriceListModal from "./DeletePriceListModal";
import styles from "./styles/priceListStyles";
import { getUserName } from "../helper/authService";
import cartService from "../cart/service/cartService";


const PriceList = ({setCartItemCount}) => {
    const classes = styles();
    const [priceList, setPriceList] = useState([]);

    const [quantityList , setQuantityList] = useState([]);

    const tableHeader = ["ProductName", "Category", "UnitPrice", "Quantity", "Actions"];

    const [selectedCategory, setSelectedCategory] = useState('All');

    var currentItemCount;

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const [initialData, setInitialData] = useState(null);

    const [open, setOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [id, setId] = useState(null);
    const handleClose = () => {
        setOpen(false);
        setEditModal(false);
    }
    //deleteModal
    const [deleteModelOpen, setDeleteModelOpen] = useState(false);
    const [index, setIndex] = useState(null);

    const handleDeleteModalClose = () => {

        setDeleteModelOpen(false);
    }
    //EditModal
    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleEditModalClose = () => {
        setInitialData(null);
        setEditModalOpen(false);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const priceListResponse = await priceListService.getPriceDetails();
                console.log(priceListResponse);
                const data = priceListResponse.data;
                if (selectedCategory === 'All') {
                    setPriceList(data);
                    setQuantityList(data);
                }
                else {
                    const filteredData = data.filter(item => item.category === selectedCategory);
                    setPriceList(filteredData);
                    setQuantityList(filteredData);
                }
                const cartItemList= await cartService.getCartItems();
                currentItemCount = cartItemList.data.length;
                setCartItemCount(currentItemCount);
            } catch (error) {
                console.error("Error fetching version details:", error);
            }
        }

        fetchData();
    }, [selectedCategory]);


    const handleDelete = async (index) => {
        const id = priceList[index].id;
        try {
            const response = await priceListService.deletePriceList(id);
            console.log(response);
            priceList.splice(index, 1);
            const updatedPriceList = [...priceList];
            setPriceList(updatedPriceList);
        }
        catch (error) {
            console.error(error);
        }
    }
        ///Quantity change handler
    const handleQuantityChange = (productId , event) => {
            const updatedQuantityList = quantityList.map((item) => {
                if(item.id == productId)
                    return {...item , quantity : parseInt(event.target.value)}
                else
                    return item;
            });
            setQuantityList(updatedQuantityList);
    }

        ///Add to Cart handler
    const handleAddToCart = async (index) => {
        const productWithQuantity = quantityList[index];
        if(!isNaN(productWithQuantity.quantity)){
            const userName = getUserName();
            const payload = {productId : productWithQuantity.id,
                            userName : userName,
                            quantity : parseInt(productWithQuantity.quantity)}
        try{
            const response = await cartService.putCartItem(payload);
           
            console.log(response.data);
            
        }
        catch(error){
            console.error(error);
        }
        const cartItemList= await cartService.getCartItems();
        currentItemCount = cartItemList.data.length;
        setCartItemCount(currentItemCount);
        }
    }

    return (
        <div>
            <h1>
                PriceList
            </h1>
            <div className={classes.container} >

                <AddPriceListModal open={open} handleClose={handleClose} editModal={editModal} itemId={id} initialData={initialData} priceList={priceList} setPriceList={setPriceList} index={index} />
                <DeletePriceListModal open={deleteModelOpen} handleClose={handleDeleteModalClose} handleDelete={handleDelete} index={index} />
                {initialData && (
                    <EditPriceListModal open={editModalOpen} handleClose={handleEditModalClose} itemId={id} initialData={initialData} priceList={priceList} setPriceList={setPriceList} index={index} />
                )}
                <TableContainer component={Paper} style={{ width: '85%' }}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table" data-testid="table">
                        <TableHead>
                            <TableRow>
                                {
                                    tableHeader.map((header, index) => {
                                        return (<TableCell align="center" key={index} className={classes.tableHeader} style={{ width: '30px' }}>
                                            {header}
                                        </TableCell>)
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                priceList.length > 0 ? priceList.map((item, index) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell align="center" style={{ width: '20%' }} component="th" scope="row">
                                                {item.productName}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: '15%' }} >
                                                {item.category}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: '10%' }}>
                                                {item.unitPrice}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: '12%' }}>
                                                <TextField variant="outlined" type="number" required onChange={(e) => { handleQuantityChange(item.id, e)}}/>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button color="primary" variant="contained" onClick={() => {
                                                    setDeleteModelOpen(!deleteModelOpen);
                                                    setIndex(index)
                                                }} className={classes.actionButton}> Delete </Button>
                                                <Button data-testid = "editbutton" color="primary" variant="contained" onClick={() => {
                                                    setInitialData(item);
                                                    setId(item.id);
                                                    setEditModalOpen(!editModalOpen);
                                                    setIndex(index);
                                                }} > Edit</Button>
                                                <Button className={classes.actionButton} variant="contained" color="primary" onClick = {(e) => {handleAddToCart(index) }}>
                                                    Add to cart
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    )
                                }) : "No Data Found"
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.containerButton}>
                    <div className={classes.addButton}>
                        <Button color="primary" variant="contained" onClick={() => {
                            setOpen(!open)
                        }}  >Add New List</Button>
                    </div>

                    <FormControl>
                        <InputLabel htmlFor="category">Select Category:</InputLabel>
                        <Select
                            label="Select Category"
                            id="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className={classes.dropdown}
                            data-testid="category-select"
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Fruit" data-testid="fruit-option">Fruit</MenuItem>
                            <MenuItem value="Vegetable">Vegetable</MenuItem>
                            <MenuItem value="Dairy">Dairy</MenuItem>
                            <MenuItem value="Grains">Grains</MenuItem>
                            {/* Add more categories as needed */}
                        </Select>
                    </FormControl>


                </div>
            </div>
        </div>


    )
}
export default PriceList;