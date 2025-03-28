import { useEffect, useState } from "react";
import ListItemPost from "../components/listItemPost";
import AuthorPostList from "../components/AuthorPosts";
import useAuth from "../hooks/useAuth";

const SavedPosts = () =>
{
    const {auth, checkAuth} = useAuth();
    const [loading, setLoading] = useState(true);
    const [savedPosts, setSavedPosts] = useState(null);

    
    useEffect(()=>
    {
        const getSaved = async () =>
            {
                try
                {
                    const res = await fetch(`http://localhost:5000/api/post/savedPosts`,
                        {
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json",
                                authorization: `Bearer ${auth?.Access_token}` ,
                            },
                            body: JSON.stringify({
                                id:auth?.id
                            }),
                            credentials:"include"
                        }
                    )
                    if(!res.ok) {
                        await checkAuth();
                        return console.log("try again");
                    } 
                    const data = await res.json();
                    setSavedPosts(data.savedPosts);
                    return data;
                }
                catch (error) {
                    console.error("Not logged in");
                } finally {
                    setLoading(false);
                }
            }

        getSaved();
        console.log(savedPosts);
    },[auth]);

    if (loading || savedPosts===null) return <div className="text-center mt-10">Loading...</div>;

    return (
        <section className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 w-full flex flex-col gap-4 mt-5 lg:mt-10 pb-10">
            
                <AuthorPostList Post={savedPosts}/>
            
        </section>
    );

}

export default SavedPosts;