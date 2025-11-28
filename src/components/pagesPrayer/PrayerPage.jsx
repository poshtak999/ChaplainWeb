import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../utils/api";
import ErrorBlock from "../ErrorBlock";

const PrayerPage = () => {
    const { id } = useParams();
    const [prayer, setPrayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrayer = async () => {
            try {
                setLoading(true);
                const data = await api.getPrayerPost(id);
                setPrayer(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching Prayer post:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPrayer();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-amber-50 text-2xl">Завантаження...</p>
            </div>
        );
    }

    if (error || !prayer) {
        return <ErrorBlock />;
    }

    return (
        <div className="flex flex-col justify-center items-center sm:m-10 ">
            <div className="text-amber-50 bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-4 m-3 sm:p-10 max-w-4xl">

                <h1 className="text-center text-5xl font-bold mb-6">{prayer.title}</h1>
                <p className="text-4xl whitespace-pre-line">{prayer.description}</p></div>
            <Link to="/prayer" className="text-amber-50 text-2xl p-15 ">← Назад</Link>
        </div>
    );
};

export default PrayerPage;