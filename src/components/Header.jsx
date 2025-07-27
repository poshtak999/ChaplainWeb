import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="relative mb-10">
      <div className="flex justify-center items-center relative">
        <Link to="/">
          <h1 className="font-extrabold text-7xl text-amber-50 p-5">
            Chaplain+ 🇺🇦
          </h1>
        </Link>
        {/* <div className="absolute right-0 m-5">
          <button className="text-3xl text-amber-50 border-3 p-4 rounded-3xl m-5">
            Вхід
          </button>
          <button className="text-3xl text-amber-50 border-3 p-4 rounded-3xl ">
            Регістрація
          </button>
        </div> */}

      </div>
      <p className="text-center text-5xl text-amber-50 font-stretch-70% mb-4 cursor-default">
        Платформа для капеланів України
      </p>

    </header>
  );
};

export default Header;
