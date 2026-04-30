import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    bible: 0,
    prayer: 0,
    ptsr: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [bible, prayer, ptsr] = await Promise.all([
          api.getBiblePosts(),
          api.getPrayerPosts(),
          api.getPtsrPosts(),
        ]);
        setStats({
          bible: bible.length,
          prayer: prayer.length,
          ptsr: ptsr.length,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const total = useMemo(
    () => stats.bible + stats.prayer + stats.ptsr,
    [stats.bible, stats.prayer, stats.ptsr]
  );

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch {
      // Ignore network errors here, local cleanup is primary.
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminAuthenticated');
      window.dispatchEvent(new Event('adminLogin'));
      navigate('/');
    }
  };

  const sections = [
    {
      to: '/admin/bible',
      icon: '📖',
      title: 'Біблійні вірші',
      description: 'Керуйте духовною підтримкою та цитатами.',
      count: stats.bible,
      accent: 'from-blue-500/80 to-indigo-700/70',
    },
    {
      to: '/admin/prayer',
      icon: '🙏',
      title: 'Молитви',
      description: 'Додавайте і редагуйте молитви для військових.',
      count: stats.prayer,
      accent: 'from-emerald-500/80 to-teal-700/70',
    },
    {
      to: '/admin/ptsr',
      icon: '🧠',
      title: 'ПТСР матеріали',
      description: 'Оновлюйте блоки самодопомоги та підтримки.',
      count: stats.ptsr,
      accent: 'from-amber-500/80 to-orange-700/70',
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-3xl border border-white/25 bg-slate-950/35 backdrop-blur-md p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-amber-200/90 text-sm uppercase tracking-[0.2em]">
                Admin dashboard
              </p>
              <h1 className="text-4xl md:text-5xl text-amber-50 font-extrabold mt-2">
                Керування контентом
              </h1>
              <p className="text-amber-100/85 mt-3 text-lg">
                Оновлюйте вірші, молитви і ПТСР матеріали в одному місці.
              </p>
            </div>

            <div className="flex gap-3">

              <button
                onClick={handleLogout}
                className="rounded-xl bg-rose-600/80 hover:bg-rose-500 px-10 py-5 text-white font-semibold transition cursor-auto"
              >
                Вийти
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <p className="text-amber-100/80 text-sm">Всього записів</p>
            <p className="text-4xl text-white font-black mt-1">{isLoading ? '...' : total}</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <p className="text-amber-100/80 text-sm">Біблія</p>
            <p className="text-4xl text-white font-black mt-1">{isLoading ? '...' : stats.bible}</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <p className="text-amber-100/80 text-sm">Молитви</p>
            <p className="text-4xl text-white font-black mt-1">{isLoading ? '...' : stats.prayer}</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <p className="text-amber-100/80 text-sm">ПТСР</p>
            <p className="text-4xl text-white font-black mt-1">{isLoading ? '...' : stats.ptsr}</p>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-4">
            <p className="text-red-100">
              Не вдалося завантажити статистику: {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.to} to={section.to}>
              <div
                className={`h-full rounded-3xl p-6 border border-white/25 bg-gradient-to-br ${section.accent} shadow-xl transition hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-2xl font-bold">
                    {section.icon} {section.title}
                  </h2>
                  <span className="text-white/90 font-black text-2xl">
                    {isLoading ? '...' : section.count}
                  </span>
                </div>
                <p className="text-white/90 mt-4 text-lg">{section.description}</p>
                <p className="text-white font-semibold mt-6">Відкрити розділ →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
