import { Route, Routes, Navigate } from "react-router-dom";
import ProblemsListPage from "../pages/ProblemsListPage";

const ProblemsRouter = () => {
  return (
    <Routes>
      <Route path="/problems">
        <Route index element={<Navigate to="/problems/page/1" replace />} />
        <Route path="page/:pageNumber" element={<ProblemsListPage />} />
      </Route>
    </Routes>
  );
};

export default ProblemsRouter;
