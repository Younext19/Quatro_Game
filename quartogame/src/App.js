import React from "react";

import { Footer, Header, Intro, Rules } from "./container";
import { Navbar } from "./components";
import "./App.css";
import Quartoboard from "./components/Board/Quartoboard";
import Score from "./components/Score/Score";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => (
  // The classname app and its styling is for the quartoboard !
  <Router>
    <div className="Board">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <Rules />
              <Intro />
              <Footer />
            </>
          }
        />
        <Route path="/game" element={<Quartoboard />} />
      </Routes>
    </div>
  </Router>
);

export default App;
