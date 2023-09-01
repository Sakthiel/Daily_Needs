import { useState ,useEffect } from "react";
import styles from "./styles/footerStyles";
import axios from "axios";
const Footer  = () =>{
    const classes = styles();
    const[versionDetails , setVersionDetails] = useState({});

    useEffect(() => {
     axios.get('http://localhost:8080/version').then(res => console.log(res)).catch(err => console.log(err));
    }, []);
    
    return(
        <footer className={classes.footer}>
            <p> Current Version : {versionDetails.CurrentVerison}</p>
        </footer>
    )

}

export default Footer;