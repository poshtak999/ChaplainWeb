import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';

const PtsrAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', sections: [] });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [sectionForm, setSectionForm] = useState({
    type: 'text',
    title: '',
    content: '',
    items: [],
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getPtsrPosts();
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

    if (formData.sections.length === 0) {
      setError('Додайте хоча б одну секцію');
      return;
    }

    try {
      if (editingPost) {
        await api.updatePtsrPost(editingPost.id, formData);
        setSuccess('Статтю успішно оновлено!');
      } else {
        await api.createPtsrPost(formData);
        setSuccess('Статтю успішно створено!');
      }
      setFormData({ title: '', sections: [] });
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, sections: [...post.sections] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю статтю?')) {
      return;
    }

    try {
      await api.deletePtsrPost(id);
      setSuccess('Статтю успішно видалено!');
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setFormData({ title: '', sections: [] });
    setError(null);
    setEditingSectionIndex(null);
    setSectionForm({ type: 'text', title: '', content: '', items: [] });
  };

  const addSection = () => {
    const newSection = {
      type: sectionForm.type,
      ...(sectionForm.title && { title: sectionForm.title }),
      ...(sectionForm.type === 'text' && sectionForm.content && { content: sectionForm.content }),
      ...(sectionForm.type === 'list' && {
        title: sectionForm.title,
        items: sectionForm.items.filter(item => item.trim() !== ''),
      }),
    };

    if (editingSectionIndex !== null) {
      const updatedSections = [...formData.sections];
      updatedSections[editingSectionIndex] = newSection;
      setFormData({ ...formData, sections: updatedSections });
      setEditingSectionIndex(null);
    } else {
      setFormData({
        ...formData,
        sections: [...formData.sections, newSection],
      });
    }

    setSectionForm({ type: 'text', title: '', content: '', items: [] });
  };

  const editSection = (index) => {
    const section = formData.sections[index];
    setSectionForm({
      type: section.type,
      title: section.title || '',
      content: section.content || '',
      items: section.items || [],
    });
    setEditingSectionIndex(index);
  };

  const removeSection = (index) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: updatedSections });
  };

  const addListItem = () => {
    setSectionForm({
      ...sectionForm,
      items: [...sectionForm.items, ''],
    });
  };

  const updateListItem = (index, value) => {
    const updatedItems = [...sectionForm.items];
    updatedItems[index] = value;
    setSectionForm({ ...sectionForm, items: updatedItems });
  };

  const removeListItem = (index) => {
    const updatedItems = sectionForm.items.filter((_, i) => i !== index);
    setSectionForm({ ...sectionForm, items: updatedItems });
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
          🧠 Управління ПТСР постами
        </h1>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 mb-8">
          <h2 className="text-3xl text-amber-50 font-bold mb-4">
            {editingPost ? '✏️ Редагувати статтю' : '➕ Додати нову статтю'}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-amber-50 text-lg mb-2">
                Назва статті
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

            {/* Sections Management */}
            <div>
              <label className="block text-amber-50 text-lg mb-2">
                Секції статті ({formData.sections.length})
              </label>

              {/* Add/Edit Section Form */}
              <div className="bg-white/5 rounded-lg p-4 mb-4 space-y-4">
                <div>
                  <label className="block text-amber-50 mb-2">Тип секції</label>
                  <select
                    value={sectionForm.type}
                    onChange={(e) =>
                      setSectionForm({ ...sectionForm, type: e.target.value })
                    }
                    className="w-full p-2 rounded-lg bg-white/20 text-amber-50 border border-white/30"
                  >
                    <option value="text">Текст</option>
                    <option value="list">Список</option>
                  </select>
                </div>

                {sectionForm.type === 'text' && (
                  <>
                    <div>
                      <label className="block text-amber-50 mb-2">
                        Підзаголовок (опціонально)
                      </label>
                      <input
                        type="text"
                        value={sectionForm.title}
                        onChange={(e) =>
                          setSectionForm({ ...sectionForm, title: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-white/20 text-amber-50 border border-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-amber-50 mb-2">Текст</label>
                      <textarea
                        value={sectionForm.content}
                        onChange={(e) =>
                          setSectionForm({ ...sectionForm, content: e.target.value })
                        }
                        rows="4"
                        className="w-full p-2 rounded-lg bg-white/20 text-amber-50 border border-white/30"
                        required
                      />
                    </div>
                  </>
                )}

                {sectionForm.type === 'list' && (
                  <>
                    <div>
                      <label className="block text-amber-50 mb-2">
                        Заголовок списку
                      </label>
                      <input
                        type="text"
                        value={sectionForm.title}
                        onChange={(e) =>
                          setSectionForm({ ...sectionForm, title: e.target.value })
                        }
                        className="w-full p-2 rounded-lg bg-white/20 text-amber-50 border border-white/30"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-amber-50 mb-2">
                        Елементи списку
                      </label>
                      {sectionForm.items.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => updateListItem(index, e.target.value)}
                            className="flex-1 p-2 rounded-lg bg-white/20 text-amber-50 border border-white/30"
                            placeholder={`Елемент ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeListItem(index)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 rounded-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addListItem}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        + Додати елемент
                      </button>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={addSection}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  {editingSectionIndex !== null
                    ? '💾 Зберегти секцію'
                    : '➕ Додати секцію'}
                </button>
                {editingSectionIndex !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSectionIndex(null);
                      setSectionForm({
                        type: 'text',
                        title: '',
                        content: '',
                        items: [],
                      });
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
                  >
                    Скасувати
                  </button>
                )}
              </div>

              {/* Existing Sections */}
              {formData.sections.length > 0 && (
                <div className="space-y-2">
                  {formData.sections.map((section, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-3 flex justify-between items-start"
                    >
                      <div className="flex-1">
                        {section.title && (
                          <strong className="text-amber-50 block mb-1">
                            {section.title}
                          </strong>
                        )}
                        {section.type === 'text' && section.content && (
                          <p className="text-amber-50 text-sm">
                            {section.content.substring(0, 100)}...
                          </p>
                        )}
                        {section.type === 'list' && section.items && (
                          <p className="text-amber-50 text-sm">
                            Список з {section.items.length} елементів
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => editSection(index)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {editingPost ? '💾 Зберегти зміни' : '➕ Створити статтю'}
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
            Існуючі статті ({posts.length})
          </h2>
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6"
            >
              <h3 className="text-2xl text-amber-50 font-bold mb-2">
                {post.title}
              </h3>
              <p className="text-amber-50 text-sm mb-4">
                {post.sections.length} секцій
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

export default PtsrAdmin;

