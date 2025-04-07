import { homePostslist } from "../assets";
import ListItemPost from "./listItemPost";
import { useState, useEffect } from "react";
import ButtonCustom from "./CustomButton";
import { FaArrowRight } from "react-icons/fa";

const PostList = () => {

    const [todaysPosts, setTodaysPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getAllPosts = async () => 
        {
            try 
            {
                setLoading(true)
                const response = await fetch("http://localhost:5000/api/todays/");
                if (!response.ok) throw new Error("Failed to fetch posts");

                const data = await response.json();
                setTodaysPosts(data.posts);
            } 
            catch (err) 
            {
                console.error("Error fetching posts:", err);
            }
            finally
            {
                setLoading(false);
            }
        };

        getAllPosts();
    }, []);

    if(loading) return <p className="text-center text-gray-500 col-span-full mt-10">Loading...</p>
    if(!loading && todaysPosts.length <= 0) return <p className="text-center text-gray-500 col-span-full mt-10">No posts available.</p>

    return (
        <>
            <section className="mt-10 lg:mt-25 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12  ">
                {todaysPosts.map((posts, index) => (
                    <div key={index}>
                        <ListItemPost 
                            post={posts}
                        />
                    </div>
                ))}  
            </section>
            <ButtonCustom href="/posts" label="See More" Ricon={FaArrowRight} ClassName="w-fit h-fit"/>
        </>
    );
}

export default PostList;
