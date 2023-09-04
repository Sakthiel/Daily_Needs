import { FormLabel , TextField , Button ,Typography} from "@material-ui/core";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
const Login = ({ isAuthenticated, onLogin }) => {
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    const [username , setUserName] = useState('');
    const [password , setPassWord] = useState('');

    const[isLoggedIn , setIsLoggedIn] = useState(isAuthenticated);


    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error">
                    Login failed
                </Typography>
            )
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(isAuthenticated);
        
        try {
            await onLogin(username, password);
            setShowError(false);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setShowError(true);
            } else {
                throw err;
            }
        }
        console.log(isAuthenticated);
        navigate("/")
        setIsLoggedIn(true);
    };
    // if (isLoggedIn) {
    //     return <Navigate to="/"  />;
    //   }
return(<div style={{textAlign:"center"}}>
    <h1>
    Login Page
    </h1>
    <form onSubmit = {handleLogin} data-testid = "form">
        <div> 
             <FormLabel>
            UserName
        </FormLabel>
        </div>
      
        <TextField type="text" required onChange = {(e) => {setUserName(e.target.value)}}>

        </TextField>
        <div> 
             <FormLabel>
            Password
        </FormLabel>
        </div>
      
        <TextField type = "password" required onChange={(e) => {setPassWord(e.target.value)}}>

        </TextField>
        <div style={{margin:"5px"}}> 
        <Button color="primary" variant="contained" type = "submit" >
            Submit
        </Button>
        </div>
        {errorMessage()}
     </form>
</div>)
}

export default Login;