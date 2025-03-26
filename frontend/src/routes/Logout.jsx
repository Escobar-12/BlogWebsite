import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../components/CustomButton";
import Image from "../components/Image";
import useAuth from "../hooks/useAuth";

const Logout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate(); 

    const handleLogOut = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/logout/", {
                method: "POST",
            });

            if (!res.ok) {
                return console.log("Error while logging out.");
            }

            localStorage.removeItem("auth");
            setAuth(null);
            console.log("cleared");
            navigate("/", { replace: true }); 

        } catch (err) {
            console.error("Logout failed:", err);
        }
    };


    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-[1240px] mx-auto my-10 px-4 md:px-8 space-y-10">
            <div className="w-full lg:w-1/2 flex flex-col gap-5 max-md:py-15 ">
                <h1 className="heroHeader text-3xl lg:text-5xl font-bold">Click Here To Log Out.</h1>
                <div className="flex gap-3">
                    <button onClick={handleLogOut}>
                        <ButtonCustom label="Log out" bold={true} large={true} />
                    </button>
                    <ButtonCustom href="/" label="Home" bold={true} large={true} />
                </div>
            </div>
            <Image path={"Logoutbg.svg"} className="shadow-md rounded-2xl h-[80vh] w-full lg:max-w-[40vw] g:w-1/2 object-cover object-center" />
        </div>
    );
};

export default Logout;
