import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// @ts-ignore
import { RootState } from "../redux/store"; // Adjust import if necessary

const ProtectedRoute = () => {
  // @ts-ignore
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // 1. While checking the cookie, show nothing (or a spinner)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  // 2. If check finished and not authenticated, redirect
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // 3. If authenticated, render content
  return <Outlet />;
};

export default ProtectedRoute;
