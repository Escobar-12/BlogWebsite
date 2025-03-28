import Image from "./Image";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const clipText = (text, maxLength = 90) => {
    if (!text) return "";
    return {
        bigger: text.length > maxLength,
        text: text.length > maxLength ? text.slice(0, maxLength) : text
    };
};

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};

const ListItemPost = ({ post }) => {
    const navigate = useNavigate();
    return (
        <div className="PostList flex flex-col justify-between h-110 max-w-150 rounded-md shadow-xl cursor-pointer overflow-hidden hover:scale-101 hover:shadow-2xl transition-all duration-200 ease-in-out"
            onClick={() => navigate(`/posts/${post.slug}`)}>
            
            <div className="flex flex-col gap-2 px-4 py-4 overflow-hidden">
                <Link to={`/posts/${post.slug}`} className="smText text-xl font-semibold text-neutral-600 text-ellipsis overflow-hidden">
                    {clipText(post.title, 45).text}
                    {clipText(post.title, 45).bigger && "..."}
                </Link>
                
                <span className="text-xs text-neutral-400">{formatDate(post.updatedAt)}</span>
                
                <p className="tracking-tight text-sm text-neutral-500">
                    {clipText(post.desc, 100).text}
                    {clipText(post.desc, 100).bigger && "..."}
                </p>
                
                <Link to={`/posts/${post.slug}`} className="hover:text-neutral-500/90 text-sm text-neutral-500/70 font-semibold">
                    Read More <FaArrowRight className="text-xs inline m-1"/>
                </Link>
            </div>

            <Image path={post.img} className="object-cover w-full rounded-b-md h-50 "/>
        </div>
    );
};

export default ListItemPost;
