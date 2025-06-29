import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="">
      <Link to="/">
        <h1 className="text-center font-extrabold text-7xl text-amber-50 mb-10 p-5">
          Chaplain+ 🇺🇦
        </h1>
      </Link>
      <p className="text-center text-5xl text-amber-50 font-stretch-70% mb-4">
        Платформа для капеланів України
      </p>
    </header>
  );
};

export default Header;
