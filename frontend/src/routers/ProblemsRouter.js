import { Route, Routes } from "react-router-dom";
import ProblemsListPage from "../pages/ProblemsListPage";

const ProblemsRouter = () => {
  return (
    <Routes>
      <Route path="/problems">
        <Route index element={<ProblemsListPage />} />
      </Route>
    </Routes>
  );
};

export default ProblemsRouter;
