import { useParams, Link } from "react-router-dom";
import { POSTprayer } from "/Users/admin/Desktop/Chaplain+/src/prayerPost.js";
import ErrorBlock from "../ErrorBlock";

const PrayerPage = () => {
    const { id } = useParams();
    const prayer = POSTprayer.find((p) => p.id === Number(id));

    if (!prayer) return <ErrorBlock />;

    return (
        <div className="flex flex-col justify-center items-center sm:m-10 ">
            <div className="text-amber-50 bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-4 m-3 sm:p-10 max-w-4xl">

                <h1 className="text-center text-4xl font-bold mb-6">{prayer.title}</h1>
                <p className="text-3xl whitespace-pre-line">{prayer.description}</p></div>
            <Link to="/player" className="text-amber-50 text-2xl ">← Назад</Link>
        </div>
    );
};

export default PrayerPage;
