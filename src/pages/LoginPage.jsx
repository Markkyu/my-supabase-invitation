import { useState } from "react";
import supabase from "../config/supabase";
import Button from "@mui/material/Button";

// Login Page
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError;
      setMessage(error.message);
      setLoading(false);
    } else {
      setMessage("Account is found inside of Timelyfy!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 ">
          Check Timelyfy Account
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Check if account is inside of Timelyfy's system.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username input form */}
          <label htmlFor="username" className="text-gray-600">
            Username
          </label>
          <input
            id="username"
            type="email"
            autoComplete="off"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          {/* Password input form */}
          <label htmlFor="password" className="text-gray-600">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="rounded-sm"
            />
            <label className="text-gray-600">Show Password</label>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            color="info"
            loading={loading}
            loadingPosition="end"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Find Account
          </Button>
        </form>

        {message && (
          <p className="mt-4 text-center text-md text-gray-700 ">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
