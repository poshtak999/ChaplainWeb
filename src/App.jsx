import Home from './components/Home';
import Header from './components/Header';
import BibleSupport from './components/BibleSupport';
import PrayerSupport from './components/PrayerSupport';
import MaterialPage from './components/MaterialPage';
import ErrorBlock from './components/ErrorBlock';
import Footer from './components/Footer';



//Routing
import { Route, Routes } from 'react-router-dom';
import PtsrSupport from './components/PtsrSupport';
// import Post1 from './components/pagesPTSR/Post1';
// import Post2 from './components/pagesPTSR/Post2';
// import Post3 from "./components/pagesPTSR/Post3";
// import Post4 from "./components/pagesPTSR/Post4";
// import Post5 from "./components/pagesPTSR/Post5";
// import Post6 from "./components/pagesPTSR/Post6";
//PlayerPages
import PrayerPage from './components/pagesPrayer/PrayerPage'
import PTSRPage from './components/pagesPTSR/PTSRPage';

//Admin
import AdminPanel from './components/admin/AdminPanel';
import BibleAdmin from './components/admin/BibleAdmin';
import PrayerAdmin from './components/admin/PrayerAdmin';
import PtsrAdmin from './components/admin/PtsrAdmin';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  // console.log("work")
  return (
    <>
      <div className='min-h-screen bg-gradient-to-b to-yellow-400 from-blue-800'>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/bible' element={<BibleSupport />} />
          <Route path='/prayer' element={<PrayerSupport />} />
          <Route path='/prayer/:id' element={<PrayerPage />} />
          <Route path='/ptsr' element={<PtsrSupport />} />
          <Route path='/ptsr/:id' element={<PTSRPage />} />
          <Route path='/material' element={<MaterialPage />} />

          {/* Admin Routes */}
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/admin/bible' 
            element={
              <ProtectedRoute>
                <BibleAdmin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/admin/prayer' 
            element={
              <ProtectedRoute>
                <PrayerAdmin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/admin/ptsr' 
            element={
              <ProtectedRoute>
                <PtsrAdmin />
              </ProtectedRoute>
            } 
          />

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
