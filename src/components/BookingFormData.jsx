import React, { useState } from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
// import { ref, onValue } from "firebase/database";
import { Label, ModalFooter, Table } from "reactstrap";
import "../Style/contactdata.css";
import "../Style/bookingdata.css";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
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
import swal from "sweetalert";

import EditUserContact from "./EditUserContact";
import img from "../Images/no data found.jpg";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import moment from "moment/moment";
import { useEffect } from "react";

const data = {
  modfirstname: "",
  modlastname: "",
  modphonenumber: "",
  modemail: "",
  moddeliverylocation: "",
  modpickuplocation: "",
  moddeliverydate: "",
  modjourneytime: "",
  modmsg: "",
  moddate: "",
  modtime: "",
};

const UserBookingFormdata = () => {
  const [tableData, settableData] = useState([]);
  const [filterdatas, setfilterdatas] = useState([]);
  const [cardata, setcardata] = useState([]);
  const [cardetail, setcardetail] = useState([]);
  const [usersele, setusersele] = useState("");
  const [query, setquery] = useState("");
  const [modal, setmodal] = useState(false);
  const [modal1, setmodal1] = useState(false);
  const [modaldata, setmodaldata] = useState(data);

  const currentdate = new Date();

  const handleSele = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setusersele(value);
    console.log("juhil search pachi select");

    if (value === "Pending") {
      const scartype = cardata.filter((row) => {
        if (row.data.status === "Pending") {
          return row;
        }
      });
      settableData(scartype);
    } else if (value === "Completed") {
      const scartype = cardata.filter((row) => {
        if (row.data.status === "Completed") {
          return row;
        }
      });
      settableData(scartype);
    } else if (value === "Process") {
      const scartype = cardata.filter((row) => {
        if (row.data.status === "Process") {
          return row;
        }
      });
      settableData(scartype);
    } else if (value === "none") {
      const scartype = cardata.filter((row) => {
        setusersele(null);
        // this.setState({ usersele: "" });
        return row;
      });
      settableData(scartype);
    }
  };

  const getAllData = (props) => {
    return {
      id: props.key,
      data: {
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        phonenumber: props.data.phonenumber,
        email: props.data.email,
        deliverylocation: props.data.deliverylocation,
        pickuplocation: props.data.pickuplocation,
        deliverydate: props.data.deliverydate,
        orderno: props.data.orderno,
        msg: props.data.msg,
        checkboxclick: props.data.checkboxclick,
        date: props.data.date,
        time: props.data.time,
      },
    };
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
    const dbref = ref(dbs);
    const record = getAllData(row);
    const address = "BookingData/" + record.id;
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
        SuccessToast("Row Deleted Successfully");
      } else {
        ErrorToast("cannot delete, please try again");
      }
    });
  };

  const getAllData1 = () => {
    const currentdate = new Date().toLocaleDateString();
    const currenttime = new Date().toLocaleTimeString();
    return {
      id: currenttime,
      data: {
        firstname: modaldata?.modfirstname,
        lastname: modaldata?.modlastname,
        phonenumber: modaldata?.modphonenumber,
        email: modaldata?.modemail,
        deliverylocation: modaldata?.moddeliverylocation,
        pickuplocation: modaldata?.modpickuplocation,
        deliverydate: modaldata?.moddeliverydate,
        journeytime: modaldata?.modjourneytime,
        msg: modaldata?.modmsg,
        checkboxclick: "Unchecked",
        radioValue: "Not Paided",
        status: "Pending",
        date: currentdate,
        time: currenttime,
      },
    };
  };
  const add = () => {
    setmodal(true);
    // this.setState({ modal: true });
  };
  const addData = () => {
    const dbref = ref(dbs);
    const record = getAllData1();
    const address = "BookingData/" + record.id;
    get(child(dbref, address)).then((snapshot) => {
      if (
        !modaldata?.modfirstname ||
        !modaldata?.modlastname ||
        !modaldata?.modemail ||
        !modaldata?.modphonenumber ||
        !modaldata?.moddeliverylocation ||
        !modaldata?.modpickuplocation ||
        !modaldata?.moddeliverydate ||
        !modaldata?.modjourneytime ||
        !modaldata?.modmsg
      ) {
        ErrorToast("Please fill the data");
      } else if (snapshot.exists()) {
        ErrorToast("can't create, please try again");
      } else {
        set(ref(dbs, address), record.data);
        setmodal(false);
        // this.setState({ modal: false });
        setmodaldata(data);
        // this.setState({
        //   modfirstname: "",
        //   modlastname: "",
        //   modphonenumber: "",
        //   modemail: "",
        //   moddeliverylocation: "",
        //   modpickuplocation: "",
        //   moddeliverydate: "",
        //   modorderno: "",
        //   modmsg: "",
        //   moddate: "",
        //   modtime: "",
        // });
        SuccessToast("Added Successfully");
      }
    });
  };

  const statuschange = (row) => {
    const Returndate = filterdatas.filter((item) => {
      if (new Date(item.data.returndate) <= new Date()) {
        return item;
      }
    });

    const data = Returndate.map((row, index) => {
      return row;
    });
    console.log("juhil Returndate", Returndate);

    // let updatecardata = 7.filter((item) => {
    //   if (
    //     item.data.carname === Returndate.data.carname &&
    //     item.data.carmodel === Returndate.data.carmodel
    //   ) {
    //     return item;
    //   }
    //   console.log("first", item);
    // });
    // console.log("updatecardata", updatecardata);
  };

  const opendata = (row) => {
    setmodal1(true);
    setmodaldata({
      modfirstname: row.data.firstname,
      modlastname: row.data.lastname,
      modcarimg: row.data.carimg,
      modcarname: row.data.carname,
      modcarmodel: row.data.carmodel,
      modcartype: row.data.cartype,
      modphonenumber: row.data.phonenumber,
      modemail: row.data.email,
      moddeliverylocation: row.data.deliverylocation,
      modpickuplocation: row.data.pickuplocation,
      moddeliverydate: row.data.deliverydate,
      modorderno: row.data.orderno,
      modmsg: row.data.msg,
      modradioValue: row.data.radioValue,
      modcheckboxclick: row.data.checkboxclick,
      moddate: row.data.date,
      modtime: row.data.time,
    });
    // this.setState({ modal1: true });
    // this.setState({
    //   modfirstname: row.data.firstname,
    //   modlastname: row.data.lastname,
    //   modcarimg: row.data.carimg,
    //   modcarname: row.data.carname,
    //   modcarmodel: row.data.carmodel,
    //   modcartype: row.data.cartype,
    //   modphonenumber: row.data.phonenumber,
    //   modemail: row.data.email,
    //   moddeliverylocation: row.data.deliverylocation,
    //   modpickuplocation: row.data.pickuplocation,
    //   moddeliverydate: row.data.deliverydate,
    //   modorderno: row.data.orderno,
    //   modmsg: row.data.msg,
    //   modradioValue: row.data.radioValue,
    //   modcheckboxclick: row.data.checkboxclick,
    //   moddate: row.data.date,
    //   modtime: row.data.time,
    // });
  };

  const hendalsearch = (e) => {
    // console.log("this.filterdatas :>> ", this.state.filterdatas);
    // console.log("this.tableData :>> ", this.state.tableData);
    const getsearch = e.target.value;

    let searchdata;
    // if (usersele) {
    if (usersele && getsearch) {
      console.log("juhil usersele active :>> ");
      searchdata = tableData.filter((item) => {
        return (
          item.data.firstname.toLowerCase().includes(getsearch) ||
          item.data.lastname.toLowerCase().includes(getsearch) ||
          item.data.orderno.toLowerCase().includes(getsearch) ||
          item.data.deliverylocation.toLowerCase().includes(getsearch) ||
          item.data.pickuplocation.toLowerCase().includes(getsearch) ||
          item.data.returndate.toLowerCase().includes(getsearch) ||
          item.data.deliverydate.toLowerCase().includes(getsearch) ||
          String(item?.data?.carprice)?.includes(getsearch) ||
          item.data.carname.toLowerCase().includes(getsearch) ||
          item.data.status.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch)
        );
      });
      let searchdata1 = filterdatas.filter((row) => {
        if (
          getsearch === row.data.firstname ||
          getsearch === row.data.lastname ||
          getsearch === row.data.orderno ||
          getsearch === row.data.deliverylocation ||
          getsearch === row.data.pickuplocation ||
          getsearch === row.data.returndate ||
          getsearch === row.data.deliverydate ||
          getsearch === String(row.data.carprice) ||
          getsearch === row.data.carname ||
          getsearch === row.data.status ||
          getsearch === row.data.date
        ) {
          return row;
        }
      });
      setcardata(searchdata1);
    } else if (!getsearch && usersele) {
      console.log("juhil getsearch khali :>> ");

      setcardata(filterdatas);
      searchdata = filterdatas.filter((row) => {
        if (row.data.status === usersele) {
          return row;
        }
      });
      //=============================================================
      // this.setState({ cardata: this.state.tableData });
      // console.log("this.state.tabledata :>> ", this.state.tableData);
      // searchdata = this.state?.tableData.filter((row) => {
      //   if (row.data.cartype === this.state.usersele) {
      //     return row;
      //   }
      // });
    } else if (getsearch) {
      console.log("juhil usersele khali");
      searchdata = filterdatas.filter((item) => {
        return (
          item.data.firstname.toLowerCase().includes(getsearch) ||
          item.data.lastname.toLowerCase().includes(getsearch) ||
          item.data.orderno.toLowerCase().includes(getsearch) ||
          item.data.deliverylocation.toLowerCase().includes(getsearch) ||
          item.data.pickuplocation.toLowerCase().includes(getsearch) ||
          item.data.returndate.toLowerCase().includes(getsearch) ||
          item.data.deliverydate.toLowerCase().includes(getsearch) ||
          String(item?.data?.carprice)?.includes(getsearch) ||
          item.data.carname.toLowerCase().includes(getsearch) ||
          item.data.status.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch)
        );
      });
      setcardata(searchdata);
    } else {
      console.log("juhil search pachi select1");
      setcardata(filterdatas);
      searchdata = filterdatas.filter((item) => {
        return (
          item.data.firstname.toLowerCase().includes(getsearch) ||
          item.data.lastname.toLowerCase().includes(getsearch) ||
          item.data.orderno.toLowerCase().includes(getsearch) ||
          item.data.deliverylocation.toLowerCase().includes(getsearch) ||
          item.data.pickuplocation.toLowerCase().includes(getsearch) ||
          item.data.returndate.toLowerCase().includes(getsearch) ||
          item.data.deliverydate.toLowerCase().includes(getsearch) ||
          String(item?.data?.carprice)?.includes(getsearch) ||
          item.data.carname.toLowerCase().includes(getsearch) ||
          item.data.status.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch)
        );
      });
    }
    // } else {
    //   if (getsearch) {
    //     searchdata = filterdatas.filter((item) => {
    //       return (
    //         item.data.firstname.toLowerCase().includes(getsearch) ||
    //         item.data.lastname.toLowerCase().includes(getsearch) ||
    //         item.data.orderno.toLowerCase().includes(getsearch) ||
    //         item.data.deliverylocation.toLowerCase().includes(getsearch) ||
    //         item.data.pickuplocation.toLowerCase().includes(getsearch) ||
    //         item.data.returndate.toLowerCase().includes(getsearch) ||
    //         item.data.deliverydate.toLowerCase().includes(getsearch) ||
    //         String(item?.data?.carprice)?.includes(getsearch) ||
    //         item.data.carname.toLowerCase().includes(getsearch) ||
    //         item.data.status.toLowerCase().includes(getsearch) ||
    //         item.data.date.toLowerCase().includes(getsearch)
    //       );
    //     });
    //     setcardata(tableData);
    //     // this.setState({ cardata: searchdata });
    //   } else {
    //     setcardata(filterdatas);
    //     searchdata = filterdatas.filter((row) => {
    //       return row;
    //     });
    //   }
    // }

    settableData(searchdata);
    setquery(getsearch);
    // this.setState({ tableData: searchdata, query: getsearch });
    //===================================================================================================
    // let data = this.state?.filterdatas?.filter((item) => {
    //   if (item?.data?.status === this.state.usersele) {
    //     return item;
    //   }
    // });
    // console.log("data :>> ", data);
    // if (data.length === 0) {
    //   if (getsearch) {
    //     const searchdata = this.state?.filterdatas.filter((item) => {
    //       return (
    //         item.data.firstname.toLowerCase().includes(getsearch) ||
    //         item.data.lastname.toLowerCase().includes(getsearch) ||
    //         item.data.orderno.toLowerCase().includes(getsearch) ||
    //         item.data.deliverylocation.toLowerCase().includes(getsearch) ||
    //         item.data.pickuplocation.toLowerCase().includes(getsearch) ||
    //         item.data.returndate.toLowerCase().includes(getsearch) ||
    //         item.data.deliverydate.toLowerCase().includes(getsearch) ||
    //         String(item?.data?.carprice)?.includes(getsearch) ||
    //         item.data.carname.toLowerCase().includes(getsearch) ||
    //         item.data.status.toLowerCase().includes(getsearch) ||
    //         item.data.date.toLowerCase().includes(getsearch)
    //       );
    //     });
    //     this.setState({ tableData: searchdata });
    //     console.log("object juhil:>> ", this.state.usersele);
    //   }
    //   this.setState({ query: getsearch });
    // } else {
    //   if (getsearch) {
    //     const searchdata = data.filter((item) => {
    //       return (
    //         item.data.firstname.toLowerCase().includes(getsearch) ||
    //         item.data.lastname.toLowerCase().includes(getsearch) ||
    //         item.data.orderno.toLowerCase().includes(getsearch) ||
    //         item.data.deliverylocation.toLowerCase().includes(getsearch) ||
    //         item.data.pickuplocation.toLowerCase().includes(getsearch) ||
    //         item.data.returndate.toLowerCase().includes(getsearch) ||
    //         item.data.deliverydate.toLowerCase().includes(getsearch) ||
    //         String(item?.data?.carprice)?.includes(getsearch) ||
    //         item.data.carname.toLowerCase().includes(getsearch) ||
    //         item.data.status.toLowerCase().includes(getsearch) ||
    //         item.data.date.toLowerCase().includes(getsearch)
    //       );
    //     });
    //     this.setState({ tableData: searchdata });
    //   } else {
    //     this.setState({ tableData: data });
    //   }
    //   this.setState({ query: getsearch });
    // }
    //=================================================================================================
  };

  useEffect(() => {
    const dbRef = ref(dbs, "BookingData");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;

        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      settableData(records);
      setfilterdatas(records);
      setcardata(records);

      localStorage.setItem("bookingcount", records.length);
    });

    const dbRef1 = ref(dbs, "cardata");
    onValue(dbRef1, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      setcardetail(records);
    });
  }, []);
  //   componentDidMount() {
  //     const dbRef = ref(dbs, "BookingData");
  //     onValue(dbRef, (snapshot) => {
  //       let records = [];
  //       snapshot.forEach((childSnapShot) => {
  //         let keyName = childSnapShot.key;

  //         let data = childSnapShot.val();
  //         records.push({ key: keyName, data: data });
  //       });
  //       this.setState({
  //         tableData: records,
  //         filterdatas: records,
  //         cardata: records,
  //       });

  //       localStorage.setItem("bookingcount", records.length);
  //     });
  //   }
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
                  value={query}
                  onChange={(e) => {
                    hendalsearch(e);
                  }}
                />
                <button type="submit" className="search-btn">
                  <i className="bx bx-search"></i>
                </button>
              </div>
            </form>
          </Col>
          <Col>
            <FormControl className="selectitem" style={{ width: "50%" }}>
              <InputLabel
                id="demo-simple-select-helper-label"
                style={{ color: "var(--dark)" }}
              >
                Status
              </InputLabel>
              <Select
                className="selectitem cartype"
                value={usersele}
                name="status"
                label="status"
                onChange={(e) => {
                  handleSele(e);
                }}
                style={{ padding: 27, color: "var(--dark)" }}
              >
                <MenuItem value="none">None of these</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Process">Process</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col></Col>
        </Row>
        <div className="table_outside">
          <Table className="t" hover>
            <thead>
              <tr>
                <th
                  style={{
                    width: tableData?.length === 0 ? "10%" : "",
                  }}
                >
                  Order No.
                </th>
                <th>Full Name</th>

                <th>Car Name</th>
                <th>Starting Location</th>
                <th>Ending Location</th>
                <th>Departure Date</th>
                <th>Return Date</th>

                <th>Booking Date</th>
                <th>Total Payment</th>
                <th>Status</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tableData?.length !== 0 ? (
                tableData.map((row, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{row.data.orderno}</td>
                      <td
                        className="name1"
                        record={row.data}
                        role="button"
                        onClick={() => {
                          opendata(row);
                        }}
                      >
                        {row.data.firstname} {row.data.lastname}
                      </td>

                      <td className="name1">{row.data.carname}</td>
                      <td className="name1">{row.data.deliverylocation}</td>
                      <td className="name1">{row.data.pickuplocation}</td>
                      <td className="name1">{row.data.deliverydate}</td>
                      <td className="name1">
                        {row.data.returndate}
                        {new Date(row.data.returndate) >= new Date() ? (
                          ""
                        ) : (
                          <>{statuschange(row)}</>
                        )}
                      </td>

                      <td className="name1">{row.data.date}</td>
                      <td className="name1">
                        <BsCurrencyRupee />
                        {row.data.carprice}
                      </td>

                      <td>
                        <span
                          className={
                            row.data.status === "Pending"
                              ? "status pending"
                              : row.data.status === "Completed"
                              ? "status completed"
                              : row.data.status === "Process"
                              ? "status process"
                              : "status"
                          }
                        >
                          {row.data.status}
                        </span>
                      </td>
                      <td>
                        <Row className="d-flex justify-content-center">
                          <Col lg="4">
                            <EditUserContact record={row} />
                          </Col>
                          <Col lg="4">
                            <div className="del">
                              <MdDelete
                                record={row.data}
                                onClick={() => delepop(row)}
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
                  <td className="nodatafound">No Booking Found</td>
                </div>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal centered size="lg" isOpen={modal1} toggle={() => setmodal1(false)}>
        <ModalHeader
          toggle={() => setmodal1(false)}
          className="mt-1 d-flex justify-content-center updatemodalfooter"
        >
          <h1 className="titles">
            {modaldata?.modfirstname} {modaldata?.modlastname}'s Data
          </h1>
        </ModalHeader>
        <ModalBody>
          <Row className="d-flex justify-content-center ">
            <Row>
              <div className="detailbox">
                <Row className="alltxt">
                  <div className="setimg">
                    <img className="setimg_under" src={modaldata?.modcarimg} />
                  </div>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Car Name
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {modaldata?.modcarname}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Car Model
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {modaldata?.modcarmodel}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Car Type
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {modaldata?.modcartype}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Email
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {modaldata?.modemail}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Phone Number
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {modaldata?.modphonenumber}
                  </Col>
                </Row>

                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Booking Time
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {modaldata?.modtime}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Other Details
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans modalmsg">
                    {modaldata?.modmsg}
                  </Col>
                </Row>
              </div>
            </Row>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default UserBookingFormdata;
