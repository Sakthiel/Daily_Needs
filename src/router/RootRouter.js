import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Home from "../home/Home"
import PriceList from "../priceList/PriceList"
import Bill from "../bill/Bill";
import Login from "../login/Login"
import ProtectedRoute from "../login/ProtectedRoute";
const RootRouter = ({isAuthenticated, onLogin }) => {
    return(
        <Router>
            <Routes>
            <Route path="/" exact  element = {<ProtectedRoute isAuthenticated={isAuthenticated}> <Home ></Home></ProtectedRoute>}  />
            
            
            
            <Route exact path = "/priceList" element = {<ProtectedRoute isAuthenticated={isAuthenticated}> <PriceList></PriceList></ProtectedRoute>}/>

            <Route exact path = "/login" element = {<Login isAuthenticated={isAuthenticated} onLogin={onLogin} />}/>

            <Route exact path = "/bill" element = {<ProtectedRoute isAuthenticated={isAuthenticated}> <Bill/></ProtectedRoute>} />
           
            </Routes>
        </Router>
    )
}
export default RootRouter;