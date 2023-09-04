import { useState , useEffect} from "react";
import priceListService from "./service/priceListService";
import { TableContainer , TableBody ,TableCell , Table ,TableHead , TableRow ,Paper, Button} from "@material-ui/core";
import AddPriceListModal from "./AddPriceListModal";
import EditPriceListModal from "./EditPriceListModal";
const PriceList = () => {

    const[priceList , setPriceList] = useState([]);

    const[id , setId] = useState(null);

    const tableHeader = ["ProductName" , "Category" , "UnitPrice" , "Actions"];

    const [initialData , setInitialData]  = useState(null);

    const [open , setOpen] = useState(false);
    const [editModal , setEditModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
          try {
            const priceListResponse = await priceListService.getPriceDetails();
            console.log(priceListResponse);
            setPriceList(priceListResponse.data);
            
          } catch (error) {
            console.error("Error fetching version details:", error);
          }
        }
    
        fetchData();
      },[]);
    const handleClose = () => {
        setOpen(false);
        setEditModal(false);
    }

    const handleDelete = async(index) => {
        const id = priceList[index].id ;
        const response = await priceListService.deletePriceList(id);
        console.log(response);
        window.location.reload();

    }
    return(
        <div>
            <h1>
                PriceListPage
            </h1>
            <div>
                <Button color="primary" variant="contained" onClick={() => {setOpen(!open)}}>Add</Button>
            </div>
            <AddPriceListModal open = {open} handleClose = {handleClose} editModal = {editModal} itemId ={id} initialData = {initialData}/>
            <TableContainer component={Paper}>
                <Table sx = {{minWidth  : 650}} aria-label = "simple table">
                    <TableHead>
                        <TableRow>
                            {
                                tableHeader.map((header , index) => {
                                    return(<TableCell key= {index}>
                                        {header}
                                    </TableCell>)
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            priceList.length > 0 ? priceList.map((item , index) =>{
                                return(
                                    <TableRow key = {item.id}>
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
                                            <Button color="primary" variant="contained" onClick={() => {handleDelete(index)}}> Delete </Button>
                                            <Button color="primary" variant="contained" onClick={() => {
                                                setInitialData(item)
                                                setEditModal(!editModal);
                                                setId(item.id)
                                                setOpen(!open)}} > Edit</Button>
                                        </TableCell>
                                           
                                    </TableRow>
                                )
                            } ) : "No Data Found"
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
        
    )
}
export default PriceList;