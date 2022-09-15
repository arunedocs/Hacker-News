import React, { useState, useEffect } from "react";

import { Routes, Route, Link } from "react-router-dom";
import Bookmark from "./Components/Bookmark";
import Home from "./Components/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
    </>
  );
};

export default App;
