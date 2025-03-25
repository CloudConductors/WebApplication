import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/index";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import Layout from "../layout/layout";
import TestPage from "../pages/testPage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", 
        element: <Home /> },

      { path: "/login", 
        element: <LoginPage /> },

      { path: "/sign-up", 
        element: <SignUpPage /> },

      { path: "/test", 
        element: <TestPage />}

    ],
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}