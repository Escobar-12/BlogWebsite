import { CiSearch } from "react-icons/ci";


const PostSearch= ()=>
    {
        return(
            <div className="SearchBar bg-gray-300/50 p-2 rounded-full flex items-center gap-2 my-4">
                <CiSearch/>
                <input type="text" placeholder="Search a Post" className="bg-transparent border-none outline-none"/>
            </div>
        );
    }
    export default PostSearch;