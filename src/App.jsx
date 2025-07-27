import Home from './components/Home';
import Header from './components/Header';
import BibleSupport from './components/BibleSupport';
import PlayerSupport from './components/PrayerSupport';
import MaterialPage from './components/MaterialPage';

//Routing
import { Link, Route, Routes } from 'react-router';
import PtsrSupport from './components/PtsrSupport';
import Post1 from './components/pagesPTSR/Post1';
import Post2 from './components/pagesPTSR/Post2';
import Post3 from "./components/pagesPTSR/Post3";
import Post4 from "./components/pagesPTSR/Post4";
import Post5 from "./components/pagesPTSR/Post5";
import Post6 from "./components/pagesPTSR/Post6";

function App() {
  console.log("work")
  return (
    <>
      <div className='min-h-screen bg-gradient-to-b to-yellow-400 from-blue-800'>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/bible' element={<BibleSupport />} />
          <Route path='/player' element={<PlayerSupport />} />
          <Route path='/ptsr' element={<PtsrSupport />} />
          <Route path='/post1' element={<Post1 />} />
          <Route path="/post2" element={<Post2 />} />
          <Route path="/post3" element={<Post3 />} />
          <Route path="/post4" element={<Post4 />} />
          <Route path="/post5" element={<Post5 />} />
          <Route path="/post6" element={<Post6 />} />
          <Route path='/material' element={<MaterialPage />} />
          <Route
            path='*'
            element={
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
                <Link to='/'>
                  <h1 className='text-5xl font-extrabold text-blue-50'>
                    <span className='text-8xl'>⬅︎</span>
                  </h1>
                </Link>
              </div>
            }
          />
        </Routes>

        <footer className='text-center text-2xl text-amber-50 p-10'>
          &copy; Всі права захищенні 2025
        </footer>
      </div >
    </>
  );
}

export default App;
