import { FormLabel , TextField , Button ,Typography} from "@material-ui/core";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
const Login = ({ isAuthenticated, onLogin }) => {
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    const [username , setUserName] = useState('');
    const [password , setPassWord] = useState('');



    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error">
                    Login failed
                </Typography>
            )
        }
    };

    const handlePasswordChange = (e) => {
        
        setPassWord(e.target.value);
        
    }

    const handleUserName = (e) => {
        setUserName(e.target.value);
    }

    const checkPasswordValidity = (typedPassword) => {
        const dbPassword = 'Owner'; // Replace with your actual database password
        return typedPassword === dbPassword;
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
        navigate("/");
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
      
        <TextField data-testid = "username-input" variant="outlined" type="text" required margin="dense" onChange = {handleUserName}>

        </TextField>
        <div> 
             <FormLabel>
            Password
        </FormLabel>
        </div>
      
        <TextField data-testid = "password-input" variant="outlined"  sx={{mb: 3}} margin="dense" type = "password" required onChange = {handlePasswordChange}>

        </TextField>
        <div style={{margin:"5px"}}> 
        <Button color="primary" variant="contained" type = "submit" >
            Submit
        </Button>
        </div>
        {errorMessage()}
     </form>
     
    < div >
    <p>
      New to Daily Needs?{" "}
      <a href="/signUp">
        Signup here
      </a>
    </p>
  </div>
</div>)
}

export default Login;