// routes/Routing.js
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/index";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import Layout from "../layout/layout";
import TestPage from "../pages/testPage.js";
import DashboardPage from "../pages/dashboard.js";
import ProtectedRoute from "../components/ProtectedRoute";
import InProgressPage from "../pages/inProgress.js";
import SchedulePage from "../pages/schedule.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/test", element: <TestPage /> },

      // Protected Route for Dashboard
      {
        path: "/dashboard",
        element: (
          //<ProtectedRoute>
            <DashboardPage />
          //</ProtectedRoute>
        ),

      },
      {
        path: "/inProgress",
        element: (
          <ProtectedRoute>
            <InProgressPage />
          </ProtectedRoute>
        ),
        
      },
      {
        path: "/schedule",
        element: (
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        ),
        
      },
    ],
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}


/*

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

*/