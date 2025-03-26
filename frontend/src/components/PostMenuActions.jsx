import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MenuActions = ({ postId }) => {
    const { auth, checkAuth } = useAuth();
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkSaved = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/post/checkSaved", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                credentials: "include",
                body: JSON.stringify({ postId }),
            });

            if (!res.ok) {
                console.log("Failed to check, retrying...");
                return false;
            }

            const data = await res.json();
            return data.isSaved; // Ensure we return the correct value
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const savePost = async () => {
        try {
            if (!auth?.user) {
                throw new Error("Not logged in");
            }

            const newSavedState = !saved;
            setSaved(newSavedState); // Optimistically update UI

            const res = await fetch("http://localhost:5000/api/post/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                credentials: "include",
                body: JSON.stringify({ saved: newSavedState, postId }),
            });

            if (!res.ok) {
                const check = await checkAuth();
                if (!check) {
                    return;
                }
                console.log("Failed to save post, retrying...");
                setSaved(!newSavedState); // Revert UI on failure
                return;
            }

            console.log("Post saved successfully");
        } catch (err) {
            navigate("/login");
            console.error("Error saving post:", err);
        }
    };

    useEffect(() => {
        const fetchSavedStatus = async () => {
            if (!auth?.user) {
                setSaved(false);
                setLoading(false);
                return;
            }
            const isSaved = await checkSaved();
            setSaved(isSaved);
            setLoading(false);
        };

        fetchSavedStatus();
    }, [auth]); 

    if (loading) {
        return <p>Loading...</p>; 
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center cursor-pointer py-2 text-sm gap-2" onClick={savePost}>
                {saved ? <FaBookmark className="text-3xl" /> : <FaRegBookmark className="text-3xl" />}
                <span>Save this Post</span>
            </div>
            {/* Uncomment if you want to add delete functionality */}
            {/* <div className="flex items-center cursor-pointer py-2 text-sm gap-2">
                <MdDelete className="text-3xl" />
                <span>Delete this Post</span>
            </div> */}
        </div>
    );
};

export default MenuActions;
