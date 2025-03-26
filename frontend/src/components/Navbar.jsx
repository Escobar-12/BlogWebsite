import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import useButtonHoverEffect from "./ButtonHoverEffect";
import ButtonCustom from "./CustomButton";
import { Link } from "react-router-dom";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import UserProfile from "../components/Profile";

const NavBar = () => {

    const {auth, setAuth} = useAuth();

    useButtonHoverEffect();
    const [mobileStackOpen, setMobileStackOpen] = useState(false);
    const [scheme, setScheme] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const colorScheme = scheme ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", colorScheme);
    }, [scheme]); 

    const toggleNavbar = () => {
        setMobileStackOpen(!mobileStackOpen);
        document.body.style.overflow = mobileStackOpen ? "auto" : "hidden";
    };

    const toggleScheme = () => {
        setScheme(prevScheme => {
            const newScheme = !prevScheme;
            const colorScheme = newScheme ? "dark" : "light";

            document.documentElement.setAttribute("data-theme", colorScheme);
            localStorage.setItem("theme", colorScheme);

            return newScheme;
        });
    };

    return (
        <nav className="relative h-13 shadow-md z-30">
            <div className='relative max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between h-full'>
                {/* Title & logo */}
                <div>
                    <Link className="font-semibold text-xl">Lightbi</Link>
                </div>
                <div className="hidden lg:flex items-center justify-between gap-4">
                    <Link to={"/"} className="smText text-neutral-500">Home</Link>
                    <Link to={"/addpost"} className="smText text-neutral-500">Create</Link>
                    <Link to={"/posts"} className="smText text-neutral-500">Posts</Link>
                    <Link className="smText text-neutral-500">About</Link>

                    {
                        !auth?.user
                            ? <ButtonCustom href="/login" label="Sign Up" bold={true} large={false} />
                            : ( <UserProfile />) 
                    }
                    
                    {scheme ? (
                        <MdOutlineWbSunny className="text-xl cursor-pointer" onClick={toggleScheme} />
                    ) : (
                        <IoMoonSharp className="text-xl cursor-pointer" onClick={toggleScheme} />
                    )}


                </div>
                <div className="hidden max-lg:flex z-20">
                    <button onClick={toggleNavbar}>
                        {mobileStackOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {mobileStackOpen && (
                    <div className={`absolute flex lg:hidden flex-col items-center justify-center gap-10 right-0 top-0 w-screen h-screen ${!scheme ? "bg-white" : "bg-[#1a202c]"} shadow-lg p-4 transition-all duration-100 ease-in-out z-15`}>
                        <Link to={"/"} className="smText text-neutral-500" onClick={toggleNavbar}>Home</Link>
                        <Link to={"/addpost"} className="smText text-neutral-500" onClick={toggleNavbar}>Create</Link>
                        <Link to={"/posts"} className="smText text-neutral-500" onClick={toggleNavbar}>Posts</Link>
                        <Link className="smText text-neutral-500" onClick={toggleNavbar}>About</Link> 
                        {
                            !auth?.user
                                ? <ButtonCustom href="/login" label="Sign Up" bold={true} large={false} />
                                : (<ButtonCustom href="/logout" label="Log out" bold={true} large={false} />)
                        }
                    
                        {scheme ? (
                            <MdOutlineWbSunny className="text-xl cursor-pointer" onClick={toggleScheme} />
                        ) : (
                            <IoMoonSharp className="text-xl cursor-pointer" onClick={toggleScheme} />
                        )}

                        <UserProfile />

                    </div>
                )}

            </div>
        </nav>
    );
}

export default NavBar;
