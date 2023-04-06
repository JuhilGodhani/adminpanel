import { useState, useEffect } from "react";
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
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import swal from "sweetalert";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import { Select, MenuItem } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import img from "../Images/no data found.jpg";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Label, ModalFooter, Table } from "reactstrap";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import "../Style/contactdata.css";
import "../Style/bookingdata.css";
import TextField from "@mui/material/TextField";
import { IoMdAdd } from "react-icons/io";
import { BsCurrencyRupee } from "react-icons/bs";

// import { storage } from "./firebase";
import { v4 } from "uuid";

import React from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
import { storage } from "../Admin/userfirebase/userfirebase";
import { dark } from "@mui/material/styles/createPalette";

const Caritem_under = () => {
  const [tabledata, settabledata] = useState([]);
  const [modal, setModal] = useState(false);
  const [Cardata, setCardata] = useState("");
  const [bookingdetail, setbookingdetail] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [query, setquery] = useState("");
  const [usersele, setUsersele] = useState("");
  const [cardata, setcardata] = useState([]);

  const navigate = useNavigate();

  const addcar = () => {
    navigate("/addcar");
  };

  const opendescription = (row) => {
    // console.log("row :>> ", row);
    setModal(true);
    setCardata(row.data);
  };
  const handleSele = async (event) => {
    let name = event.target.name;
    let value = event.target.value;
    // console.log(value);

    setUsersele(value);

    if (value === "Sedan") {
      const scartype = await cardata.filter((row) => {
        if (row.data.cartype === "Sedan") {
          return row;
        }
      });
      settabledata(scartype);
    } else if (value === "SUV") {
      const scartype = await cardata.filter((row) => {
        if (row.data.cartype === "SUV") {
          return row;
        }
      });
      settabledata(scartype);
    } else if (value === "Coupe") {
      const scartype = await cardata.filter((row) => {
        if (row.data.cartype === "Coupe") {
          return row;
        }
      });
      settabledata(scartype);
    } else if (value === "PickupTrucks") {
      const scartype = await cardata.filter((row) => {
        if (row.data.cartype === "PickupTrucks") {
          return row;
        }
      });
      settabledata(scartype);
    } else if (value === "none") {
      const scartype = await cardata.filter((row) => {
        setUsersele(null);
        return row;
      });
      settabledata(scartype);
    }
  };

  const delepop = (row) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return dele(row);
        // swal("Poof! Your imaginary file has been deleted!", {
        //   icon: "success",
        // });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const dele = (row) => {
    console.log("rowdsfjnm :>> ", row);
    const getAllData = (props) => {
      // console.log("row1231", props);
      return {
        id: props.key,
        data: {
          carname: props.data.carname,
          carmodel: props.data.carmodel,
          carimg: props.data.carimg,
          brandname: props.data.brandname,
          price: props.data.price,
          carspeed: props.data.carspeed,
          cargps: props.data.cargps,
          seattype: props.data.seattype,
          automatic: props.data.automatic,
          description: props.data.description,
          carrating: props.data.carrating,
          date: props.data.date,
          time: props.data.time,
        },
      };
    };
    const dbref = ref(dbs);
    // console.log("first");
    const record = getAllData(row);
    // console.log("record", record);
    const address = "cardata/" + record.id;
    // console.log("dsf", address);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
        SuccessToast("Row Deleted Successfully");
      } else {
        ErrorToast("cannot delete, please try again");
      }
    });
  };

  const hendalsearch = (e) => {
    const getsearch = e.target.value;
    // console.log("juhil", getsearch);

    let searchdata;
    // console.log(usersele, cardata);

    // if (usersele) {
    if (usersele && getsearch) {
      // console.log("item");
      searchdata = tabledata.filter((item) => {
        return (
          item.data.carname.toLowerCase().includes(getsearch) ||
          // item.data.status.toLowerCase().includes(getsearch) ||
          item.data.carmodel.toLowerCase().includes(getsearch) ||
          item.data.carspeed.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch) ||
          item.data.price.toLowerCase().includes(getsearch)
        );
      });
      let searchdata1 = filterdata.filter((row) => {
        if (
          // getsearch === row.data.status ||
          getsearch === row.data.carname ||
          getsearch === row.data.carmodel ||
          getsearch === row.data.carspeed ||
          getsearch === row.data.date ||
          getsearch === row.data.price
        ) {
          return row;
        }
      });
      setcardata(searchdata1);
      // console.log(searchdata);
    } else if (usersele && !getsearch) {
      // console.log("item1");
      setcardata(filterdata);
      searchdata = filterdata.filter((row) => {
        if (row.data.cartype === usersele) {
          return row;
        }
      });
    } else if (getsearch) {
      // console.log("item2");
      searchdata = filterdata.filter((item) => {
        // console.log("item", item);
        return (
          item.data.carname.toLowerCase().includes(getsearch) ||
          // item.data.status.toLowerCase().includes(getsearch) ||
          item.data.carmodel.toLowerCase().includes(getsearch) ||
          item.data.carspeed.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch) ||
          item.data.price.toLowerCase().includes(getsearch)
        );
      });
      setcardata(searchdata);
    } else {
      // console.log("item3");
      searchdata = filterdata.filter((item) => {
        // console.log("item", item);
        return (
          item.data.carname.toLowerCase().includes(getsearch) ||
          // item.data.status.toLowerCase().includes(getsearch) ||
          item.data.carmodel.toLowerCase().includes(getsearch) ||
          item.data.carspeed.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch) ||
          item.data.price.toLowerCase().includes(getsearch)
        );
      });
    }
    // }
    // else {
    //   if (getsearch) {
    //     searchdata = filterdata.filter((item) => {
    //       console.log("juhil1");
    //       return (
    //         item.data.carname.toLowerCase().includes(getsearch) ||
    //         item.data.brandname.toLowerCase().includes(getsearch) ||
    //         item.data.carmodel.toLowerCase().includes(getsearch) ||
    //         item.data.carspeed.toLowerCase().includes(getsearch) ||
    //         item.data.date.toLowerCase().includes(getsearch) ||
    //         item.data.price.toLowerCase().includes(getsearch)
    //       );
    //     });
    //     setcardata(searchdata);
    //   }
    //   //===========================================================================
    //   // else if (!getsearch && usersele) {
    //   //   console.log("juhil2");
    //   //   searchdata = tabledata.filter((row) => {
    //   //     if (row.data.cartype === usersele) {
    //   //       console.log("juhil3");
    //   //       console.log("juhilfilter :>> ", filterdata);
    //   //       return row;
    //   //     }
    //   //     setcardata(filterdata);
    //   //   });
    //   // }
    //   //===========================================================================
    //   // else if (!usersele || usersele === "none") {
    //   //   console.log("juhil4");
    //   //   searchdata = filterdata.filter((row) => {
    //   //     return row;
    //   //   });
    //   // } else if (!getsearch && usersele === "none") {
    //   //   console.log("juhil5");

    //   //   console.log("juhilnone :>> ");
    //   //   setcardata(filterdata);
    //   // }
    //   else {
    //     console.log("juhil6");
    //     // setcardata(filterdata);
    //     searchdata = filterdata.filter((row) => {
    //       return row;
    //     });
    //     // settabledata(filterdata);
    //   }
    // }

    //======================================================================================================

    //======================================================================================================

    // if (getsearch) {
    //   // const getsearch = e.target.value;
    //   settabledata(searchdata);
    //   // this.setState({ tableData: searchdata });
    //   // setcardata(searchdata);
    // } else {
    settabledata(searchdata);
    // this.setState({ tableData: this.state.filterdatas });
    // }
    setquery(getsearch);
    // this.setState({ query: getsearch });
  };

  // const carupdatedetail = () => {
  //   let bookingdata = bookingdetail.filter((row) => {
  //     if (new Date(row.data.returndate) <= new Date()) {
  //       return row;
  //     }
  //   });
  //   console.log("bookindata", bookingdata);
  // };

  useEffect(() => {
    const dbRef = ref(dbs, "cardata");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });

      setcardata(records);
      settabledata(records);
      setfilterdata(records);
    });

    //=================***impotent***=====================//
    // listAll(imagesListRef).then((response) => {
    //   response.items.forEach((item) => {
    //     getDownloadURL(item).then((url) => {
    //       setImageUrls((prev) => [...prev, url]);
    //     });
    //   });
    // });
    //=================***impotent***=====================//
    // carupdatedetail();
  }, []);

  return (
    <>
      <div className="main_div bokdat">
        <Row
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col>
            <form action="#" style={{ marginBottom: "0px" }}>
              <div className="form-input">
                <input
                  type="search"
                  placeholder="Search..."
                  //   value={this.state.query}
                  //   onChange={(e) => {
                  //     // this.setState({ query: e.target.value });
                  //     this.hendalsearch(e);
                  //   }}
                  value={query}
                  onChange={(e) => {
                    // this.setState({ query: e.target.value });
                    hendalsearch(e);
                  }}
                />
                <button type="submit" className="search-btn">
                  <i className="bx bx-search"></i>
                </button>
              </div>
            </form>
          </Col>
          {/* <Row className="d-flex align-items-center justify-content-center">
              <Col lg="10"> */}
          {/* <h1 className="heder hederbd">User Booking Information</h1> */}
          <Col>
            <FormControl className="selectitem" style={{ width: "60%" }}>
              <InputLabel
                id="demo-simple-select-helper-label"
                style={{ color: "var(--dark)" }}
              >
                Car Type
              </InputLabel>
              <Select
                className="selectitem cartype"
                value={usersele}
                name="cartype"
                label="Cartype"
                onChange={handleSele}
                style={{ padding: 27, color: "var(--dark)" }}
              >
                <MenuItem value="none">None of these</MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Coupe">Coupe</MenuItem>
                <MenuItem value="PickupTrucks">Pickup Trucks</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col>
            <div className="abtn">
              <button className="addbtn" onClick={addcar}>
                <IoMdAdd className="addicon" />
                <span>Add</span>
              </button>
            </div>
          </Col>
          {/* </Col>
              <Col className="d-flex justify-content-center"> */}

          {/* </Col>
            </Row> */}
          {/* //======================================================================================================== */}

          {/* //======================================================================================================== */}
        </Row>
        <div className="table_outside">
          <Table className="t" hover>
            <thead>
              <tr>
                {/* <th></th> */}
                {/* <th>No.</th> */}
                {/* <th>username</th> */}
                <th>Car Image</th>
                <th>Car Name</th>
                {/* <th>Email</th> */}
                {/* <th>Phone Number</th> */}
                {/* <th>Car Id</th> */}
                {/* <th>Brand</th> */}
                <th>Model</th>
                {/* <th>Status</th> */}
                <th>Car Speed</th>
                {/* <th>Departure Time</th> */}
                {/* <th>Other Details</th> */}
                {/* <th>Payment by</th> */}
                <th>Description</th>
                <th>Adding Date</th>
                <th>Price</th>
                {/* <th>Booking Time</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tabledata?.length !== 0 ? (
                tabledata.map((row, index) => {
                  return (
                    <tr key={index + 1}>
                      <td
                        onClick={() => {
                          opendescription(row);
                        }}
                        style={{ cursor: "pointer" }}
                        scope="row"
                      >
                        <img
                          src={row.data.carimg}
                          style={{
                            width: 50,
                            height: 50,
                            padding: 3,
                            borderRadius: 5,
                            // border: "2px solid var(--dark)",
                            objectFit: "cover",
                            // background: "var(--light)",
                            background: "#ffff",
                          }}
                        />
                      </td>
                      <td className="name1">{row.data.carname}</td>
                      {/* <td className="name1">{row.data.brandname}</td> */}
                      <td className="name1">{row.data.carmodel}</td>
                      {/* <td
                        className="name1"
                        style={{
                          color:
                            row.data.status === "Rental"
                              ? "var(--lightblue)"
                              : "var(--red)",
                        }}
                      >
                        {row.data.status}
                      </td> */}
                      <td className="name1">{row.data.carspeed} kmph</td>
                      <td
                        className="name1 clihe"
                        onClick={() => {
                          opendescription(row);
                        }}
                      >
                        Click here
                      </td>
                      <td className="name1">{row.data.date}</td>
                      <td className="name1">
                        {row.data.price}
                        <BsCurrencyRupee />
                        /Day
                      </td>
                      <td>
                        <Row className="d-flex justify-content-center">
                          <Col lg="4">
                            <div className="edit">
                              <FaEdit
                                record={row.data}
                                onClick={() => {
                                  navigate("/editcardata", { state: { row } });
                                  // console.log("dskj");
                                }}
                              />
                            </div>
                          </Col>
                          <Col lg="4">
                            <div className="del">
                              <MdDelete
                                // username={row.data.currenttime}
                                record={row.data}
                                onClick={() => {
                                  delepop(row);
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="nodata">
                  <img className="nofoundimg" src={img} />
                  <td>No User Found</td>
                </div>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal
        centered
        size="lg"
        // show={this.state.isOpen}
        isOpen={modal}
        toggle={() => setModal(false)}
        // style={{ width: "30%" }}
      >
        <ModalHeader
          toggle={() => setModal(false)}
          className="mt-1 d-flex justify-content-center updatemodalfooter"
        >
          <h1 className="titles">
            {Cardata.carname}
            <span>'s Data</span>
            {/* {this.state.modfirstname} {this.state.modlastname}'s Data */}
          </h1>
        </ModalHeader>
        <ModalBody>
          <Row className="d-flex justify-content-center ">
            <Row>
              <div className="detailbox">
                <div className="setimg">
                  <img className="setimg_under" src={Cardata.carimg} />
                </div>
                <Row className="alltxt">
                  <Col lg="2" className="sameque">
                    Brand
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="8" className="sameans">
                    {/* {this.state.modcarid} */}
                    {Cardata.brandname}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="2" className="sameque">
                    Car Type
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="8" className="sameans">
                    {/* {this.state.modcarid} */}
                    {Cardata.cartype}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="2" className="sameque">
                    Automatic
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="8" className="sameans">
                    {/* {this.state.modcarid} */}
                    {Cardata.automatic}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="2" className="sameque">
                    Seat Type
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="8" className="sameans">
                    {/* {this.state.modcarid} */}
                    {Cardata.seattype}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="2" className="sameque">
                    Gps
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="8" className="sameans">
                    {/* {this.state.modcarid} */}
                    {Cardata.cargps}
                  </Col>
                </Row>

                <Row className="alltxt">
                  <Col lg="2" className="sameque">
                    Description
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="8" className="sameans Description">
                    {/* {this.state.modcarid} */}
                    {Cardata.description}
                  </Col>
                </Row>
              </div>
            </Row>
          </Row>
        </ModalBody>
      </Modal>
      {/* //=================***impotent***=====================// */}
      {/* {imageUrls.map((url) => {
            return <img src={url} />;
          })} */}
      {/* //=================***impotent***=====================// */}
    </>
  );
};

export default Caritem_under;
