import React, { useEffect, useState } from "react";
import "../Style/dashboard_under.css";
import { TbBrandBooking } from "react-icons/tb";
import { MdContactMail } from "react-icons/md";
import { dbs } from "../Admin/userfirebase/userfirebase";
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
import EditUserContact from "./EditUserContact";
import { MdDelete } from "react-icons/md";
import img from "../Images/no data found.jpg";
import { Label, ModalFooter, Table } from "reactstrap";
import { width } from "@mui/system";
import moment from "moment";

const Dashboard_under = () => {
  const [Usercon, setUsercon] = useState("");
  const [Uservis, setUservis] = useState("");
  const [Userbook, setUserbook] = useState("");
  const [Search, setSearch] = useState(false);
  const [Tabledata, setTabledata] = useState([]);
  const [Filterdatas, setFilterdatas] = useState([]);
  const [Query, setQuery] = useState("");

  useEffect(() => {
    const dbRef = ref(dbs, "ContactDatas");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      setUsercon(records.length);
    });

    const dbRef1 = ref(dbs, "UserRegisterData");
    onValue(dbRef1, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      setUservis(records.length);
    });

    const dbRef2 = ref(dbs, "BookingData");
    onValue(dbRef2, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      const currentdate = new Date().toLocaleDateString();
      let data = records.filter((row) => {
        if (row.data.date === currentdate) {
          return row;
        }
      });
      setTabledata(data);
      setFilterdatas(records);
      setUserbook(records.length);
    });
  }, []);

  const opensearch = () => {
    setSearch(true);
  };

  const hendalsearch = (e) => {
    const getsearch = e.target.value;
    // console.log("juhil", getsearch);

    if (getsearch) {
      // const getsearch = e.target.value;
      const searchdata = Tabledata.filter((item) => {
        // console.log("item", item);
        return (
          item.data.firstname.toLowerCase().includes(getsearch) ||
          item.data.lastname.toLowerCase().includes(getsearch) ||
          item.data.deliverylocation.toLowerCase().includes(getsearch) ||
          item.data.pickuplocation.toLowerCase().includes(getsearch) ||
          item.data.checkboxclick.toLowerCase().includes(getsearch) ||
          item.data.radioValue.toLowerCase().includes(getsearch) ||
          item.data.carname.toLowerCase().includes(getsearch) ||
          item.data.deliverydate.toLowerCase().includes(getsearch) ||
          item.data.journeytime.toLowerCase().includes(getsearch) ||
          // item.data.date.toLowerCase().includes(getsearch) ||
          item.data.time.toLowerCase().includes(getsearch)
        );
      });
      setTabledata(searchdata);
      // this.setState({ tableData: searchdata });
    } else {
      setTabledata(Filterdatas);
      // this.setState({ tableData: this.state.filterdatas });
    }
    setQuery(getsearch);
    // this.setState({ query: getsearch });
  };

  return (
    <>
      {/* // <main id="dashboard">
    //   <div className="head-title">
    //     <div className="left">
    //       <h1>Dashboard</h1>
    //       <ul className="breadcrumb">
    //         <li>
    //           <a href="#">Dashboard</a>
    //         </li>
    //         <li>
    //           <i className="bx bx-chevron-right"></i>
    //         </li>
    //         <li>
    //           <a className="active" href="#">
    //             Home
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <a href="#" className="btn-download">
    //       <i className="bx bxs-cloud-download"></i>
    //       <span className="text">Download PDF</span>
    //     </a>
    //   </div> */}

      <ul className="box-info">
        <li>
          {/* <i className="bx bxs-calendar-check"></i> */}
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>{Uservis}</h3>
            <p>Visitors</p>
          </span>
        </li>
        <li>
          <i className="bx">
            <TbBrandBooking />
          </i>
          <span className="text">
            <h3>{Userbook}</h3>
            <p>Total Booking</p>
          </span>
        </li>
        <li>
          <i className="bx">
            <MdContactMail />
          </i>
          <span className="text">
            <h3>{Usercon}</h3>
            <p>User Contact</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Today's Booking</h3>

            {Search === true ? (
              <div className="form-input">
                <input
                  type="search"
                  placeholder="Search..."
                  value={Query}
                  onChange={(e) => {
                    // this.setState({ query: e.target.value });
                    hendalsearch(e);
                  }}
                />
                <button type="submit" className="search-btn">
                  <i className="bx bx-search"></i>
                </button>
              </div>
            ) : (
              <i className="bx bx-search bx1" onClick={opensearch}></i>
            )}
            {/* <i className="bx bx-filter"></i> */}
          </div>
          <table>
            <thead>
              <tr>
                {/* <th></th> */}
                {/* <th>No.</th> */}
                <th style={{ textAlign: "center" }}>Car Image</th>
                <th
                  style={{
                    width: Tabledata?.length === 0 ? "145px" : "",
                    textAlign: "center",
                  }}
                >
                  Full Name
                </th>
                {/* <th>Email</th> */}
                {/* <th>Phone Number</th> */}

                {/* <th>Car Id</th> */}
                <th style={{ textAlign: "center" }}>Car Name</th>
                <th style={{ textAlign: "center" }}>Starting Location</th>
                <th style={{ textAlign: "center" }}>Ending Location</th>
                <th style={{ textAlign: "center" }}>Departure Date</th>
                {/* <th>Departure Time</th> */}
                {/* <th>Other Details</th> */}
                <th style={{ textAlign: "center" }}>Return Date</th>
                <th style={{ textAlign: "center" }}>Total Payment</th>
                {/* <th>Policy click</th> */}
                {/* <th>Booking Date</th> */}
                <th style={{ textAlign: "center" }}>Booking Time</th>
                <th style={{ textAlign: "center" }}>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {Tabledata?.length !== 0 ? (
                Tabledata.map((row, index) => {
                  return (
                    <tr key={index + 1}>
                      {/* <td></td> */}
                      {/* <td>{index + 1}</td> */}
                      <td scope="row">
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
                      <td className="name1" style={{ textAlign: "center" }}>
                        {row.data.firstname} {row.data.lastname}
                      </td>
                      {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

                      {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}
                      {/* <td>{row.data.email}</td> */}
                      {/* <td>{row.data.phonenumber}</td> */}
                      {/* <td className="name1">{row.data.carid}</td> */}
                      <td className="name1" style={{ textAlign: "center" }}>
                        {row.data.carname}
                      </td>
                      <td className="name1" style={{ textAlign: "center" }}>
                        {row.data.deliverylocation}
                      </td>
                      <td className="name1" style={{ textAlign: "center" }}>
                        {row.data.pickuplocation}
                      </td>
                      <td className="name1" style={{ textAlign: "center" }}>
                        {row.data.deliverydate}
                      </td>
                      {/* <td className="name1" style={{ textAlign: "center" }}>
                        {moment(row.data.journeytime, "hh:mm A").format("LT")}
                      </td> */}
                      {/* <td>{row.data.msg}</td> */}
                      <td className="name1" style={{ textAlign: "center" }}>
                        {row.data.returndate}
                      </td>
                      <td className="name1" style={{ textAlign: "center" }}>
                        <BsCurrencyRupee />
                        {row.data.carprice}
                      </td>
                      {/* <td className="name1" style={{ textAlign: "center" }}>{row.data.checkboxclick}</td> */}
                      {/* <td className="name1" style={{ textAlign: "center" }}>{row.data.date}</td> */}
                      <td className="name1" style={{ textAlign: "center" }}>
                        {row.data.time}
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
                      {/* <td>
                      <Row className="d-flex justify-content-center">
                        <Col lg="4">
                          <EditUserContact record={row.data} />
                        </Col>
                        <Col lg="4">
                          <div className="del">
                            <MdDelete
                              // username={row.data.currenttime}
                              record={row.data}
                              // onClick={() => this.delete(row)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </td> */}
                    </tr>
                  );
                })
              ) : (
                <div className="nodata">
                  <img className="nofoundimg" src={img} />
                  <td>No Booking Found</td>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
    // </main>
  );
};

export default Dashboard_under;
