import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useSearchParams,useLocation, useNavigate } from "react-router-dom";

const Categories= ()=>
    {
        const navigate = useNavigate();
        const [search,setSearch] = useState("");
        const [category,setCategory] = useState("");
        const location = useLocation();

        const [searchParams, setSearchParams] = useSearchParams();

        useEffect(() => 
        {
            setSearchParams(prevParams => {
                const newParams = new URLSearchParams(prevParams);
                if (category) newParams.set("category", category);
                if (search) newParams.set("search", search);
                return newParams;
            });
            return () => {
                searchParams.delete("category")
                searchParams.delete("search")
            };
        }, [category, search, setSearchParams]);

        return(
            <div className="Categories hidden sm:flex bg-white rounded-2xl lg:rounded-full p-3 shadow-lg items-center justify-center gap-4 text-neutral-600">
                <div className="flex-1 flex items-center justify-between flex-wrap space-y-1">
                    <Link to="/posts" className={`bg-[#9614e6] text-white rounded-full px-2 lg:py-1`} >All Posts</Link>
                    <Link to="/posts?category=general" className={`smText cElement rounded-full px-2 lg:py-1 ${searchParams.get("category") === "general" ? "bg-[#bf83d1]":""}`} >General</Link>
                    <Link to="/posts?category=health" className={`smText cElement rounded-full px-2 lg:py-1 ${searchParams.get("category") === "health" ? "bg-[#bf83d1]":""}`} >Health</Link>
                    <Link to="/posts?category=Development" className={`smText cElement rounded-full px-2 lg:py-1 ${searchParams.get("category") === "Development" ? "bg-[#bf83d1]":""}`} >Development</Link>
                    <Link to="/posts?category=Technology" className={`smText cElement rounded-full px-2 lg:py-1 ${searchParams.get("category") === "Technology" ? "bg-[#bf83d1]":""}`} >Technology</Link>
                    <Link to="/posts?category=Marketing" className={`smText cElement rounded-full px-2 lg:py-1 ${searchParams.get("category") === "Marketing" ? "bg-[#bf83d1]":""}`} >Marketing</Link>
                    <Link to="/posts?category=philosophy" className={`smText cElement rounded-full px-2 lg:py-1 ${searchParams.get("category") === "philosophy" ? "bg-[#bf83d1]":""}`} >Philosophy</Link>
                </div>
                <span className="text-xl font-medium">|</span>
                <div className="SearchBar bg-[#f3f4f6] p-2 rounded-full flex items-center gap-2">
                    <CiSearch className="cursor-pointer text-2xl smText p-1 hover:bg-purple-200/30 rounded-full transition-all duration-300"/>
                    <form onSubmit={(e) => { e.preventDefault(); if(location.pathname !== "posts")navigate("/posts"); setSearch(e.target.input.value); }}>
                        <input 
                            id="input" 
                            type="text" 
                            placeholder="search" 
                            className="bg-transparent border-none outline-none smText" 
                        />
                    </form>
                </div>
            </div>
        );
    }
export default Categories;