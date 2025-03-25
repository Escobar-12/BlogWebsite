import Image from "./Image";
import { useNavigate } from "react-router-dom";

const PostPageList = ({ post }) => {
    const navigate = useNavigate();

    return (
        <div className="PostList flex flex-col gap-3 max-w-80 max-sm:max-w-120 h-fit rounded-2xl shadow-lg hover:shadow-xl hover:scale-[101%] transition-all duration-300" 
            onClick={() => navigate(`/posts/${post.slug}`)}>
            <div className="flex-shrink-0 w-full ">
                <Image path={post.img} className="object-cover w-full h-full rounded-t-2xl"/>
            </div>

            <div className="flex flex-col flex-grow p-2 pb-3">
                <h1 className="smText text-md lg:text-xl font-semibold text-gray-800 mb-2 capitalize">{post.title}</h1>
                <p className="text-sm font-semibold capitalize text-gray-400">{post.auther || "john doe"}</p>
            </div>
        </div>
    );
};

export default PostPageList;
