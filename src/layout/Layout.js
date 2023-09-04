import {Box, Container} from "@material-ui/core";
import Header from "../header/Header";
import styles from "./styles/layoutStyles";
import Footer from "../footer/Footer";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";

const Layout = () => {
    const classes = styles();
    const {isAuthenticated, handleLogin, handleLogout, userName ,checkAuthLoader} = useAuth();
    console.log(isAuthenticated);

    return (
        <Box>
            <Header  onLogout={handleLogout} isAuthenticated={isAuthenticated} />
            <Container maxWidth={false} className= {classes.container} >
                <RootRouter isAuthenticated={isAuthenticated} onLogin={handleLogin}  />
            </Container>
            <Footer/>
        </Box>
    )
};
export default Layout;