import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, role }) {
    const { user, isAuthenticated } = useAuth();

    // Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Role-based access
    if (role && user?.role !== role) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;