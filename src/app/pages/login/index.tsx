import EmailSignIn from "@app/components/Auth/EmailSignIn";
import GoogleSignIn from "@app/components/Auth/GoogleSignIn";
import Footer from "@app/components/Landing/Footer";
import Navbar from "@app/components/ui/Navbar";
import Spinner from "@app/components/ui/Spinner";
import { useUser } from "@app/providers/User";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type LoginPageProps = Record<never, never>;

const LoginPage: React.FC<LoginPageProps> = ({}: LoginPageProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  if (user && user.id) {
    // Already signed in; redirect to home
    navigate("/home");
    return <Spinner centered />;
  }
  const error = searchParams.get("error");
  let errorMessage = error;
  if (error === "session_error") {
    errorMessage =
      "There was a problem signing in. Please try again and contact us if this persists.";
  } else if (error === "no_code") {
    errorMessage = "No authentication code found.";
  }

  return (
    <div className="flex flex-col w-full h-dvh">
      <Navbar />
      <div className="flex-1">
        <div className="flex flex-col gap-4 my-16">
          <div className="flex flex-col items-center gap-2 w-64 mx-auto">
            <p className="text-center text-xs text-secondary-700 mb-4">
              New or existing user? Sign in using one of the methods below.
            </p>
            <GoogleSignIn nextUrl="/home" />
            <p className="text-secondary text-xs">or</p>
            <EmailSignIn />
            {errorMessage && (
              <p className="text-danger text-sm text-center mt-2">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
