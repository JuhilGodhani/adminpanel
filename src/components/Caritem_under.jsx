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
import { useNavigate } from "react-router-dom";
import img from "../Images/no data found.jpg";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Label, ModalFooter, Table } from "reactstrap";
import { ErrorToast, SuccessToast } from "../helper/Toast";
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
  const [filterdata, setfilterdata] = useState([]);
  const [query, setquery] = useState("");

  const navigate = useNavigate();

  const addcar = () => {
    navigate("/addcar");
  };

  const opendescription = (row) => {
    // console.log("row :>> ", row);
    setModal(true);
    setCardata(row.data);
  };

  const dele = (row) => {
    console.log("rowdsfjnm :>> ", row);
    const getAllData = (props) => {
      // console.log("row1231", props);
      return {
        id: props.time,
        data: {
          carname: props.carname,
          carmodel: props.carmodel,
          carimg: props.carimg,
          brandname: props.brandname,
          price: props.price,
          carspeed: props.carspeed,
          cargps: props.cargps,
          seattype: props.seattype,
          automatic: props.automatic,
          description: props.description,
          carrating: props.carrating,
          date: props.date,
          time: props.time,
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

    if (getsearch) {
      // const getsearch = e.target.value;
      const searchdata = tabledata.filter((item) => {
        // console.log("item", item);
        return (
          item.data.carname.toLowerCase().includes(getsearch) ||
          item.data.brandname.toLowerCase().includes(getsearch) ||
          item.data.carmodel.toLowerCase().includes(getsearch) ||
          item.data.carspeed.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch) ||
          item.data.price.toLowerCase().includes(getsearch)
        );
      });
      settabledata(searchdata);
      // this.setState({ tableData: searchdata });
    } else {
      settabledata(filterdata);
      // this.setState({ tableData: this.state.filterdatas });
    }
    setquery(getsearch);
    // this.setState({ query: getsearch });
  };

  useEffect(() => {
    const dbRef = ref(dbs, "cardata");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      // console.log("records :>> ", records);
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
  }, []);

  return (
    <>
      <div className="main_div bokdat">
        <Row>
          <Col>
            <form action="#">
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
                <th>Brand</th>
                <th>Model</th>
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
                            padding: 5,
                            borderRadius: 5,
                            border: "2px solid var(--dark)",
                            objectFit: "cover",
                            background: "var(--light)",
                          }}
                        />
                      </td>
                      <td className="name1">{row.data.carname}</td>
                      <td className="name1">{row.data.brandname}</td>
                      <td className="name1">{row.data.carmodel}</td>
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
                                  dele(row.data);
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
