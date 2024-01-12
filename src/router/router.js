import ModifyStudentScreen from "../screens/ManagementScreens/modifyStudent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScannerScreen from "../screens/ManagementScreens/ScannerScreen";
import StudentScreen from "../screens/ManagementScreens/StudentScreen";
import HickerScreen from "../screens/ManagementScreens/HickerScreen";
import UsersScreen from "../screens/ManagementScreens/UsersScreen";
import SignInScreen from "../screens/authScreens/SignInScreen";
import LogInScreen from "../screens/authScreens/LogInScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/sidebar";
import React from "react";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogInScreen />,
    },
    {
      children: [
        {
          path: "/UsersScreen",
          element: (
            <>
              <SideBar />
              <ToastContainer />
              <UsersScreen />
            </>
          ),
        },
        {
          path: "/HickerScreen",
          element: (
            <>
              <SideBar />
              <ToastContainer />
              <HickerScreen />
            </>
          ),
        },
        {
          path: "/ScannerScreen",
          element: (
            <>
              <SideBar />
              <ToastContainer />
              <ScannerScreen />
            </>
          ),
        },
        {
          path: "/StudentScreen",
          element: (
            <>
              <SideBar />
              <ToastContainer />
              <StudentScreen />
            </>
          ),
        },
        {
          path: "/ModifyStudentScreen",
          element: (
            <>
              <SideBar />
              <ToastContainer />
              <ModifyStudentScreen />
            </>
          ),
        },
        {
          path: "/signin",
          element: (
            <>
              <SideBar />
              <ToastContainer />
              <SignInScreen />
            </>
          ),
        },
      ],
    },
    {
      children: [
        {
          path: "/login",
          element: (
            <>
              <LogInScreen />
              <ToastContainer />
            </>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
