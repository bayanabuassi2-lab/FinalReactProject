import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Doctors from "./components/Doctors/Doctors";
import Overview from "./components/Overview/Overview";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/doctors" />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;