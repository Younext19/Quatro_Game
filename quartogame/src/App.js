import React from "react";
import { ToastContainer } from "react-toastify";

import { Footer, Header, Intro, Rules } from "./container";
import { Navbar } from "./components";
import "./App.css";
import Quartoboard from "./components/Board/Quartoboard";
import Score from "./components/Score/Score";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameRules from "./components/Rules/GameRules";
import "react-toastify/dist/ReactToastify.css";

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
        <Route path="/game-settings" element={<GameRules />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  </Router>
);

export default App;
