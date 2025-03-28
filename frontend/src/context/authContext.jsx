import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});



export const AuthProvider = ({ children }) => {
    const storedAuth = JSON.parse(localStorage.getItem("auth")) || null;
    const [auth, setAuth] = useState(storedAuth);
    const [loading, setLoading] = useState(true);

    const resetAuth = () => {
        localStorage.removeItem("auth");
        setAuth(null);
    };

    const refreshAccessToken = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/refresh", {
                method:"GET",
                credentials: "include",
            });

            const data = await res.json();

            if (!data?.Access_token) 
                {
                    return console.log("No access token in data");
                }

            const updatedAuth = {
                user: data.user,
                Access_token: data.Access_token,
                roles: data.roles,
                id: data.id,
                img: data.img
            };

            setAuth(updatedAuth);
            localStorage.setItem("auth", JSON.stringify(updatedAuth));

            return data.Access_token;

        } catch (err) {
            console.error("Failed to refresh token", err);
            resetAuth();
            return null;
        }
    };

    const checkAuth = async () => {
        if(!auth?.user) 
            {
                resetAuth();
                return false
            }

        if (!auth?.Access_token) {
            console.log("refresh...");
            const newAccessToken = await refreshAccessToken();
            if (!newAccessToken) {
                console.log("Refresh failed");
                resetAuth();
                return false;
            }
        }
        try {
            const res = await fetch("http://localhost:5000/api/auth/me", {
                headers: {
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                credentials: "include",
            });

            const data = await res.json();
            if (!res.ok) 
                {
                    await refreshAccessToken();
                    throw new Error(data.massage);
                }
    
            const updatedAuth = {
                ...auth,
                user: data.user,
                roles: data.roles,
                img: data.profile,
                id:data.id,
            };
            
            setAuth(updatedAuth);
            localStorage.setItem("auth", JSON.stringify(updatedAuth));
            return true;
        } catch (error) {
            console.error("Authentication failed, trying refresh...", error);
            console.log("refresh...");
            await refreshAccessToken();
        } finally {
            setLoading(false);
        }
    };

        useEffect(()=>
        {
            checkAuth();
        },[])

    return (
        <AuthContext.Provider value={{ auth, setAuth, checkAuth }}>
            { children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
