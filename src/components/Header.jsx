import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      const authenticated = localStorage.getItem('adminAuthenticated');
      setIsAuthenticated(!!token && authenticated === 'true');
    };

    checkAuth();

    // Слухати зміни в localStorage та кастомну подію входу
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('adminLogin', handleStorageChange);

    // Перевіряти кожні 30 секунд
    const interval = setInterval(checkAuth, 30000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminLogin', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="relative mb-10 pt-5">
      <div className="flex justify-center items-center relative">
        <Link to="/">
          <h1 className="font-extrabold text-5xl md:text-7xl text-amber-50 p-5">
            Chaplain+ 🇺🇦
          </h1>
        </Link>
        <div className="absolute right-0 m-5">
          {/* {isAuthenticated ? (
            <div className="flex gap-3">
              <Link to="/admin">
                <button className="text-xl text-amber-50 border-2 border-amber-50 p-4 rounded-3xl hover:bg-white/20 transition duration-300">
                  🔐 Адмін
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xl text-amber-50 border-2 p-4 rounded-3xl hover:bg-red-500/20 transition duration-300"
                title="Вийти"
              >
                🚪
              </button>
            </div>
          ) : (
            <Link to="/admin">
              <button className="text-xl text-amber-50 border-2 border-amber-50 p-3 rounded-3xl hover:bg-white/20 transition duration-300">
                🔐 Адмін
              </button>
            </Link>
          )} */}
        </div>
      </div>
      <p className="text-center text-5xl text-amber-50 font-stretch-70% mb-4 cursor-default">
        Платформа для капеланів України
      </p>
    </header>
  );
};

export default Header;
