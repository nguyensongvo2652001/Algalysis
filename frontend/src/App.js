import "./App.css";

import { Routes, Route } from "react-router-dom";
import AuthFormRouter from "./routers/AuthFormRouter";

function App() {
  return (
    <div className="App">
      <AuthFormRouter />
    </div>
  );
}

export default App;
