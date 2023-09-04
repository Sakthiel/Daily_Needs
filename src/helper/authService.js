import axios from 'axios';


const tokenKey = "dailyneeds_token";

export const authHeader = () => {
    return {
      headers: {
        Authorization: "Basic " + localStorage.getItem(tokenKey),
      },
    };
  };

  export const login = async (username, password) => {
    const token = authBasic(username, password);
    const config = {
      headers: {
        Authorization: "Basic " + token,
      },
    };
    const response = await axios.get(`http://localhost:8080/login`, config);
    const userDetails = response.data;
    console.log(userDetails);
  
    if(userDetails!== null){
    localStorage.setItem(tokenKey, token);
    }
    return userDetails;
  };


  export const isLoggedIn = () => {
    return localStorage.getItem(tokenKey) !== null;
  };

  export const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("role");
  };
  
  const authBasic = (username, password) => {
    return window.btoa(username + ":" + password);
  };

  export const getUserName = () => {
    const token = localStorage.getItem(tokenKey);
    const username = window.atob(token).split(":")[0];
    return username;
  };