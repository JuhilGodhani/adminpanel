import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import { useUserAuth } from "./context/UserAuthContext";
const AdminProtectedRoute = ({ Cmp }) => {
  // const { user } = useUserAuth();
  const navigate = useNavigate();
  //   const userdata = JSON.parse(localStorage.getItem("userLoginDatas"));
  const admindata = JSON.parse(localStorage.getItem("adminLoginDatas"));
  // console.log("Check user in Private: ", user);
  //   useEffect(() => {
  //     if (userdata?.username === " ") {
  //       navigate("/login");
  //     }
  //   });
  useEffect(() => {
    if (admindata?.username === "") {
      navigate("/alogin");
    }
  });
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  return <>{Cmp}</>;
};

export default AdminProtectedRoute;
