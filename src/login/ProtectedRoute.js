import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../helper/authService";
const ProtectedRoute = ({ children }) => {
    console.log("hi");

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;