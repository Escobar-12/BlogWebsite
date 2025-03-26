import Image from "./Image";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import ButtonCustom from "./CustomButton";

const UserProfile = () => {
    const { auth } = useAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const dialogRef = useRef(null);
    const imageRef = useRef(null);

    const toggleDialog = () => {
        setOpenDialog((prev) => !prev);
    };
    
    const checkInBoxClicks = (e) =>
    {
        if( openDialog &&
            dialogRef.current && !dialogRef.current.contains(e.target) && 
            imageRef.current && !imageRef.current.contains(e.target) )
        {
            setOpenDialog(false);
        }
    }

    useEffect(() => {
        if (dialogRef.current) {
            if (openDialog) {
                dialogRef.current.show();
                document.addEventListener("click",checkInBoxClicks);

            } else {
                dialogRef.current.close();
                document.removeEventListener("click",checkInBoxClicks);
            }
        }

        return () =>
        {
            document.removeEventListener("click",checkInBoxClicks);
        }
    }, [openDialog]);
    

    return (
        <div className="relative inline-block">
            {/* Profile Picture */}
            <div className="rounded-full cursor-pointer" onClick={toggleDialog} ref={imageRef}>
                <Image 
                    path={auth?.img || "user.png"} 
                    className="w-10 h-10 rounded-full object-cover shadow-sm" 
                />
            </div>

            {/* Profile Dialog Below */}
            <dialog 
                ref={dialogRef} 
                className="absolute max-lg:hidden left-1/2 transform -translate-x-1/2 mt-2 w-50 shadow-lg rounded-lg"
            >
                <div className="PostList flex flex-col items-center space-y-5 p-4 rounded-lg">
                    <h1 className="text-sm font-bold text-gray-700">
                        Hello, {auth?.user || "Guest"}!
                    </h1>
                    <ButtonCustom href="/logout" label="Log out" bold={true} large={false} onClick={toggleDialog}/>

                    <button 
                        className="mt-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
                        onClick={toggleDialog}>
                        Close
                    </button>
                </div>
            </dialog>
        </div>
    );
};

export default UserProfile;
