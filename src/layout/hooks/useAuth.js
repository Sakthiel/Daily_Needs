import {useEffect, useState} from "react";
import {isLoggedIn, login, logout, getUserName} from "../../helper/authService";

export default () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        setIsAuthenticated(isLoggedIn());
        setUserName(getUserName);
    }, []);

    const handleLogin = async (username, password) => {
        const userDetails = await login(username, password);
        console.log("in useAuth");
        setIsAuthenticated(true);
        setUserName(userDetails.username);
        return userDetails;
    };

    const handleLogout = () => {
        logout();
        setUserName(null);
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated: isAuthenticated,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        userName: userName
    };
}
