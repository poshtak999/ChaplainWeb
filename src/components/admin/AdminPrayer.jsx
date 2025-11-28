import { useState, useEffect } from "react";
import { Link } from "react-router";
import { api } from "../../utils/api";

const AdminPrayer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [showForm, setShowForm] = useState(false);

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
    try {
      if (editingPost) {
        await api.updatePrayerPost(editingPost.id, formData);
      } else {
        await api.createPrayerPost(formData);
      }
      setFormData({ title: "", description: "" });
      setEditingPost(null);
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, description: post.description });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Ви впевнені, що хочете видалити цей пост?")) return;
    try {
      await api.deletePrayerPost(id);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "" });
    setEditingPost(null);
    setShowForm(false);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl text-amber-50 font-bold">
            🙏 Управління молитовними постами
          </h1>
          <Link to="/admin" className="text-amber-50 text-xl hover:underline">
            ← Адмін-панель
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <button
          onClick={() => {
            setShowForm(true);
            setEditingPost(null);
            setFormData({ title: "", description: "" });
          }}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          + Додати новий пост
        </button>

        {showForm && (
          <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 mb-6">
            <h2 className="text-3xl text-amber-50 font-bold mb-4">
              {editingPost ? "Редагувати пост" : "Додати новий пост"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-amber-50 mb-2">Назва:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-white/20 text-amber-50 border border-white/30"
                  required
                />
              </div>
              <div>
                <label className="block text-amber-50 mb-2">Опис:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-white/20 text-amber-50 border border-white/30 h-32"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  {editingPost ? "Оновити" : "Створити"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
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
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Редагувати
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPrayer;

