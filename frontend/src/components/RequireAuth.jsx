import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.roles?.find(role => allowedRoles?.includes(role)) ? (
            <Outlet />
        ) : auth?.user ? (
            <Navigate to="/notallowed" state={{from:location}} replace={true} />
        ) 
        : (
            <Navigate to="/login" state={{from:location}} replace={true} />
        );
};

export default RequireAuth;