import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MujeresList from "./Componentes/MujeresList";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MujeresList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
