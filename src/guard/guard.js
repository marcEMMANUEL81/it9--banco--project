import { Navigate } from "react-router-dom";

export const GuardedRoute = ({ component: Component }) => {
  const ACCESS_KEY = localStorage.getItem("SESSION_TOKEN");
  return ACCESS_KEY !== null ? <Component /> : <Navigate to="/" />;
};
