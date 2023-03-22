import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import { Row, Col, FormGroup } from "reactstrap";
import "../Style/loginpage.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import { FormControlLabel, Checkbox, Link } from "@material-ui/core";
import { useAdminAuth } from "../Admin/context/AdminAuthContext";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import { admindbs } from "../Admin/adminfirebase/adminfirebase";
// import video from "../Images/Video/login.mp4";
import img from "../Images/login.jpg";
import { AiFillCar } from "react-icons/ai";

const data = {
  // username: "",
  email: "",
  password: "",
};

const Loginpage = () => {
  const [adminLogindata, setLogindata] = useState(data);
  // const [rememberme, setRememberMe] = useState(false);
  const { logIn } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogindata = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setLogindata({ ...adminLogindata, [name]: value });
  };

  // const handleCheck = (event) => {
  //   setRememberMe(event.target.checked);
  // };

  const currentdate = new Date().toLocaleDateString();
  const currenttime = new Date().toLocaleTimeString();

  const getAllData = () => {
    return {
      id: currenttime,
      data: {
        // username: adminLogindata.username,
        email: adminLogindata.email,
        password: adminLogindata.password,
        date: currentdate,
        time: currenttime,
      },
    };
  };

  const handlerLogin = async (e) => {
    localStorage.setItem("lgtype", "Logout");
    e.preventDefault();
    const { username, email, password } = adminLogindata;
    const currentdate = new Date().toLocaleDateString();
    const currenttime = new Date().toLocaleTimeString();
    try {
      await logIn(adminLogindata.email, adminLogindata.password);

      // window.open("/dashboard");
      // window.location.reload();
      // let adminLogin = {
      //   username: adminLogindata.username,
      //   email: adminLogindata.email,
      //   password: adminLogindata.password,
      // };
      // localStorage.setItem("adminLoginDatas", JSON.stringify(adminLogin));

      const dbref = ref(admindbs);
      const record = getAllData();
      // console.log("record------", record);

      const address = "AdminLoginData/" + record.id;
      // console.log("yourName----", adminLogindata.username);
      // console.log("UserLoginData----", address);

      get(child(dbref, address)).then((snapshot) => {
        if (snapshot.exists()) {
          ErrorToast("Please enter all details...");
        } else {
          //   setContact(data);
          set(ref(admindbs, address), record.data);
          //   SuccessToast("Thank you for your response 😄");
          // console.log("uploded");
          // window.location.reload();
        }
      });
      // window.location.reload();

      // await fetch(
      //   "https://car-rent-website-admin-panel-default-rtdb.firebaseio.com/AdminLoginData.json",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       username,
      //       email,
      //       password,
      //       currentdate,
      //       currenttime,
      //     }),
      //   }
      // );
      SuccessToast("Logged In Successfully");
      // localStorage.setItem("sidebar", "show");
      navigate("/dashboard");
    } catch (error) {
      // setLogindata(data);
      ErrorToast(error?.message);
    }
    // window.location.reload();
  };

  return (
    <div className="Main_page">
      <div className="Brand">
        <i className="bx">
          <AiFillCar className="Car" />
        </i>
        <span className="Text">Car Rental</span>
      </div>
      <Row className="w-100">
        <Col className="leftside">
          <div className="adminpage">
            {/* <div className="form_container box1 ">
              <div className="form box"> */}
            <h1 className="d-flex justify-content-center ">Login</h1>
            <ValidatorForm
              onSubmit={handlerLogin}
              onError={(errors) => {
                for (const err of errors) {
                  console.log(err.props.errorMessages[0]);
                }
              }}
            >
              {/* <Row>
                <Col md={12}>
                  <FormGroup>
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="username"
                      label="User name"
                      onChange={handleLogindata}
                      value={adminLogindata.username}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row> */}

              <Row>
                <Col md={12}>
                  <FormGroup>
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      onChange={handleLogindata}
                      value={adminLogindata.email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "This field is required",
                        "Email is not valid",
                      ]}
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormGroup>
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      onChange={handleLogindata}
                      value={adminLogindata.password}
                      validators={["required"]}
                      errorMessages={["This field is required"]}
                      autoComplete="off"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="d-flex justify-content-center">
                  <button
                    target="_blank"
                    variant="contained"
                    className="login_button mt-3"
                    type="Submit"
                  >
                    Login
                  </button>
                </Col>
              </Row>
            </ValidatorForm>
          </div>
          {/* </div>
          </div> */}
        </Col>
        <Col className="righside">
          <div>
            <img className="img" src={img} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Loginpage;
