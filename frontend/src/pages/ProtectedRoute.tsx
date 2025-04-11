import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spin } from "antd";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    console.log("PROCTECTEDROUTE", user)

    // if (user === undefined) {
    //     return <div>Loading...</div>;
    // }

    if (loading) return <Spin fullscreen />;
    return user === null ? <Navigate to={"/login"} /> : <Outlet />;
};

export default ProtectedRoute;
