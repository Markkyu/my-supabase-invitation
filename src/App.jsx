import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AcceptInvitePage from "./pages/AcceptInvitePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/accept-invite" element={<AcceptInvitePage />} />
        <Route path="/check-account" element={<LoginPage />} />
        <Route path="/*" element={<Navigate to="/check-account" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
