import ModifyStudentScreen from "../screens/ManagementScreens/modifyStudent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath === "/login";

  const otherPages = (
    <div>
      <SideBar />
      <Routes>
        <Route path="/login" element={<LogInScreen />} />

        <Route path="/UsersScreen" element={<UsersScreen />} />
        <Route path="/HickerScreen" element={<HickerScreen />} />
        <Route path="/ScannerScreen" element={<ScannerScreen />} />
        <Route path="/TicketCard" element={<TicketCard />} />

        <Route path="/StudentScreen" element={<StudentScreen />} />
        <Route path="/ModifyStudentScreen" element={<ModifyStudentScreen />} />
        <Route path="/signin" element={<SignInScreen />} />

        <Route index element={<LogInScreen />} />
      </Routes>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogInScreen />} />
        </Routes>
        {otherPages}
        <ToastContainer />
      </div>
    </Router>
  );
};

export default AppRouter;
