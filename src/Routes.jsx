import {Routes as BrowserRoutes, Route} from "react-router-dom";
import ChangeOrderLog from "./pages/ChangeOrderLog";
import Bids from "./pages/Bids";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import {AuthProvider} from "./utils/AuthContext";

const Routes = () => {
  return (
    <AuthProvider>
      <BrowserRoutes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route
          path="/update_profile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/bids_list"
          element={
            <PrivateRoute>
              <Bids />
            </PrivateRoute>
          }
        />
        <Route
          path="/change_order_log"
          element={
            <PrivateRoute>
              <ChangeOrderLog />
            </PrivateRoute>
          }
        />
      </BrowserRoutes>
    </AuthProvider>
  );
};

export default Routes;

// import {Routes as BrowserRoutes, Route} from "react-router-dom";
// import ChangeOrderLog from "./pages/ChangeOrderLog";
// import Bids from "./pages/Bids";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import ForgotPassword from "./components/ForgotPassword";
// import UpdateProfile from "./components/UpdateProfile";
// import Dashboard from "./components/Dashboard";
// import SignUp from "./components/SignUp";
// import {AuthProvider} from "./utils/AuthContext";

// const Routes = () => {
//   return (
//     <BrowserRoutes>
//       <AuthProvider>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/update_profile" element={<UpdateProfile />} />
//         <Route path="/forgot_password" element={<ForgotPassword />} />
//         <PrivateRoute path="/dashboard" element={<Dashboard />} />
//         <PrivateRoute path="/bids_list" element={<Bids />} />
//         <PrivateRoute path="/change_order_log" element={<ChangeOrderLog />} /> this isn't working????
//       </AuthProvider>
//     </BrowserRoutes>
//   );
// };

// export default Routes;
