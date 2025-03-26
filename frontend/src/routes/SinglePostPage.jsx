import Image from '../components/Image.jsx';
import { Link, useParams } from "react-router-dom";
import MenuActions from "../components/PostMenuActions.jsx";
import PostSearch from '../components/PostSearch.jsx';
import { FaSquareFacebook } from "react-icons/fa6";

import { RiInstagramFill } from "react-icons/ri";
import { useCallback, useEffect, useState } from 'react';



const Post = () => {

    const { slug } = useParams();
    const [postData,setPostData] = useState(null);
    const [author, setAuthor] = useState({});
    const [loading, setLoading] = useState(true);
    const [authorLoading, setAuthorLoading] = useState(true);
    const [error, setError] = useState(false);

    
    const fetchPost = useCallback(async () => 
    {
        try 
        {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/post/${slug}`);
            if (!res.ok) throw new Error("Failed to fetch post");
            const data = await res.json();
            setPostData(data);
        } catch (err) {
            console.error("Error fetching post:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    useEffect(()=>
    {
        if (!postData?.user) return;
        const getAuthor = async() =>
        {
            try
            {
                setAuthorLoading(true);
                const res = await fetch(`http://localhost:5000/api/author/${postData.user}`);
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
            console.log(author)
        }

        getAuthor();
    },[postData])

    if (loading || authorLoading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error loading post.</div>;

    return (

                <div className="flex flex-col gap-10 mt-5">
                {/* Post Details */}
                <div className="relative w-screen h-[400px] object-cover overflow-hidden">
                    <Image path={postData.img} className="shadow-md  h-[500px] w-full  object-cover object-center" />
                    <div className="absolute inset-0 flex items-center justify-center capitalize text-white text-5xl font-bold text-center">
                        {postData.title}
                    </div>
                </div>

                <section className='max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 flex '>
                    
                    <div className='flex flex-col'>
                        <div className='flex gap-8'>
                            <div className='lg:w-3/5 flex flex-col gap-6'>
                                <h1 className='heroHeader text-2xl md:text-3xl xl:text-4xl font-bold leading-tight'>
                                    {postData.desc}
                                </h1>
                                <div className='flex items-center gap-3 text-gray-500 text-sm md:text-base'>
                                    <span>Written by</span>
                                    <Link className="clText  hover:underline">{author.name ? author.name : "John Doe"}</Link>
                                    <span>on</span>
                                    <Link className="clText hover:underline">{postData.subject || "General"}</Link>
                                    <span>• 2 days ago</span>
                                </div>
                            </div>
                        </div>


                            {/* Content Section */}
                        <div className='flex flex-col lg:flex-row gap-8 pt-10 '>
                            <div className='smText lg:text-lg flex flex-col gap-6 text-justify leading-relaxed text-gray-700 w-full lg:max-w-4/5'>
                                {postData.content}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Section */}
                    <div className='hidden lg:block px-2 rounded-lg h-max sticky top-5 max-w-1/4'>
                        {/*Categories*/}
                        <h2 className='smText text-lg font-semibold mb-4 text-gray-500'>Categories</h2>
                        <div className='smText flex flex-wrap gap-2 text-sm text-neutral-500 mb-10'>
                            <Link className='hover:bg-purple-100 rounded-full px-4 py-2 border-2 border-neutral-300'>All</Link>
                            <Link className='hover:bg-purple-100 rounded-full px-4 py-2 border-2 border-neutral-300'>Web Design</Link>
                            <Link className='hover:bg-purple-100 rounded-full px-4 py-2 border-2 border-neutral-300'>Development</Link>
                            <Link className='hover:bg-purple-100 rounded-full px-4 py-2 border-2 border-neutral-300'>Databases</Link>
                            <Link className='hover:bg-purple-100 rounded-full px-4 py-2 border-2 border-neutral-300'>Search Engines</Link>
                            <Link className='hover:bg-purple-100 rounded-full px-4 py-2 border-2 border-neutral-300'>Marketing</Link>
                        </div>

                        <h2 className='smText text-lg font-semibold mb-4 text-gray-500'>Author</h2>
                        <Link to={`/author/${author.authorId}`} className='flex max-h-30 gap-4 mb-4 cursor-pointer overflow-hidden '>
                            <Image path={author.profile} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                            <div className='flex flex-col text-sm tracking-tight text-gray-700 text-ellipsis overflow-hidden'>
                                <h1 className='font-semibold text-neutral-400 hover:underline'>{author.name ? author.name : "John Doe"}</h1>
                                <p className="text-gray-500">{author.desc}</p>
                            </div>
                        </Link>
                        <div className='flex gap-2 mb-4'>
                            <FaSquareFacebook className='text-3xl rounded-xl'/>
                            <RiInstagramFill className='text-3xl'/>
                        </div>

                        <h2 className='smText text-lg font-semibold mb-4 text-gray-500 mt-10'>Action</h2>

                        <MenuActions postId={postData._id}/>
                        
                        <div className='mt-5'>
                            <PostSearch />
                        </div>
                        
                    </div>

                </section>
            </div>
            )
        
};

export default Post;
