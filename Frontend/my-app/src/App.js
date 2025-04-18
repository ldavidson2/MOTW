import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Monster from "./components/Monster.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Monster" element={<Monster />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
