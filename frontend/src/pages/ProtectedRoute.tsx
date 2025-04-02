import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    console.log(loading)
    if (loading) return <p>Betöltés...</p>; // Ne villogjon az oldal
    return user !== null ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
