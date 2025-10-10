
import { Link } from "react-router";
import { POSTprayer } from "../prayerPost";


const PrayerSupport = () => {
  return (
    <div>
      <div className="m-1 pr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {POSTprayer.map((post) => (
          <Link to={`/player/${post.id}`}>
            <div
              key={post.id}
              className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 m-5 max-w-md w-full h-64"
            >
              <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
                {post.title}
              </h2>
              <p className="text-xl text-amber-50 mb-4 text-center">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/" className="text-amber-50 text-2xl flex justify-center p-15">← Назад</Link>
    </div>
  );
};

export default PrayerSupport;
