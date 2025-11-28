import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            // Перевірка чи відповідь JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Сервер повернув некоректну відповідь. Перевірте, чи запущений backend сервер.');
            }

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Невірний пароль');
            }

            const data = await response.json();
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminAuthenticated', 'true');

            // Викликаємо кастомну подію для оновлення стану в інших компонентах
            window.dispatchEvent(new Event('adminLogin'));

            // Невелика затримка для оновлення стану
            setTimeout(() => {
                navigate('/admin');
            }, 100);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-8">
            <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-8 max-w-md w-full">
                <h1 className="text-4xl text-amber-50 font-bold mb-6 text-center">
                    🔐 Вхід в адмін-панель
                </h1>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
                        <p className="text-red-200">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-amber-50 text-lg mb-2">
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-white/20 text-amber-50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Введіть пароль"
                            required
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        {loading ? 'Перевірка...' : '🔓 Увійти'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-amber-50 hover:underline"
                    >
                        ← Назад на головну
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

