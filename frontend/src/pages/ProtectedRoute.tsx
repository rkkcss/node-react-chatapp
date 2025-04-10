import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spin } from "antd";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    console.log(loading)
    if (loading) return <Spin fullscreen />;
    return user !== null ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
