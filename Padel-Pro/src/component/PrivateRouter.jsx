import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { claseContext } from "./Context";


const PrivateRoute = ({ children }) => {
  const { userLogin } = useContext(claseContext);

  if (!userLogin) {
    // Si no hay usuario logueado, redirige a /log-in
    return <Navigate to="/log-in" replace />;
  }

  // Si hay usuario logueado, renderiza los hijos
  return <Outlet/>;
};

export default PrivateRoute;
