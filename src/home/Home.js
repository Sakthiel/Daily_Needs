import { useEffect } from "react";
import cartService from "../cart/service/cartService";
import {
    Container,
    Typography,
    Button,
    makeStyles,
    Paper,
    Grid,
  } from '@material-ui/core';

import styles from "./styles/homeStyles";

const Home = ({setCartItemCount}) => {
    const classes = styles();
    useEffect(() => {
        async function fetchData() {
            try {
                const cartItemsResponse = await cartService.getCartItems();
                console.log(cartItemsResponse.data);
                const cartItemList = cartItemsResponse.data;
                setCartItemCount(cartItemList.length);
                
            } catch (error) {
                console.error("Error fetching version details:", error);
            }
        }

        fetchData();
    }, []);
    return (
        <div className={classes.root}>
          <Container>
            <Paper className={classes.header} elevation={3}>
              <Typography variant="h2" gutterBottom>
                Welcome to Daily Needs Grocery
              </Typography>
              <Typography variant="h5" className={classes.introText}>
                Your one-stop shop for fresh groceries and daily essentials.
              </Typography>
              <a href = "/priceList">
              <Button
                variant="contained"
                className={classes.getStartedButton}
                size="large"
              >
                Get Started
              </Button>
              </a>
            </Paper>
            <Grid container spacing={4} className={classes.introText}>
              <Grid item xs={12} md={6}>
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_1280.jpg" // Replace with your image URL
                  alt="Grocery Store"
                  className={classes.image}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Explore Our Products
                </Typography>
                <Typography variant="body1">
                  Discover a wide range of fresh fruits, vegetables, dairy products,
                  and more. Shop conveniently online and have your groceries
                  delivered to your doorstep.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      );
}
export default Home;