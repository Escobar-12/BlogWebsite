import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useSearchParams,useLocation } from "react-router-dom";

const Categories= ()=>
    {
        const [query,setQuery] = useState("");
        const [category,setCategory] = useState("");

        const [searchParams, setSearchParams] = useSearchParams();
        const location = useLocation();

        useEffect(() => {
            setSearchParams(prevParams => {
                const newParams = new URLSearchParams(prevParams);
                if (category) newParams.set("category", category);
                if (query) newParams.set("query", query);
                return newParams;
            });
        }, [category, query, setSearchParams]);

        return(
            <div className="Categories hidden sm:flex bg-white rounded-2xl lg:rounded-full p-3 shadow-lg items-center justify-center gap-4 text-neutral-600">
                <div className="flex-1 flex items-center justify-between flex-wrap space-y-1">
                    <Link to="/posts" className="bg-[#9614e6] text-white rounded-full px-2 lg:py-1" >All Posts</Link>
                    <Link to="/posts?category=general" className="smText cElement rounded-full px-2 lg:py-1" >General</Link>
                    <Link to="/posts?category=health" className="smText cElement rounded-full px-2 lg:py-1" >Health</Link>
                    <Link to="/posts?category=Development" className="smText cElement rounded-full px-2 lg:py-1" >Development</Link>
                    <Link to="/posts?category=Technology" className="smText cElement rounded-full px-2 lg:py-1" >Technology</Link>
                    <Link to="/posts?category=Marketing" className="smText cElement rounded-full px-2 lg:py-1" >Marketing</Link>
                    <Link to="/posts?category=philosophy" className="smText cElement rounded-full px-2 lg:py-1" >Philosophy</Link>
                </div>
                <span className="text-xl font-medium">|</span>
                <div className="SearchBar bg-[#f3f4f6] p-2 rounded-full flex items-center gap-2">
                    <CiSearch className="cursor-pointer text-2xl smText p-1 hover:bg-purple-200/30 rounded-full transition-all duration-300"/>
                    <form onSubmit={(e) => { e.preventDefault(); setQuery(e.target.input.value); }}>
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