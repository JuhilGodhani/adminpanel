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
import { TbLoader2 } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineRollback } from "react-icons/ai";

// import { storage } from "./firebase";
import { v4 } from "uuid";

import React from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
import { storage } from "../Admin/userfirebase/userfirebase";
import { padding } from "@mui/system";

const Addblogs_under = () => {
  const data = {
    author: "",
    title: "",
    description: "",
  };
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [Bookingid, setBookingid] = useState("");
  const imagesListRef = ref(storage, "images/");

  const [Addcardata, setAddcardata] = useState(data);
  // const [File, setFile] = useState(null);
  const [Progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [IsSubmint, setIsSubmint] = useState(false);
  const [spinloder, setspinloder] = useState(false);
  const [Url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAddcardata({ ...Addcardata, [name]: value });
    console.log("Addcardata :>> ", Addcardata);
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
    if (imageInput.files.length === 0) {
      errors.imageInput = "image is required";
    }
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
        title: Addcardata?.carname,
        author: Addcardata?.carmodel,
        carimg: Url,
        description: Addcardata.description,
        date: currentdate,
        time: currenttime,
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(Addcardata)) {
      return;
    }

    if (imageUpload == null) return;
    setspinloder(true);
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageUrls((prev) => [...prev, url]);
        // setUrl(url);
        // console.log("url :>> ", url);

        let body = {
          id: Bookingid,
          data: {
            title: Addcardata?.title,
            author: Addcardata?.author,
            carimg: url,
            description: Addcardata.description,
            date: currentdate,
            time: currenttime,
          },
        };
        const dbref = REF(dbs);
        const record = body;
        // const record = getAllData();
        const address = "blogs/" + record.id;

        get(child(dbref, address)).then((snapshot) => {
          if (snapshot.exists()) {
            ErrorToast("Please enter all details...");
            console.log("uplode nai thatu :>> ");
          } else {
            set(REF(dbs, address), record.data);
            SuccessToast("Blog Added Successfully");
            console.log("uplode  thai 6 :>> ");
            setAddcardata(data);
            setImageUpload(null);
            navigate("/blogs");
          }
        });
      });
    });
  };

  useEffect(() => {
    //=================***impotent***=====================//
    // listAll(imagesListRef).then((response) => {
    //   response.items.forEach((item) => {
    //     getDownloadURL(item).then((url) => {
    //       setImageUrls((prev) => [...prev, url]);
    //     });
    //   });
    // });
    //=================***impotent***=====================//
    const dbRef = REF(dbs, "blogs");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      setBookingid(records.length + 1);
    });
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
                          value={Addcardata?.author}
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
                    </Col>
                  </Row>
                  <Row style={{ padding: 10, gap: 20 }}>
                    <Col className="adddetail">
                      <Row>
                        <TextField
                          label="Title"
                          name="title"
                          onChange={handleChange}
                          value={Addcardata?.title}
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
                          value={Addcardata?.description}
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
                        Submit
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

export default Addblogs_under;
