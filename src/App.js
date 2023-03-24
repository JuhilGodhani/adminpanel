import React from "react";
import Loginpage from "../src/Pages/loginpage";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthContextProvider } from "./Admin/context/AdminAuthContext";
import Dashboard from "../src/Pages/Dashboard";
import Dashboard_under from "./components/Dashboard_under";
import UserRegisterdata from "./components/UserRegisterdata";
import Bookinghistory from "./Pages/Bookinghistory";
import Userdata from "./Pages/Userdata";
import Bookingdata from "./Pages/Bookingdata";
import Profiledata from "./Pages/Profiledata";
import Contactdata from "./Pages/Contactdata";
import Addcar from "./Pages/Addcar";
import Editcardata from "./Pages/Editcardata";
import Caritem from "./Pages/Caritem";
import Blogs from "./Pages/Blogs";
import Addblogs from "./Pages/Addblogs";
import Editblogs from "./Pages/Editblogs";
import Reply from "./Pages/Reply";

function App() {
  return (
    <AdminAuthContextProvider>
      {/* <Loginpage /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* <Route path="/dashboard" element={<Dashboard_under />}></Route> */}
        <Route path="/bookinghistory" element={<Bookinghistory />}></Route>
        <Route path="/userdata" element={<Userdata />}></Route>
        <Route path="/bookingdata" element={<Bookingdata />}></Route>
        <Route path="/contactdata" element={<Contactdata />}></Route>
        <Route path="/profiledata" element={<Profiledata />}></Route>
        <Route path="/addcar" element={<Addcar />}></Route>
        <Route path="/editcardata" element={<Editcardata />}></Route>
        <Route path="/caritem" element={<Caritem />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/addblogs" element={<Addblogs />}></Route>
        <Route path="/editblogs" element={<Editblogs />}></Route>
        <Route path="/reply" element={<Reply />}></Route>
        {/* <Route path="/bookinghistory" element={<UserRegisterdata />}></Route> */}
      </Routes>
    </AdminAuthContextProvider>
  );
}

export default App;
