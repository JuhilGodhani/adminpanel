import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import {
  ref as REF,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { Label, ModalFooter, Table } from "reactstrap";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import "../Style/contactdata.css";
import "../Style/bookingdata.css";
import "../Style/addcar.css";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { IoMdAdd } from "react-icons/io";
import { ImReply } from "react-icons/im";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineRollback } from "react-icons/ai";
import emailjs from "emailjs-com";

// import { storage } from "./firebase";
import { v4 } from "uuid";
import { TbLoader2 } from "react-icons/tb";

import React from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
import { storage } from "../Admin/userfirebase/userfirebase";
import { padding } from "@mui/system";

const msg = {
  message: "",
};

const Reply_under = () => {
  const [replymsg, setreplymsg] = useState([]);
  const [Sengmessage, setSengmessage] = useState(msg);
  const [errors, setErrors] = useState({});
  const [spinloder, setspinloder] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSengmessage({ ...Sengmessage, [name]: value });
  };

  const validate = (values) => {
    let errors = {};
    setErrors(errors);
    if (!values?.message) {
      errors.message = "message is required";
    }
    if (Object.keys(errors).length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(Sengmessage)) {
      return;
    }
    const from_name = "Juhil";
    const from_email = replymsg?.email;
    const toname = replymsg?.yourName;
    const usermsg = replymsg?.message;
    const message = Sengmessage?.message;
    setspinloder(true);

    emailjs

      .send(
        "service_fzhaljq",
        "template_k2otji9",
        {
          from_name: from_name,
          from_email: from_email,
          user_message: usermsg,
          to_name: toname,
          message: message,
        },
        "JUpOWICLqpKDu5GOS"
      )
      .then(
        (result) => {
          SuccessToast("Message Sent Successfully!");
          console.log("result.text :>> ", result.text);
          setSengmessage(msg);
          navigate("/contactdata");
        },
        (error) => {
          ErrorToast("Message Not sent");
          console.log("error.text :>> ", error.text);
        }
      );
  };

  useEffect(() => {
    const contactmsg = JSON.parse(localStorage.getItem("contactmsg"));
    setreplymsg(contactmsg);
  }, []);

  return (
    <>
      <div id="addcarunder" className="main_div bokdat">
        <div className="table_outside" style={{ paddingBottom: "0px" }}>
          <Form onSubmit={handleSubmit} className="addcarform">
            <Row style={{ padding: 10 }} className="conmsgcolor">
              <Col lg="2">Email</Col>
              <Col lg="1">:</Col>
              <Col lg="9">{replymsg?.email}</Col>
            </Row>
            <Row style={{ padding: 10 }} className="conmsgcolor">
              <Col lg="2">Message</Col>
              <Col lg="1">:</Col>
              <Col lg="9" className="conmsg">
                {replymsg?.message}
              </Col>
            </Row>
            <Row style={{ padding: 10 }} className="conmsgcolor">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: "var(--grey)",
                  padding: "10px",
                  borderRadius: "25px",
                  width: "10%",
                }}
              >
                <ImReply /> Reply
              </div>
            </Row>
            <Row style={{ padding: 10 }} className="conmsgcolor">
              <Col lg="2">Write Message</Col>
              <Col lg="1">:</Col>
              <Col lg="9">
                <Row>
                  <TextField
                    style={{
                      width: "95%",
                      marginLeft: "-10px",
                      color: "var(--dark)",
                    }}
                    variant="outlined"
                    multiline
                    maxRows={3}
                    minRows={3}
                    placeholder="here..."
                    name="message"
                    onChange={handleChange}
                    value={Sengmessage?.message}
                  />
                </Row>
                <Row>
                  {errors?.message && (
                    <span className="text-danger pe-2">
                      {errors["message"]}
                    </span>
                  )}
                </Row>
              </Col>
            </Row>
            <Row
              style={{
                padding: 10,
                paddingBottom: "20px",
                paddingRight: "10%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div className="sendbtn" onClick={handleSubmit}>
                  {spinloder === true ? (
                    <TbLoader2 className="icon-spin" />
                  ) : (
                    ""
                  )}
                  Send <BsFillSendFill />
                </div>
              </div>
            </Row>
          </Form>
        </div>
      </div>

      {/* //=================***impotent***=====================// */}
      {/* {imageUrls.map((url) => {
            return <img src={url} />;
          })} */}
      {/* //=================***impotent***=====================// */}
    </>
  );
};

export default Reply_under;
