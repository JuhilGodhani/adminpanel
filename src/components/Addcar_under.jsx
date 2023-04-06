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
import { AiOutlineRollback } from "react-icons/ai";
import { TbLoader2 } from "react-icons/tb";

// import { storage } from "./firebase";
import { v4 } from "uuid";

import React from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
import { storage } from "../Admin/userfirebase/userfirebase";
import { padding } from "@mui/system";

function Addcar_under() {
  const data = {
    carname: "",
    carmodel: "",
    brandname: "",
    price: "",
    carspeed: "",
    cargps: "",
    seattype: "",
    automatic: "",
    description: "",
    // carrating: "",
    cartype: "",
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
    if (!values?.carname) {
      errors.carname = "car name is required";
    }
    if (!values?.carmodel) {
      errors.carmodel = "car model is required";
    }
    if (!values?.brandname) {
      errors.brandname = "brand name is required";
    }
    if (!values?.price) {
      errors.price = "price is required";
    }
    if (!values?.carspeed) {
      errors.carspeed = "car speed is required";
    }
    if (!values?.cargps) {
      errors.cargps = "car gps is required";
    }
    if (!values?.cartype) {
      errors.cartype = "car type is required";
    }
    if (!values?.seattype) {
      errors.seattype = "seat type is required";
    }
    if (!values?.automatic) {
      errors.automatic = "this field required";
    }
    if (!values?.description) {
      errors.description = "description required";
    }
    // if (!values?.carrating) {
    //   errors.carrating = "rating required";
    // }

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
        carname: Addcardata?.carname,
        carmodel: Addcardata?.carmodel,
        carimg: Url,
        brandname: Addcardata.brandname,
        price: Addcardata.price,
        carspeed: Addcardata.carspeed,
        cargps: Addcardata.cargps,
        seattype: Addcardata.seattype,
        automatic: Addcardata.automatic,
        description: Addcardata.description,
        // carrating: Addcardata.carrating,
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
            carname: Addcardata?.carname,
            carmodel: Addcardata?.carmodel,
            carimg: url,
            brandname: Addcardata.brandname,
            price: Addcardata.price,
            carspeed: Addcardata.carspeed,
            cargps: Addcardata.cargps,
            seattype: Addcardata.seattype,
            automatic: Addcardata.automatic,
            description: Addcardata.description,
            status: "Rental",
            // carrating: Addcardata.carrating,
            cartype: Addcardata.cartype,
            date: currentdate,
            time: currenttime,
          },
        };
        const dbref = REF(dbs);
        const record = body;
        // const record = getAllData();
        const address = "cardata/" + record.id;

        get(child(dbref, address)).then((snapshot) => {
          if (snapshot.exists()) {
            ErrorToast("Please enter all details...");
          } else {
            set(REF(dbs, address), record.data);
            SuccessToast("Car Added Successfully");
            setAddcardata(data);
            setImageUpload(null);
            navigate("/caritem");
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
    const dbRef = REF(dbs, "cardata");
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
                          label="Car Name"
                          name="carname"
                          onChange={handleChange}
                          value={Addcardata?.carname}
                        />
                      </Row>
                      <Row>
                        {errors?.carname && (
                          <span className="text-danger pe-2">
                            {errors["carname"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                    <Col className="adddetail">
                      <Row>
                        <TextField
                          label="Car Model"
                          name="carmodel"
                          onChange={handleChange}
                          value={Addcardata?.carmodel}
                        />
                      </Row>
                      <Row>
                        {errors?.carmodel && (
                          <span className="text-danger pe-2">
                            {errors["carmodel"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ padding: 10, gap: 20 }}>
                    <Col className="adddetail">
                      <Row>
                        <TextField
                          label="Brand name"
                          name="brandname"
                          onChange={handleChange}
                          value={Addcardata?.brandname}
                        />
                      </Row>
                      <Row>
                        {errors?.brandname && (
                          <span className="text-danger pe-2">
                            {errors["brandname"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                    <Col className="adddetail">
                      <Row>
                        <TextField
                          label="Price"
                          name="price"
                          type="number"
                          placeholder="Rs."
                          onChange={handleChange}
                          value={Addcardata?.price}
                        />
                      </Row>
                      <Row>
                        {errors?.price && (
                          <span className="text-danger pe-2">
                            {errors["price"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ padding: 10, gap: 20 }}>
                    <Col className="adddetail">
                      <Row>
                        <TextField
                          label="Car Speed"
                          name="carspeed"
                          type="number"
                          onChange={handleChange}
                          value={Addcardata?.carspeed}
                          placeholder="kmph"
                        />
                      </Row>
                      <Row>
                        {errors?.carspeed && (
                          <span className="text-danger pe-2">
                            {errors["carspeed"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                    <Col className="adddetail">
                      <Row>
                        <FormControl className="selectitem">
                          <InputLabel id="demo-simple-select-helper-label">
                            Car Gps
                          </InputLabel>
                          <Select
                            className="selectitem"
                            value={Addcardata?.cargps}
                            name="cargps"
                            label="Car Gps"
                            onChange={handleChange}
                            style={{ padding: 27 }}
                          >
                            <MenuItem value="Gps Available">
                              Gps Available
                            </MenuItem>
                            <MenuItem value="No-Gps">No-Gps</MenuItem>
                          </Select>
                        </FormControl>
                      </Row>
                      <Row>
                        {errors?.cargps && (
                          <span className="text-danger pe-2">
                            {errors["cargps"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ padding: 10, gap: 20 }}>
                    <Col className="adddetail">
                      <Row>
                        <FormControl className="selectitem">
                          <InputLabel id="demo-simple-select-helper-label">
                            Seat Type
                          </InputLabel>
                          <Select
                            className="selectitem"
                            value={Addcardata?.seattype}
                            name="seattype"
                            label="Seat Type"
                            onChange={handleChange}
                            style={{ padding: 27 }}
                          >
                            <MenuItem value="Heated seats">
                              Heated seats
                            </MenuItem>
                            <MenuItem value="Convertible Seat">
                              Convertible seats
                            </MenuItem>
                            <MenuItem value="Infant Seat">
                              Infant seats
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Row>
                      <Row>
                        {errors?.seattype && (
                          <span className="text-danger pe-2">
                            {errors["seattype"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                    <Col className="adddetail">
                      <Row>
                        <FormControl className="selectitem">
                          <InputLabel id="demo-simple-select-helper-label">
                            Automatic
                          </InputLabel>
                          <Select
                            className="selectitem"
                            value={Addcardata?.automatic}
                            name="automatic"
                            label="Automatic"
                            onChange={handleChange}
                            style={{ padding: 27 }}
                          >
                            <MenuItem value="Automatic">Automatic</MenuItem>
                            <MenuItem value="Manual">Manual</MenuItem>
                          </Select>
                        </FormControl>
                      </Row>
                      <Row>
                        {errors?.automatic && (
                          <span className="text-danger pe-2">
                            {errors["automatic"]}
                          </span>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ padding: 10, gap: 20 }}>
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
                    <Col className="adddetail">
                      <Row>
                        <FormControl className="selectitem">
                          <InputLabel id="demo-simple-select-helper-label">
                            Car Type
                          </InputLabel>
                          <Select
                            className="selectitem"
                            value={Addcardata?.cartype}
                            name="cartype"
                            label="Cartype"
                            onChange={handleChange}
                            style={{ padding: 27 }}
                          >
                            <MenuItem value="Sedan">Sedan</MenuItem>
                            <MenuItem value="SUV">SUV</MenuItem>
                            <MenuItem value="Coupe">Coupe</MenuItem>
                            <MenuItem value="PickupTrucks">
                              Pickup Trucks
                            </MenuItem>
                          </Select>
                        </FormControl>
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
                          navigate("/caritem");
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
}

export default Addcar_under;
