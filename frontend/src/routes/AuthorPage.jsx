import { useParams } from "react-router-dom";
import Image from "../components/Image";
import { useState,useEffect } from "react";
import AuthorPostList from "../components/AuthorPosts";


const AuthorPage = ()=>
{
    const { authorId } = useParams();
    const [author, setAuthor] = useState(null);
    const [authorLoading, setAuthorLoading] = useState(true);

    useEffect(()=>
        {
            const getAuthor = async() =>
            {
                if(!authorId) return console.log("No author selected");
                try
                {
                    setAuthorLoading(true);
                    const res = await fetch(`http://localhost:5000/api/author/${authorId}`);
                    if(!res.ok) return new Error("Failed to fetch author");
                    
                    const data = await res.json();
                    setAuthor(data);
                }
                catch (error) {
                    console.error("Error fetching post:", error);
                }
                finally {
                    setAuthorLoading(false);
                }
            }
            getAuthor();
        },[])

        if (authorLoading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <section className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 w-full flex flex-col gap-4 mt-10 lg:mt-20 pb-10">
            <div className="flex flex-col lg:flex-row gap-10 ">
                <div className="rounded-full max-lg:self-center w-4xl max-w-70">
                    <Image 
                        path={author.profile || "user.png"} 
                        className="rounded-full object-cover shadow"  
                    />
                </div>
                <div className="flex flex-col space-y-10">
                    <h1>{author.name}</h1>
                    <p>{author.desc}</p>
                </div>
            </div>
            <div>
                <AuthorPostList Post={author.createdPosts}/>
            </div>
        </section>
    );
}

export default AuthorPage;