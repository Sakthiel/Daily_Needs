import { useState, useEffect } from "react";
import priceListService from "./service/priceListService";
import { TableContainer, TableBody, TableCell, Table, TableHead, TableRow, Paper, Button, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import AddPriceListModal from "./AddPriceListModal";
import EditPriceListModal from "./EditPriceListModal";
import styles from "./styles/priceListStyles";


const PriceList = () => {
    const classes = styles();
    const [priceList, setPriceList] = useState([]);

    const [id, setId] = useState(null);

    const tableHeader = ["ProductName", "Category", "UnitPrice", "Actions"];

    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const [initialData, setInitialData] = useState({
        productName: '',
        category: '',
        unitPrice: 0
    });

    const [open, setOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const priceListResponse = await priceListService.getPriceDetails();
                console.log(priceListResponse);
                const data = priceListResponse.data;
                if (selectedCategory === 'All') {
                    setPriceList(data);
                }
                else {
                    const filteredData = data.filter(item => item.category === selectedCategory);
                    setPriceList(filteredData);
                }
            } catch (error) {
                console.error("Error fetching version details:", error);
            }
        }

        fetchData();
    }, [selectedCategory]);
    const handleClose = () => {
        setOpen(false);
        setEditModal(false);
    }

    const handleDelete = async (index) => {
        const id = priceList[index].id;
        const response = await priceListService.deletePriceList(id);
        console.log(response);
        window.location.reload();

    }
    return (
        <div>
            <h1>
                PriceList
            </h1>
            <div className={classes.container} >

                <AddPriceListModal open={open} handleClose={handleClose} editModal={editModal} itemId={id} initialData={initialData} />
                <TableContainer component={Paper} style={{ width: '85%' }}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table" data-testid="table">
                        <TableHead>
                            <TableRow>
                                {
                                    tableHeader.map((header, index) => {
                                        return (<TableCell key={index} className={classes.tableHeader} style={{ width: '30px' }}>
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
                                            <TableCell component="th" scope="row">
                                                {item.productName}
                                            </TableCell>
                                            <TableCell>
                                                {item.category}
                                            </TableCell>
                                            <TableCell>
                                                {item.unitPrice}
                                            </TableCell>

                                            <TableCell>
                                                <Button color="primary" variant="contained" onClick={() => { handleDelete(index) }} className={classes.actionButton}> Delete </Button>
                                                <Button color="primary" variant="contained" onClick={() => {
                                                    setInitialData(item)
                                                    setEditModal(!editModal);
                                                    setId(item.id)
                                                    setOpen(!open)
                                                }} > Edit</Button>
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
                            className= {classes.dropdown}
                            data-testid = "category-select"
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Fruit" data-testid = "fruit-option">Fruit</MenuItem>
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