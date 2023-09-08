import { AppBar, Toolbar, Typography ,Badge } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import styles from "./styles/headerStyles"
const Header = ({ onLogout, isAuthenticated ,cartItemCount ,setCartItemCount}) => {

    const classes = styles();
    return (
        <AppBar position={"sticky"} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <div>
                    <a href="/" className={classes.headerLink}>
                        <Typography className={classes.headerLogo} variant="h5">
                            Daily Needs
                        </Typography>
                    </a>
                </div>

                <div>
                    <a href="/priceList" className={classes.headerLink}>
                        <Typography >
                            Price List
                        </Typography>
                    </a>
                </div>
                <div>
                    <a href="/bill" className={classes.headerLink}>
                        <Typography className={classes.headerLogo}>
                            Bill
                        </Typography>
                    </a>
                </div>
                <div>
                   
                    <a href="/cart" className={classes.headerLink}>
                    
                   <Badge badgeContent={cartItemCount}color="primary" overlap="rectangular">
                        <ShoppingCart/>
                        </Badge> 
                     </a> 
                     
                  
                </div>
                {isAuthenticated ?
                    <div onClick={() => { setCartItemCount(0) ; onLogout()}} className={`${classes.logoutLink} logout-link`}>
                        <ExitToAppIcon />
                        <Typography className={classes.headerLogo} variant="body1">
                            Logout
                        </Typography>
                    </div> : " "
                }
            </Toolbar>
        </AppBar>)
        ;

}
export default Header;