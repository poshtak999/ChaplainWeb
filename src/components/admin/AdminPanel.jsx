import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl text-amber-50 font-bold mb-8 text-center">
          🔐 Адмін-панель
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
          <Link to="/admin/bible">
            <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-8 hover:bg-white/20 transition duration-300 h-full items-stretch">
              <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
                📖 Біблійні пости
              </h2>
              <p className="text-amber-50 text-center text-2xl">
                Додати, редагувати або видалити біблійні вірші
              </p>
            </div>
          </Link>

          <Link to="/admin/prayer">
            <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-8 hover:bg-white/20 transition duration-300 h-full items-stretch">
              <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
                🙏 Молитовні пости
              </h2>
              <p className="text-amber-50 text-center text-2xl">
                Додати, редагувати або видалити молитви
              </p>
            </div>
          </Link>

          <Link to="/admin/ptsr">
            <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-8 hover:bg-white/20 transition duration-300 h-full items-stretch">
              <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center ">
                🧠 ПТСР  пости
              </h2>
              <br />
              <p className="text-amber-50 text-center text-2xl" >
                Додати, редагувати або видалити статті про ПТСР
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-amber-50 text-2xl hover:underline">
            ← Назад на головну
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
