import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";

const BibleSupport = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await api.getBiblePosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Bible posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-amber-50 text-2xl">Завантаження...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-400 text-2xl mb-4">Помилка: {error}</p>
        <Link to="/" className="text-amber-50 text-2xl">← Назад</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="m-1 pr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 m-5 w-full cursor-default">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              {post.title}
            </h2>
            <p className="text-xl text-amber-50 mb-4 text-center ">
              {post.description}
            </p>

          </div>

        ))}
      </div>
      <Link to="/" className="text-amber-50 text-2xl flex justify-center p-15">← Назад</Link>
    </div>
  );
};

export default BibleSupport;
