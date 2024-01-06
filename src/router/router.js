// import ModifyStudentScreen from "../screens/ManagementScreens/modifyStudent";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ScannerScreen from "../screens/ManagementScreens/ScannerScreen";
// import StudentScreen from "../screens/ManagementScreens/StudentScreen";
// import HickerScreen from "../screens/ManagementScreens/HickerScreen";
// import UsersScreen from "../screens/ManagementScreens/UsersScreen";
// import TicketCard from "../screens/ManagementScreens/TicketCard";
// import SignInScreen from "../screens/authScreens/SignInScreen";
// import LogInScreen from "../screens/authScreens/LogInScreen";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SideBar from "../components/sidebar";
// import React from "react";

// const AppRouter = () => {
//   const currentPath = window.location.pathname;
//   const isLoginPage = currentPath === "/login";

//   const otherPages = (
//     <div>
//       <SideBar />
//       <Routes>
//         <Route path="/login" element={<LogInScreen />} />

//         <Route path="/UsersScreen" element={<UsersScreen />} />
//         <Route path="/HickerScreen" element={<HickerScreen />} />
//         <Route path="/ScannerScreen" element={<ScannerScreen />} />
//         <Route path="/TicketCard" element={<TicketCard />} />

//         <Route path="/StudentScreen" element={<StudentScreen />} />
//         <Route path="/ModifyStudentScreen" element={<ModifyStudentScreen />} />
//         <Route path="/signin" element={<SignInScreen />} />

//         <Route index element={<LogInScreen />} />
//       </Routes>
//     </div>
//   );

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/login" element={<LogInScreen />} />
//         </Routes>
//         {otherPages}
//         <ToastContainer />
//       </div>
//     </Router>
//   );
// };

// export default AppRouter;

import ModifyStudentScreen from "../screens/ManagementScreens/modifyStudent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScannerScreen from "../screens/ManagementScreens/ScannerScreen";
import StudentScreen from "../screens/ManagementScreens/StudentScreen";
import HickerScreen from "../screens/ManagementScreens/HickerScreen";
import UsersScreen from "../screens/ManagementScreens/UsersScreen";
import TicketCard from "../screens/ManagementScreens/TicketCard";
import SignInScreen from "../screens/authScreens/SignInScreen";
import LogInScreen from "../screens/authScreens/LogInScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/sidebar";
import React from "react";

const AppRouter = () => {
  const router = createBrowserRouter([
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
        // {
        //   path: "/TicketCard",
        //   element: (
        //     <>
        //       <SideBar />
        //       <ToastContainer />
        //       <TicketCard />
        //     </>
        //   ),
        // },
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
          path: "/SignInScreen",
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
          path: "/",
          element: <LogInScreen />,
        },
        {
          path: "/LogInScreen",
          element: <LogInScreen />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
