import { AppBar , Toolbar ,Typography } from "@material-ui/core";
import React from "react";
import styles from "./styles/headerStyles"
const Header =() => {

    const classes = styles();
    return(   
     <AppBar className= {classes.appBar}>
                <Toolbar className={classes.toolbar}> 
                 <Typography className = {classes.headerLogo}variant = "h5">
                Daily Needs
                </Typography>

            <div>
                <a href="/priceList" className = {classes.headerLink}>
                    <Typography >
                    Price List
                    </Typography>
                </a>
            </div>
            <div>
                <a href = "/bill" className = {classes.headerLink}>
                <Typography className = {classes.headerLogo}>
                    Bill
                </Typography>
                </a>
            </div>
        </Toolbar>
    </AppBar>)
    ;

}
export default Header;