import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/defaultLayout/defaultLayout";
import { Home } from "./Home";
import { Login, SignUp } from "./Auth";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <DefaultLayout>
        <Login />
      </DefaultLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <DefaultLayout>
        <SignUp />
      </DefaultLayout>
    ),
  },
]);

export default router;
