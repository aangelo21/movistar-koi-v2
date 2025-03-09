import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Competitions from "./pages/competitions/Competitions";
import Sponsors from "./pages/sponsors/Sponsors"; // Import Sponsors

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/sponsors" element={<Sponsors />} /> {/* Add Sponsors route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
