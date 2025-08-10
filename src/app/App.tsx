import ErrorBoundary from "@app/components/ErrorBoundary";
import Spinner from "@app/components/ui/Spinner";
import ProtectedLayout from "@app/layouts/ProtectedLayout";
import PublicLayout from "@app/layouts/PublicLayout";
import RootLayout from "@app/layouts/RootLayout";
import MainPage from "@app/pages";
import AuthCallback from "@app/pages/auth/callback";
import HomePage from "@app/pages/home";
import LoginPage from "@app/pages/login";
import RedirectPage from "@app/pages/login/redirect";
import NotFound from "@app/pages/not-found";
import { useUser } from "@app/providers/User";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const RequireAuth = ({
  children,
}: React.PropsWithChildren): React.ReactNode => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      navigate("/");
    }
  }, [user?.id, navigate]);

  return user?.id ? <>{children}</> : null;
};

const RootPageRedirect = (): React.ReactNode => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home", { replace: true });
  }, [navigate]);
  return null;
};

export const App = (): React.ReactNode => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="*"
            element={
              <div className="h-dvh">
                <Spinner centered />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            element={
              <RootLayout>
                <Outlet />
              </RootLayout>
            }
          >
            <Route
              path="/"
              element={user?.id ? <RootPageRedirect /> : <MainPage />}
            />
            <Route
              path="/login"
              element={user?.id ? <RootPageRedirect /> : <LoginPage />}
            />
            <Route
              path="/login/redirect"
              element={user?.id ? <RootPageRedirect /> : <RedirectPage />}
            />
            <Route
              element={
                <RequireAuth>
                  <ProtectedLayout>
                    <Outlet />
                  </ProtectedLayout>
                </RequireAuth>
              }
            >
              <Route path="/home" element={<HomePage />} />
            </Route>
            <Route
              element={
                <PublicLayout>
                  <Outlet />
                </PublicLayout>
              }
            ></Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
