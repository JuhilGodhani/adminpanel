import React, { useState, useEffect } from "react";
import "../Style/dashboard.css";
import { dbs } from "../Admin/userfirebase/userfirebase";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const [isHide, setisHide] = useState(true);

  const [checkboxclick, setCheckboxclick] = useState("Unchecked");
  const [Usercon, setUsercon] = useState("");

  const change = () => {
    if (checkboxclick === "Checked") {
      setCheckboxclick("Unchecked");
      document.body.classList.remove("dark");
    } else {
      setCheckboxclick("Checked");
      document.body.classList.add("dark");
    }

    // console.log("dark click");
  };
  useEffect(() => {
    hidesidebar();
  }, []);

  const hidesidebar = () => {
    setisHide(!isHide);
    // var element = document.getElementById("sidebar");
    // var element1 = document.querySelector("#sidebar ul li a");
    // if (isHide) {
    //   element.classList.add("siderbarshow");
    //   element.classList.remove("sidebarhide");
    //   element1.classList.add("siderbarshow");
    //   element1.classList.remove("sidebarhide1");
    // } else {
    //   element.classList.remove("siderbarshow");
    //   element.classList.add("sidebarhide");
    //   element1.classList.remove("siderbarshow");
    //   element1.classList.add("sidebarhide1");
    // }
    console.log("has bhai clcik karu 6u");
    // if (element.classList.remove("siderbarshow")) {
    //   debugger;
    // }
    // document.getElementsByClassName("siderbarshow");
  };

  const deletenotinum = () => {
    const dbref = ref(dbs);
    const address = "notification/";
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
      }
    });
  };

  useEffect(() => {
    const dbRef = ref(dbs, "notification");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      // console.log("records", records.count());
      setUsercon(records.length);
    });
  }, []);

  return (
    <nav>
      <i onClick={hidesidebar} className="menu">
        <HiMenu />
      </i>
      <a href="#" className="nav-link"></a>
      <form>
        <h5 className="adminpanel">Welcome to Admin Panel . . </h5>
      </form>
      <input
        type="checkbox"
        id="switch-mode"
        hidden
        onClick={change}
        checked={checkboxclick === "Checked"}
      />
      <label for="switch-mode" className="switch-mode"></label>
      <a
        href="#"
        className="notification"
        onClick={() => {
          deletenotinum();
        }}
      >
        <i className="bx bxs-bell"></i>
        {Usercon !== 0 ? <span className="num">{Usercon}</span> : ""}
      </a>
      <a href="#" className="profile" onClick={() => {}}>
        Admin
      </a>
    </nav>
  );
};

export default Navbar;
