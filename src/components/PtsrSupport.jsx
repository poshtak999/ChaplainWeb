import React from "react";
import { Link } from "react-router";

const PtsrSupport = () => {
  return (
    <div>
      <div className="m-15 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/post1">
          <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 m-5 max-w-md w-full hover:bg-white/30 transition duration-300 ease-in-out">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              Що таке ПТСР: природа, симптоми, механізми
            </h2>
          </div>
        </Link>

        <Link to="/post2">
          <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 m-5 max-w-md w-full hover:bg-white/30 transition duration-300 ease-in-out">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              Як спілкуватись з людиною з ПТСР
            </h2>
          </div>
        </Link>

        <Link to="/post3">
          <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 m-5 max-w-md w-full hover:bg-white/30 transition duration-300 ease-in-out">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              Роль віри у відновленні після ПТСР
            </h2>
          </div>
        </Link>

        <Link to="/post4">
          <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 m-5 max-w-md w-full hover:bg-white/30 transition duration-300 ease-in-out">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              Базові методи саморегуляції для тих, хто має ПТСР
            </h2>
          </div>
        </Link>

        <Link to="/post5">
          <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 m-5 max-w-md w-full hover:bg-white/30 transition duration-300 ease-in-out">
            <h2 className="text-3xl text-amber-50 font-bold mb-4 text-center">
              Як капелан або волонтер може бути корисним у процесі реабілітації
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PtsrSupport;
