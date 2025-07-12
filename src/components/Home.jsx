import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex justify-center items-center p-4 sm:p-6 lg:p-30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 py-6 w-full max-w-7xl">
        <Link to="/bible">
          <div className="flex justify-center items-center bg-white/10 backdrop-blur-md border-white/20 rounded-3xl shadow-lg p-6 max-w-md w-full hover:bg-white/40 transition duration-300 ease-in-out hover:underline-offset-0">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              📖 Біблійна підтримка
            </h2>
          </div>
        </Link>
        <Link to="/player">
          <div className="flex justify-center items-center bg-white/10 backdrop-blur-md border-white/20 rounded-3xl shadow-lg p-6 max-w-md w-full hover:bg-white/40 transition duration-300 ease-in-out hover:underline-offset-0">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              🙏 Молитовна підтримка
            </h2>
          </div>
        </Link>
        <Link to="/ptsr">
          <div className="flex justify-center items-center bg-white/10 backdrop-blur-md border-white/20 rounded-3xl shadow-lg p-6 max-w-md w-full hover:bg-white/40 transition duration-300 ease-in-out hover:underline-offset-0">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              🧠 ПТСР підтримка
            </h2>
          </div>
        </Link>
        <Link /*to="/material"*/ className="cursor-not-allowed">
          <div className="flex justify-center items-center bg-white/10 backdrop-blur-md border-white/20 rounded-3xl shadow-lg p-6 max-w-md w-full">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              📁 Матеріали <br />
              <p className="font-thin text-center">(в розробці)</p>
            </h2>
          </div>
        </Link>
      </div>
    </div >
  );
};

export default Home;
