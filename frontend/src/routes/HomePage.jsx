import useAuth from "../hooks/useAuth";
import {Link} from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import Categories from "../components/Categories";
import Features from "../components/Features";
import PostList from "../components/PostList";
import { CiSearch } from "react-icons/ci";
import AboutLightbi from "../components/aboutSec";

const HomePage = ()=>
{
    return(
        <section className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 w-full flex flex-col gap-4 mt-10 lg:mt-20">
            
            <div className="SearchBar hidden max-sm:flex bg-gray-100 p-2 rounded-full items-center gap-2 mb-10">
                    <CiSearch />
                    <input type="text" placeholder="search" className="flex-1 bg-transparent border-none outline-none"/>
            </div>
            
            <div className="flex gap-4 items-center">
                <Link to="/" className="smText text-neutral-600 font-bold" >Home</Link>
                <span className="text-neutral-600 text-2xl">·</span>
                <span className="clText text-purple-900 font-semibold">Blogs and Articles</span>
            </div>
            
            <div className="flex items-center justify-between gap-6 ">
                <div>
                    <h1 className="heroHeader text-gray-800 text-2xl md-text-5xl lg:text-4xl font-semibold my-3">
                        Lightbi, Unleash Your Voice
                    </h1>
                    <p className=" text-gray-600 text-md md:text-xl">
                        Dive into a world of creativity with Lightbi, your space to share stories, ideas, and inspiration.
                    </p>
                </div>
                {/*animated button*/}
                <Link className="hidden md:block relative ">
                    <svg width="150px" height="150px" viewBox="0 0 200 200" className="animate-spin animeButton">
                        <path id="circlePath" fill="none" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"/>
                        <text>
                            <textPath href="#circlePath" startOffset={"0%"}>Write your story ·</textPath>
                            <textPath href="#circlePath" startOffset={"50%"}>Share your ideas ·</textPath>
                        </text>
                    </svg>
                    <MdArrowOutward className="absolute top-0 right-0 left-0 bottom-0 m-auto bg-purple-800 p-2 rounded-full text-5xl text-white" />                
                </Link>
            </div>
            <Categories/>

            <PostList/>

            <AboutLightbi/>
        </section>
        
    );
}
export default HomePage;
