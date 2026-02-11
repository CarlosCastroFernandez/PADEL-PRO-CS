import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { claseContext } from "./Context";


const PrivateRoute = ({ children }) => {
  const { userLogin } = useContext(claseContext);

  if (!userLogin) {

    return <Navigate to="/log-in" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
