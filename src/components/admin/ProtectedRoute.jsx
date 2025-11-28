import React, { useEffect, useState } from 'react';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        const token = localStorage.getItem('adminToken');
        const authenticated = localStorage.getItem('adminAuthenticated');

        if (!token || authenticated !== 'true') {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        // Перевірка токена на сервері
        try {
            const response = await fetch('/api/admin/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminAuthenticated');
                setIsAuthenticated(false);
            }
        } catch (error) {
            // Якщо сервер не доступний, перевірити чи є токен в localStorage
            // Якщо є - дозволити доступ (для розробки)
            console.warn('Server verification failed:', error);
            // Для розробки: якщо є токен, дозволити доступ
            // В продакшн це треба прибрати і завжди вимагати перевірку
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();

        // Слухати зміни в localStorage (для оновлення після входу)
        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);

        // Також слухати кастомну подію для оновлення в тому ж вікні
        window.addEventListener('adminLogin', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('adminLogin', handleStorageChange);
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-amber-50 text-2xl">Перевірка доступу...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    return children;
};

export default ProtectedRoute;

