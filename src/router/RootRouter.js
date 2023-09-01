import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../home/Home"
import PriceList from "../priceList/PriceList"
import Bill from "../bill/Bill";
const RootRouter = () => {
    return(
        <Router>
            <Routes>
            <Route exact path ="/" element ={<Home/>}/>
            
            <Route exact path = "/priceList" element = {<PriceList/>}/>

            <Route exact path = "/bill" element = {<Bill/>}/>
           
            </Routes>
        </Router>
    )
}
export default RootRouter;