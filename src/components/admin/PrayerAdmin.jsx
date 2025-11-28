import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';

const PrayerAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getPrayerPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (editingPost) {
        await api.updatePrayerPost(editingPost.id, formData);
        setSuccess('Молитву успішно оновлено!');
      } else {
        await api.createPrayerPost(formData);
        setSuccess('Молитву успішно створено!');
      }
      setFormData({ title: '', description: '' });
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, description: post.description });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю молитву?')) {
      return;
    }

    try {
      await api.deletePrayerPost(id);
      setSuccess('Молитву успішно видалено!');
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setFormData({ title: '', description: '' });
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-amber-50 text-2xl">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl text-amber-50 font-bold mb-8 text-center">
          🙏 Управління молитовними постами
        </h1>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 mb-8">
          <h2 className="text-3xl text-amber-50 font-bold mb-4">
            {editingPost ? '✏️ Редагувати молитву' : '➕ Додати нову молитву'}
          </h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4">
              <p className="text-green-200">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-amber-50 text-lg mb-2">
                Назва молитви
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/20 text-amber-50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-amber-50 text-lg mb-2">
                Текст молитви
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="6"
                className="w-full p-3 rounded-lg bg-white/20 text-amber-50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {editingPost ? '💾 Зберегти зміни' : '➕ Створити молитву'}
              </button>
              {editingPost && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  ❌ Скасувати
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-3xl text-amber-50 font-bold mb-4">
            Існуючі молитви ({posts.length})
          </h2>
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6"
            >
              <h3 className="text-2xl text-amber-50 font-bold mb-2">
                {post.title}
              </h3>
              <p className="text-amber-50 mb-4 whitespace-pre-line">
                {post.description}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  ✏️ Редагувати
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  🗑️ Видалити
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/admin" className="text-amber-50 text-2xl hover:underline">
            ← Назад до адмін-панелі
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrayerAdmin;

