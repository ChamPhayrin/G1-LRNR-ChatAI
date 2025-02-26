import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import Footer from "./components/Footer";


function App() {
	return (
		<>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/result" element={<Result/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
        <Footer/>
      </Router>
		</>
	);
}

export default App;
