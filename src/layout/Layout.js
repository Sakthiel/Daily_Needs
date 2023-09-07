import {Box, Container} from "@material-ui/core";
import Header from "../header/Header";
import styles from "./styles/layoutStyles";
import Footer from "../footer/Footer";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";
import { useState } from "react";

const Layout = () => {
    const classes = styles();
    const {isAuthenticated, handleLogin, handleLogout} = useAuth();
    console.log(isAuthenticated);

    const [cartItemCount , setCartItemCount]  = useState(0);
    return (
        <Box>
            <Header  onLogout={handleLogout} isAuthenticated={isAuthenticated} cartItemCount={cartItemCount}/>
            <Container maxWidth={false} className= {classes.container} >
                <RootRouter isAuthenticated={isAuthenticated} onLogin={handleLogin}  cartItemCount={cartItemCount} setCartItemCount = {setCartItemCount}/>
            </Container>
            <Footer/>
        </Box>
    )
};
export default Layout;