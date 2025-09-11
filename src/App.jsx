import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetPasswordPage from "./pages/SetPasswordPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/accept-invite" element={<SetPasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
