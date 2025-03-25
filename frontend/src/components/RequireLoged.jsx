import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { TurtleIcon } from "lucide-react";

const RequireLogged = () => {
    const { auth, checkAuth } = useAuth();
    const location = useLocation();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        const verify = async () => {
            if (!auth?.user) {  
                setLoading(true);
                await checkAuth();
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        verify();
    }, [auth]); 

    if(loading) return (<p>Loading...</p>)

    return auth?.user ? (
                <Outlet />)
            : (
                <Navigate to="/login" state={{from:location}} replace={true} />
            );
};

export default RequireLogged;