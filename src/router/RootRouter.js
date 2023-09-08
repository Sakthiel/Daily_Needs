import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Home from "../home/Home"
import PriceList from "../priceList/PriceList";
import Cart from "../cart/Cart";
import Bill from "../bill/Bill";
import Login from "../login/Login";
import ProtectedRoute from "../login/ProtectedRoute";
import SignUp from "../signUp/SignUp";
const RootRouter = ({isAuthenticated, onLogin , setCartItemCount ,cartItemCount , isUserAdmin}) => {
    return(
        <Router>
            <Routes>
            <Route path="/" exact  element = {<ProtectedRoute isAuthenticated={isAuthenticated}> <Home setCartItemCount = {setCartItemCount} ></Home></ProtectedRoute>}  />
            
            
            <Route exact path = "/signUp" element = {<SignUp/>}/>
            
            <Route exact path = "/priceList" element = {<ProtectedRoute isAuthenticated={isAuthenticated}> <PriceList setCartItemCount = {setCartItemCount} isUserAdmin={isUserAdmin}></PriceList></ProtectedRoute>}/>

            <Route exact path = "/login" element = {<Login isAuthenticated={isAuthenticated} onLogin={onLogin} />}/>

            <Route exact path = "/bill" element = {<ProtectedRoute isAuthenticated={isAuthenticated}> <Bill setCartItemCount = {setCartItemCount}/></ProtectedRoute>} />

            <Route exact path = "/cart" element = {<ProtectedRoute isAuthenticated={isAuthenticated}> <Cart setCartItemCount = {setCartItemCount}/></ProtectedRoute>} />

            </Routes>
        </Router>
    )
}
export default RootRouter;