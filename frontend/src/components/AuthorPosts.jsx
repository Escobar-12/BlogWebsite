import ListItemPost from "./listItemPost";
import { useState, useEffect } from "react";

const AuthorPostList = ({ Post }) => {
    const [authorPosts, setAuthorPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!Post || Post.length === 0) {
            setLoading(false);
            return;
        }

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const postData = await Promise.all(
                    Post.map(async (postId) => {
                        const res = await fetch(`http://localhost:5000/api/post/id/${postId}`);
                        if (!res.ok) {
                            console.log("Failed to fetch post with ID:", postId);
                            return null; 
                        }
                        return res.json();
                    })
                );
                setAuthorPosts(postData.filter(post => post !== null));
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [Post]);


    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!authorPosts || authorPosts.length === 0) 
        return <p className="text-center text-gray-500 col-span-full mt-10">No posts available.</p>;

    return (
        <section className="mt-10 lg:mt-25 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 px-4 md:px-8">
            {authorPosts.map((post, index) => (
                <div key={index}>
                    <ListItemPost post={post} />
                </div>
            ))}
        </section>
    );
};

export default AuthorPostList;
