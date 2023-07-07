import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import AuthFormRouter from "./routers/AuthFormRouter";
import MyToastContainer from "./components/MyToastContainer/MyToastContainer";
import ProblemsRouter from "./routers/ProblemsRouter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/problems/page/1" />} />
      </Routes>
      <AuthFormRouter />
      <ProblemsRouter />

      <MyToastContainer />
    </div>
  );
}

export default App;
