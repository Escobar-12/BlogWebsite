import React from "react";

const AboutLightbi = () => {
    return (
        <section id="about" className="PostList max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 mt-30 w-full p-6 bg-white shadow-lg rounded-2xl">
            <h1 className="heroHeader text-3xl font-bold text-center mb-6">
                About Lightbi
            </h1>
            <p className="text-gray-600 text-lg mb-4">
                Welcome to <span className="font-semibold">Lightbi</span>, a platform designed for writers, thinkers, and storytellers to share their ideas with the world. Whether you’re an aspiring blogger, a seasoned writer, or just someone who loves expressing thoughts, Lightbi is the perfect space to create, connect, and inspire.
            </p>
            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">Our Mission</h2>
            <ul className="list-disc list-inside text-gray-600 text-lg mb-4">
                <li><strong>Seamless Blogging:</strong> A clean and intuitive interface to write and publish effortlessly.</li>
                <li><strong>Community Engagement:</strong> Connect with like-minded individuals, read diverse perspectives, and share your insights.</li>
                <li><strong>Secure & Smooth Experience:</strong> Enjoy a hassle-free blogging journey with secure authentication.</li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">Why Choose Lightbi?</h2>
            <ul className="list-disc list-inside text-gray-600 text-lg mb-4">
                <li><strong>Easy Sign-up & Posting:</strong> Get started in minutes and start sharing your thoughts.</li>
                <li><strong>Interactive Features:</strong> Engage with comments, likes, and discussions.</li>
                <li><strong>Growth & Discovery:</strong> Explore a wide range of blogs and get your content discovered.</li>
            </ul>
            <p className="text-gray-600 text-lg mt-4">
                Whether you're here to read, write, or connect, <span className="font-semibold">Lightbi</span> is your digital home for creativity. Join us and start your blogging journey today!
            </p>
        </section>
    );
};

export default AboutLightbi;
