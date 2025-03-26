import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddPost = () => {

    const {auth, checkAuth} = useAuth();
    const navigate = useNavigate();


    const [content, setContent] = useState("");
    const contentRef = useRef();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const [image,setImage] = useState("");
    const imgRef = useRef();

    const [title,setTitle] = useState("");
    const titleRef = useRef();

    const [category,setCategory] = useState("");
    const categoryRef = useRef();

    const [desc,setDesc] = useState("");
    const descRef = useRef();


    useEffect(() => {
        const handleThemeChange = () => {
            setTheme(localStorage.getItem("theme") );
        };

        document.addEventListener("storage", handleThemeChange);
        return () => document.removeEventListener("storage", handleThemeChange);
    });

    const releaseNewPost = async () => {
        if(!auth?.user) return console.log("no user");
        const check = checkAuth();
        if(!check) 
        {
            return console.log("Logged out!");
        }
        try {
            const res = await fetch("http://localhost:5000/api/post", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth?.Access_token}` 
                },
                body: JSON.stringify({
                    img: image,
                    title: title,
                    desc: desc,
                    content: content,
                    subject: category
                })
            });
    
            if (!res.ok)
                {
                    await checkAuth();
                    return console.log("try again")
                } 
    
            const data = await res.json();
            console.log("Post created successfully:", data);
        } catch (err) {
            console.error("Error:", err.message);
        }
    };
    useEffect(()=>
    {
        checkAuth();
    },[])

    const clearData = () =>
    {
        setImage("");
        setTitle("");
        setCategory("");
        setDesc("");
        setContent("");
        imgRef.current.value = "";
        titleRef.current.value = "";
        descRef.current.value = "";
        categoryRef.current.value = "";
        contentRef.current.value = "";
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        releaseNewPost();
    };

    return (
        <section className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 w-full flex flex-col gap-4 mt-10 lg:mt-20 pb-10">
            <h1 className="text-2xl font-semibold">Create a New Post</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <button type="button" className="p-2 bg-blue-500 text-white rounded">
                    Add a Cover Image
                </button>

                <input ref={imgRef}
                    type="text"
                    placeholder="Add Image"
                    className="border border-gray-300 p-2 rounded w-full"
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="My Awesome Idea"
                    className="border border-gray-300 p-2 rounded w-full"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="flex flex-col gap-2">
                    <label htmlFor="category">Choose a Category</label>
                    <select name="cat" id="category" className="border p-2 rounded"
                        onChange={(e) => setCategory(e.target.value)}
                        >
                        <option value="general">General</option>
                        <option value="webdesign">Web Design</option>
                        <option value="development">Development</option>
                        <option value="databases">Databases</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>

                <textarea
                    name="desc"
                    placeholder="A Short Description"
                    className="border border-gray-300 p-2 rounded w-full h-20"
                    onChange={(e) => setDesc(e.target.value)}
                ></textarea>

                {/* TinyMCE Editor */}
                <Editor
                    apiKey="7wzviqicot10iby2yyxptg8c2jxraw7l31elsknva1ptcyjp"
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: "lists link image code",
                        toolbar:
                            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                            content_style: `
                                        body { 
                                            background-color: ${theme === "light" ? "white" : "#2a3343"} !important; 
                                            color: ${theme === "light" ? "black" : "white"} !important;
                                        }
                                    `,
                        }}
                    value={content}
                    onEditorChange={(newValue) => setContent(newValue)}
                />

                <button type="submit" className="p-2 bg-green-500 text-white rounded">
                    Publish Post
                </button>
            </form>

            <button onClick={clearData} className=" w-20 p-2 bg-gray-500 text-white rounded cursor-pointer">
                clear
            </button>

        </section>
    );
};

export default AddPost;
