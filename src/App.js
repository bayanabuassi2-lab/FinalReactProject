import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Doctors from "./components/Doctors/Doctors";
import Overview from "./components/Overview/Overview";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/doctors" />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<Overview />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;