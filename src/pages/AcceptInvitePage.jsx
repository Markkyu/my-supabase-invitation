import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function AcceptInvitePage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (!session) {
      setMessage("You must access this page from your invitation email.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else {
      setMessage(
        "Password updated! You can now check your account in the system."
      );
      setLoading(false);
    }
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
              <Button
                onClick={handleSetPassword}
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                fullWidth={true}
                loading={loading}
                loadingPosition="end"
              >
                Save Password
              </Button>
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
        href="/check-account"
        sx={{ textTransform: "none", fontWeight: "bold" }}
        startIcon={<LoginIcon />}
      >
        Go to check account
      </Button>
    </div>
  );
}
