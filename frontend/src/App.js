import "./App.css";

import { Routes, Route } from "react-router-dom";
import AuthFormRouter from "./routers/AuthFormRouter";
import MyToastContainer from "./components/MyToastContainer/MyToastContainer";

function App() {
  return (
    <div className="App">
      <AuthFormRouter />

      {
        // react-toastify needs a ToastContainer to show the alert.
      }
      <MyToastContainer />
    </div>
  );
}

export default App;
