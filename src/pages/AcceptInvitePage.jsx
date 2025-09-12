import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function AcceptInvitePage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if user is signed in from the token in URL
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        setMessage(
          "Invalid or missing invite link. Please use the invitation email."
        );
      }
    });

    // Also listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSetPassword = async () => {
    if (!session) {
      setMessage("You must access this page from your invitation email.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMessage(error.message);
    else setMessage("Password updated! You can now log in.");
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Accept Invite
        </h2>

        {session ? (
          <>
            <p className="text-sm text-gray-600 text-center mb-4">
              Welcome {session.user.email}! Please set your password below.
            </p>
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                onClick={handleSetPassword}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Save Password
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-red-500">{message}</p>
        )}

        {message && session && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
      <Button
        variant="contained"
        color="info"
        href="/login"
        sx={{ textTransform: "none" }}
        startIcon={<LoginIcon />}
      >
        Go to Login
      </Button>
    </div>
  );
}
