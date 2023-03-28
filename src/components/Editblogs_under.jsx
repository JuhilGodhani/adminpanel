import React from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineRollback } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbLoader2 } from "react-icons/tb";
// import { storage } from "./firebase";
import { v4 } from "uuid";

import { dbs } from "../Admin/userfirebase/userfirebase";
import { storage } from "../Admin/userfirebase/userfirebase";
import { padding } from "@mui/system";

const Editblogs_under = () => {
  const data = {
    author: "",
    title: "",
    description: "",
  };
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [spinloder, setspinloder] = useState(false);
  const [Editblogid, setEditblogid] = useState("");
  const imagesListRef = ref(storage, "images/");

  const [Editblogdata, setEditblogdata] = useState(data);
  // const [File, setFile] = useState(null);
  const [Progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [IsSubmint, setIsSubmint] = useState(false);
  const [Url, setUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditblogdata({ ...Editblogdata, [name]: value });
    console.log("Editblogdata :>> ", Editblogdata);
  };

  // const uploadFile = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       //=================***impotent***=====================//
  //       // setImageUrls((prev) => [...prev, url]);
  //       //=================***impotent***=====================//
  //     });
  //   });
  // };

  const validate = (values) => {
    let errors = {};
    let imageInput = document.getElementById("imageInput");
    // console.log("imageInput.files :>> ", imageInput.files.length);
    // if (imageInput.files.length === 0) {
    //   errors.imageInput = "image is required";
    // }
    if (!values?.title) {
      errors.title = "title is required";
    }
    if (!values?.author) {
      errors.author = "author is required";
    }
    if (!values?.description) {
      errors.description = "description required";
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const currentdate = new Date().toLocaleDateString();
  const currenttime = new Date().toLocaleTimeString();

  const getAllData = () => {
    return {
      id: currenttime,
      data: {
        title: Editblogdata?.carname,
        author: Editblogdata?.carmodel,
        carimg: Url,
        description: Editblogdata.description,
        date: currentdate,
        time: currenttime,
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(Editblogdata)) {
      return;
    }
    if (Editblogdata?.carimg === "") {
      if (imageUpload == null) return;
      setspinloder(true);

      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // setImageUrls((prev) => [...prev, url]);
          // setUrl(url);
          // console.log("url :>> ", url);
          let body = {
            id: Editblogid,
            data: {
              title: Editblogdata?.title,
              author: Editblogdata?.author,
              carimg: url,
              description: Editblogdata.description,
              date: Editblogdata?.date,
              time: Editblogdata?.time,
            },
          };
          const dbref = REF(dbs);
          const record = body;
          // const record = getAllData();
          const address = "blogs/" + record.id;

          get(child(dbref, address)).then((snapshot) => {
            if (snapshot.exists()) {
              update(REF(dbs, address), record.data);
              SuccessToast("Blog Added Successfully");
              setEditblogdata(data);
              setImageUpload(null);
              navigate("/blogs");
            } else {
              ErrorToast("Please enter all details...");
            }
          });
        });
      });
    } else {
      let body = {
        id: Editblogid,
        data: {
          title: Editblogdata?.title,
          author: Editblogdata?.author,
          carimg: Editblogdata?.carimg,
          description: Editblogdata.description,
          date: Editblogdata?.date,
          time: Editblogdata?.time,
        },
      };
      const dbref = REF(dbs);
      const record = body;
      // const record = getAllData();
      const address = "blogs/" + record.id;

      get(child(dbref, address)).then((snapshot) => {
        if (snapshot.exists()) {
          update(REF(dbs, address), record.data);
          SuccessToast("Updated Successfully");
          setEditblogdata(data);
          setImageUpload(null);
          navigate("/blogs");
        } else {
          ErrorToast("Please enter all details...");
        }
      });
    }
  };

  useEffect(() => {
    setEditblogdata(location.state.row.data);
    setEditblogid(location.state.row.key);
  }, []);

  return (
    <>
      <div id="addcarunder" className="main_div bokdat">
        <div className="table_outside">
          <div>
            {IsSubmint ? (
              ""
            ) : (
              <>
                {/* <h2 style={{ marginTop: 20, marginBottom: 10 }}>Add car</h2> */}
                <Form onSubmit={handleSubmit} className="addcarform">
                  <Row style={{ padding: 10, gap: 20 }}>
                    <Col className="adddetail">
                      <Row>
                        <TextField
                          label="Author Name"
                          name="author"
                          onChange={handleChange}
                          value={Editblogdata?.author}
                        />
                      </Row>
                      <Row>
                        {errors?.author && (
                          <span className="text-danger pe-2">
                            {errors["author"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                    <Col className="adddetail choosefile_outside">
                      {Editblogdata?.carimg === "" ? (
                        <>
                          <Row>
                            <div className="choosefile">
                              <input
                                type="file"
                                id="imageInput"
                                onChange={(event) => {
                                  setImageUpload(event.target.files[0]);
                                }}
                              />
                            </div>
                          </Row>
                          <Row>
                            {errors?.imageInput && (
                              <span className="text-danger pe-2">
                                {errors["imageInput"]}
                              </span>
                            )}
                          </Row>
                        </>
                      ) : (
                        <>
                          <div className="imgcar">
                            <img
                              src={Editblogdata?.carimg}
                              style={{
                                width: 80,
                                height: 55,
                                padding: 5,
                                borderRadius: 5,
                                border: "2px solid var(--dark)",
                                objectFit: "cover",
                                background: "var(--light)",
                                position: "relative",
                              }}
                            />
                            <div
                              className="img_closebtn"
                              onClick={() => {
                                setEditblogdata({
                                  ...Editblogdata,
                                  carimg: "",
                                });
                              }}
                            >
                              <AiFillCloseCircle />
                            </div>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row style={{ padding: 10, gap: 20 }}>
                    <Col className="adddetail">
                      <Row>
                        <TextField
                          label="Title"
                          name="title"
                          onChange={handleChange}
                          value={Editblogdata?.title}
                        />
                      </Row>
                      <Row>
                        {errors?.title && (
                          <span className="text-danger pe-2">
                            {errors["title"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ padding: 10, gap: 20 }}>
                    <Col className="adddetail">
                      <Row>
                        <TextField
                          label="Description"
                          name="description"
                          onChange={handleChange}
                          value={Editblogdata?.description}
                          multiline
                          rows={4}
                        />
                      </Row>
                      <Row>
                        {errors?.description && (
                          <span className="text-danger pe-2">
                            {errors["description"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col className="cancelbtn_pos">
                      <button
                        className="addbtn"
                        onClick={() => {
                          navigate("/blogs");
                        }}
                      >
                        Cancel
                      </button>
                    </Col>
                    <Col>
                      <button
                        className="addbtn"
                        style={{
                          gap: "5px",
                        }}
                        disabled={Progress !== null && Progress < 100}
                      >
                        {spinloder === true ? (
                          <TbLoader2 className="icon-spin" />
                        ) : (
                          ""
                        )}
                        Update
                      </button>
                    </Col>
                  </Row>
                </Form>
              </>
            )}
          </div>
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

export default Editblogs_under;
