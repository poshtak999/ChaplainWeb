import Home from "./components/Home";
import Header from "./components/Header";
import BibleSupport from "./components/BibleSupport";
import PlayerSupport from "./components/PrayerSupport";
import MaterialPage from "./components/MaterialPage"

//Routing
import { Route, Routes } from "react-router";
import PtsrSupport from "./components/PtsrSupport";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b to-yellow-400 from-blue-800">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/bible" element={<BibleSupport />}/>
          <Route path="/player" element={<PlayerSupport />}/>
          <Route path="/ptsr" element={<PtsrSupport />}/>
          <Route path="/material" element={<MaterialPage />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
