import { useState ,useEffect } from "react";
import styles from "./styles/footerStyles";
import footerService from "./service/footerService";

const Footer  = () =>{
    const classes = styles();
    const[versionDetails , setVersionDetails] = useState('');

    useEffect(() => {
        async function fetchData() {
          try {
            const versionDetailsResponse = await footerService.getVersionDetails();
            console.log(versionDetailsResponse);
            setVersionDetails(versionDetailsResponse.data.CurrentVersion);
            
          } catch (error) {
            console.error("Error fetching version details:", error);
          }
        }
    
        fetchData();
      },[]);
    
    return(
        <footer className={classes.footer}>
            <p data-testid="version"> Current Version : {versionDetails}</p>
        </footer>
    )

}

export default Footer;