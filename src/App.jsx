import Home from './components/Home';
import Header from './components/Header';
import BibleSupport from './components/BibleSupport';
import PlayerSupport from './components/PrayerSupport';
import MaterialPage from './components/MaterialPage';
import ErrorBlock from './components/ErrorBlock';
import Footer from './components/Footer'



//Routing
import { Route, Routes } from 'react-router';
import PtsrSupport from './components/PtsrSupport';
import Post1 from './components/pagesPTSR/Post1';
import Post2 from './components/pagesPTSR/Post2';
import Post3 from "./components/pagesPTSR/Post3";
import Post4 from "./components/pagesPTSR/Post4";
import Post5 from "./components/pagesPTSR/Post5";
import Post6 from "./components/pagesPTSR/Post6";
//PlayerPages
import PrayerPage from './components/pagesPrayer/PrayerPage'

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
          <Route path='/player/:id' element={<PrayerPage />} />
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
              <ErrorBlock />
            }
          />
        </Routes>

        <Footer />
      </div >
    </>
  );
}

export default App;
