import Image from "./Image";
import { Link } from "react-router-dom";
import { featurePosts } from "../assets/index.js";

const Features = () => {
    return (
        <section className="mt-10 flex flex-col md:flex-row gap-10 text-black">
            {/* Main Post */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <Image 
                    path={'featured1.jpeg'} 
                    className="rounded-3xl object-cover"
                    alt="WeBlog Logo"
                    w="800"
                />
                <div className="flex items-center gap-2 text-sm font-bold lg:text-xl mt-2">
                    <h1 className="font-semibold">01.</h1>
                    <Link to="/web-design" className="text-purple-600">Web Design</Link>
                    <span className="text-pink-500">2 days ago</span>
                </div>
                <Link>
                    <h2 className="font-bold text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h2>
                </Link>
            </div>
            
            {/* Other Posts */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
                {featurePosts && featurePosts.map((post, index) => (
                    <div key={index} className="flex gap-2">
                        <Image 
                            path={post.imgSRC} 
                            className="rounded-3xl object-cover h-30 w-30"
                            alt="WeBlog Logo"
                            w="200"
                            h="200"
                        />
                        <div>
                            <div className="flex items-center gap-2 text-xs tracking-tight font-semibold lg:text-md">
                                <h1 className="font-semibold">0{index + 2}.</h1>
                                <Link to="/web-design" className="text-purple-600">Web Design</Link>
                                <span className="text-pink-500">2 days ago</span>
                            </div>
                            <p className="font-bold">{post.title}</p>
                            <p className="tracking-tight text-sm text-neutral-600 max-h-[60px] overflow-hidden text-ellipsis">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi fugit dolorum mollitia consectetur, voluptatem, quam accusantium dolore iste aspernatur, quia enim. In dolorum iusto debitis aperiam nobis itaque eveniet corporis?
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
