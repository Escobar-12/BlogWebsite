import { useEffect, useState } from "react";
import PostPageList from "../components/SinglePostitem";
import Image from "../components/Image";
import { useNavigate, useSearchParams } from "react-router-dom"
import Categories from "../components/Categories";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [PageData, setPageData] = useState({});
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [page,setPage] = useState(initialPage); 
    const [screenSize, setScreenSize] = useState(window.innerWidth <= 768 ? 0 : 1);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const category = searchParams.get("category") || "";
                const response = await fetch(`http://localhost:5000/api/post?page=${page}&category=${category}`);
                if (!response.ok) throw new Error("Failed to fetch posts");

                const data = await response.json();
                setPosts([]);
                setPosts(data.posts.reverse());
                setPageData(data);
                
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        getAllPosts();
    }, [page,setSearchParams]);

    
    useEffect(() => {
        setPosts([]);
        setPage(1); 
    }, [searchParams.get("category")]); 
    
    useEffect(() => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("page",page);
            return newParams;
        });
    }, [setSearchParams]);

    useEffect(() => {
        return () => {
            setSearchParams({});
        };
    }, []);

    const clipText = (text,maxLength) =>
        {
            if(!text) return "";
            return text.length > maxLength ? text.slice(0,maxLength) + "..." : text;
        }

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }); 
    };

    {/*Screen Format*/}

    useEffect(()=>
    {
        const handleScreenResize = () =>
        {
            if(window.innerWidth <= 768)
            {
                setScreenSize(0);
            }
            else{
                setScreenSize(1);
                window.location.reload();
            }
        }
        
        window.addEventListener("resize", handleScreenResize)
        return() =>
        {
            window.removeEventListener("resize", handleScreenResize)
        }
    },[])

    {/*Pagination*/}
    const MAX_VISIBLE_PAGES = 5;

    const renderPagination = () => {
        const totalPages = PageData.totalPages || 1;
        if (totalPages <= 1) return null;

        let pages = [];
        let start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
        let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

        if (end - start + 1 < MAX_VISIBLE_PAGES) {
            start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
        }

        if (start > 1) pages.push(1);
        if (start > 2) pages.push("...");

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) pages.push("...");
        if (end < totalPages) pages.push(totalPages);

        return pages.map((p, i) =>
            typeof p === "number" ? (
                <button
                    key={i}
                    onClick={() => {
                        setPage(p);
                        setPosts([]);
                    }}
                    className={`px-4 py-2 rounded-lg ${page === p ? "bg-purple-600 " : "bg-gray-200"}`}
                >
                    {p}
                </button>
            ) : (
                <span key={i} className="px-4 py-2">...</span>
            )
        );
    };




    if(posts.length <= 0) return <p className="text-center text-gray-500 col-span-full">No posts available.</p>

    return (
        <section className="max-w-[1240px] mx-auto my-10 px-4 md:px-8 space-y-10">

            <Categories/>  

            {posts.length > 0 && (
                <div className="PostList hidden md:flex w-full h-[45vh] shadow-xl rounded-2xl hover:shadow-2xl hover:scale-[101%] transition-all duration-300 overflow-hidden"
                    onClick={() => navigate(`/posts/${posts[0].slug}`)}>
                    <div className="flex-shrink-0 w-full m-3 flex gap-5 items-center">
                        <Image path={posts[0].img} className="object-cover max-w-1/3 h-full rounded-xl" />
                        <div className="flex flex-col overflow-hidden">
                            <h1 className="heroHeader text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2 capitalize">
                                {posts[0]?.title}
                            </h1>
                            <p className="heroHeader text-xl font-semibold">{formatDate(posts[0]?.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <div className="list space-y-4 max-sm:flex flex-col items-center">
                    {posts.slice(screenSize).map((post,i) => (
                        <div key={i}>
                            <PostPageList post={post} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 justify-center mt-30 mb-10 text-white text-lg font-bold">
                {renderPagination()}
            </div>
        </section>
    );
};

export default PostList;
