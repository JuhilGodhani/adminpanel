import React, { useEffect, Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Adminrouter from "../../routes/Adminrouter";
// import Sidebar from "../components/Sidebar/Sidebar";
import AdminProtectedRoute from "../AdminProtectedRoute";

const Adminpanel = () => {
  const admindata = JSON.parse(localStorage.getItem("adminLoginDatas"));
  const sidebar = localStorage.getItem("sidebar");

  return (
    <>
      {admindata?.username !== " " && sidebar === "show" && <Sidebar />}
      <Fragment>
        <Adminrouter />
      </Fragment>
    </>
  );
};

export default Adminpanel;
