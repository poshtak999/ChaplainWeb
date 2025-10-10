import React from 'react';
import { Link } from 'react-router';

const ErrorBlock = () => {
    return (
        <div className='flex flex-col text-red-800 justify-center items-center text-5xl text-center m-5'>
            <p className='m-10 p-5'>
                <span className='text-6xl'>🔥</span>
                <br />
                404 — Сторінку зруйновано
                <br />
                Ціль порожня. <br />
                <br />
                Але ваша місія продовжується
            </p>
            <Link to='/ptsr'>
                <h1 className='text-5xl font-extrabold text-blue-50'>
                    <span className='text-8xl'>⬅︎</span>
                </h1>
            </Link>
        </div>
    );
}

export default ErrorBlock;
