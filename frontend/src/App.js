import "./App.css";

import { Routes, Route } from "react-router-dom";
import AuthFormRouter from "./routers/AuthFormRouter";
import MyToastContainer from "./components/MyToastContainer/MyToastContainer";
import ProblemsRouter from "./routers/ProblemsRouter";

function App() {
  return (
    <div className="App">
      <AuthFormRouter />
      <ProblemsRouter />

      <MyToastContainer />
    </div>
  );
}

export default App;
