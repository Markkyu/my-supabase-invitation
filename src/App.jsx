import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcceptInvitePage from "./pages/AcceptInvitePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/accept-invite" element={<AcceptInvitePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
