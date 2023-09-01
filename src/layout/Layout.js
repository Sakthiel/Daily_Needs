import {Box, Container} from "@material-ui/core";
import Header from "../header/Header";
import styles from "./styles/layoutStyles";
import Footer from "../footer/Footer";
import RootRouter from "../router/RootRouter";
const Layout = () => {
    const classes = styles();
    return (
        <Box>
            <Header/>
            <Container maxWidth={false} className= {classes.container} >
                <RootRouter/>
            </Container>
            <Footer/>
        </Box>
    )
};
export default Layout;