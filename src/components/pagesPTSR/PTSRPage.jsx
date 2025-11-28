import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const PTSRPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPost, setCurrentPost] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await api.getPtsrPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching PTSR posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (id && posts.length > 0) {
      const postIndex = posts.findIndex(post => post.id === parseInt(id));
      if (postIndex !== -1) {
        setCurrentPost(postIndex);
      }
    }
  }, [id, posts]);

  const renderSection = (section) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={section.title || section.content}>
            {section.title && <strong>{section.title}</strong>}
            {section.content && <div>{section.content}</div>}
          </div>
        );
      case 'list':
        return (
          <div key={section.title}>
            <strong>{section.title}</strong>
            <ul className="list-disc list-inside pl-4">
              {section.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const nextPost = () => {
    const nextIndex = (currentPost + 1) % posts.length;
    setCurrentPost(nextIndex);
    navigate(`/ptsr/${posts[nextIndex].id}`);
  };

  const prevPost = () => {
    const prevIndex = (currentPost - 1 + posts.length) % posts.length;
    setCurrentPost(prevIndex);
    navigate(`/ptsr/${posts[prevIndex].id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-amber-50 text-2xl">Завантаження...</p>
      </div>
    );
  }

  if (error || posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-400 text-2xl mb-4">
          {error || 'Пости не знайдено'}
        </p>
        <button
          onClick={() => navigate('/ptsr')}
          className="text-amber-50 text-2xl"
        >
          ← Назад
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center sm:m-10">
      <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-4 m-3 sm:p-10 max-w-4xl">
        <h3 className="text-center text-3xl sm:text-5xl text-amber-50 font-bold break-words mb-6">
          {posts[currentPost].title}
        </h3>

        <div className="space-y-6 text-amber-50 text-2xl sm:text-2xl leading-relaxed break-words whitespace-pre-line">
          {posts[currentPost].sections.map((section, index) => (
            <div key={index}>
              {renderSection(section)}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevPost}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Попередній
          </button>
          <span className="text-amber-50 text-lg">
            {currentPost + 1} з {posts.length}
          </span>
          <button
            onClick={nextPost}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Наступний
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/ptsr')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            ← Назад до списку
          </button>
        </div>
      </div>
    </div>
  );
};

export default PTSRPage;