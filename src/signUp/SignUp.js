import React, { useState } from 'react';
import signUpService from "./service/signUpService";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    makeStyles,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    Snackbar
} from '@material-ui/core';
import { useNavigate } from "react-router-dom";


import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const SignUp = () => {

    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        phoneNumber: '',
        email: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (
            !formData.name ||
            !formData.username ||
            !formData.password ||
            !formData.phoneNumber ||
            !formData.email
        ) {
            alert('All fields are required');
            return;
        }

        if (!/^[a-zA-Z ]+$/.test(formData.name)) {
            alert('Name should not contain numbers');
            return;
        }

        if (formData.password.length < 1) {
            alert('Password should not be blank');
            return;
        }

        if (formData.username.length < 1) {
            alert('Username should not be blank');
            return;
        }

        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            alert('Phone number should be a 10-digit number');
            return;
        }

        if (formData.email.length < 1) {
            alert('Email should not be blank');
            return;
        }

        // If all validations pass, you can submit the form data to your backend or perform other actions
        const payload ={
            name : formData.name ,
            phoneNumber : formData.phoneNumber,
            email : formData.email ,
            user : {
                username : formData.username,
                password : formData.password
            }
        }
        try{
        const response = await signUpService.createCustomer(payload);
        
         
        console.log("successful sign up" ,response)
        navigate("/login");
      
        } catch (error) {
          console.log("SignUp Error:", error);
        }

        console.log('Form data submitted:', formData);
    };


    return (<div>
     
        <Container component="main" maxWidth="xs" className={classes.root}>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <form data-testid="signup-form" className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            data-testid = "name-input"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            data-testid = "username-input"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <TextField
                                data-testid = "password-input"
                                label = "Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            data-testid = "phonenumber-input"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            data-testid = "email-input"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>
                <Button
                    data-testid = "button"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Sign Up
                </Button>
            </form>
        </Container>

    {/* <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {error ? errorMessage : "Password changed successfully, Login with new password!"}
        </Alert>
      </Snackbar> */}
    </div>)
}

export default SignUp;