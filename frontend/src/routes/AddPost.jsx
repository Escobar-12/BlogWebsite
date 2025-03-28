import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useAuth from "../hooks/useAuth";
import { IKContext, IKUpload } from "imagekitio-react";

let UploadState = "idle" | "uploading" | "success" | "error";

const AddPost = () => {
    const { auth, checkAuth } = useAuth();

    const urlEndpoint = "https://ik.imagekit.io/zvk2bqqlk/";
    const publicKey = "public_FdHfK7G+IU72rIhgniEYB3S//8M=";

    const [content, setContent] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const [image, setImage] = useState(null);
    const [uploadState, setUploadState] = useState("idle");

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("general");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        const handleThemeChange = () => {
            setTheme(localStorage.getItem("theme"));
        };

        window.addEventListener("storage", handleThemeChange);
        return () => window.removeEventListener("storage", handleThemeChange);
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    const ImgKitAuth = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/imgKit");
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Request failed with status ${res.status}: ${errorText}`);
            }

            const data = await res.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    const releaseNewPost = async () => {
        if (!auth?.user) {
            console.log("No user found");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/post/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    img: image,
                    title,
                    desc,
                    content,
                    subject: category,
                    user: auth.id,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create post");
            }

            const data = await res.json();
            console.log("Post created successfully:", data);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        releaseNewPost();
    };

    const isFormComplete = uploadState === "success" && title && desc && content;

    return (
        <section className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 w-full flex flex-col gap-4 mt-10 lg:mt-20 pb-10">
            <h1 className="text-2xl font-semibold">Create a New Post</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={ImgKitAuth}>
                    <IKUpload
                        fileName="uploaded-image.png"
                        onUploadStart={() => setUploadState("uploading")} 
                        onSuccess={(res) => {
                            setUploadState("success");
                            setImage(res.name); 
                        }}
                        onError={(err) => {
                            setUploadState("error");
                            console.log("Image Upload Error:", err);
                        }}
                    />
                </IKContext>

                <input
                    type="text"
                    placeholder="My Awesome Idea"
                    className="border border-gray-300 p-2 rounded w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="flex flex-col gap-2">
                    <label htmlFor="category">Choose a Category</label>
                    <select
                        id="category"
                        className="border p-2 rounded CategoryList"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="general">General</option>
                        <option value="health">Health</option>
                        <option value="development">Development</option>
                        <option value="technology">Technology</option>
                        <option value="marketing">Marketing</option>
                        <option value="philosophy">Philosophy</option>
                    </select>
                </div>

                <textarea
                    placeholder="A Short Description"
                    className="border border-gray-300 p-2 rounded w-full h-20"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                ></textarea>

                {/* TinyMCE Editor */}
                <Editor
                    apiKey="7wzviqicot10iby2yyxptg8c2jxraw7l31elsknva1ptcyjp"
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: "lists link image",
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

                <button
                    type="submit"
                    className={`p-2 rounded ${
                        isFormComplete ? "bg-green-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                    disabled={!isFormComplete || uploadState === "uploading"}
                >
                    {uploadState === "uploading" ? "Uploading..." : "Publish Post"}
                </button>
            </form>
        </section>
    );
};

export default AddPost;
