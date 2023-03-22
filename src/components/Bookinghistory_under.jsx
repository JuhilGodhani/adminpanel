import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/contactdata.css";
import { TbBrandBooking } from "react-icons/tb";
import { MdContactMail } from "react-icons/md";
import { dbs } from "../Admin/userfirebase/userfirebase";
import { ErrorToast, SuccessToast } from "../helper/Toast";
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
const Bookinghistory_under = () => {
  const [tabledata, settabledata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [query, setquery] = useState("");

  const navigate = useNavigate();

  const getAllData = (props) => {
    console.log("row", props);
    return { id: props.data.time };
  };

  const Delete = (row) => {
    const dbref = ref(dbs);
    // console.log("first");
    const record = getAllData(row);
    // console.log("record", record);
    const address = "BookingData/" + record.id;
    // console.log("dsf", address);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
        SuccessToast("Row Deleted Successfully");
      } else {
        ErrorToast("can't delete,user does not exists ");
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
          item.data.firstname.toLowerCase().includes(getsearch) ||
          item.data.lastname.toLowerCase().includes(getsearch) ||
          item.data.orderno.toLowerCase().includes(getsearch) ||
          item.data.orderno.toLowerCase().includes(getsearch) ||
          item.data.deliverylocation.toLowerCase().includes(getsearch) ||
          item.data.pickuplocation.toLowerCase().includes(getsearch) ||
          item.data.deliverydate.toLowerCase().includes(getsearch) ||
          // item.data.journeytime.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch) ||
          item.data.carname.toLowerCase().includes(getsearch) ||
          item.data.checkboxclick.toLowerCase().includes(getsearch) ||
          item.data.status.toLowerCase().includes(getsearch)
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
    const regidata = JSON.parse(localStorage.getItem("regidata"));

    const dbRef1 = ref(dbs, "UserRegisterData");
    onValue(dbRef1, (snapshot) => {
      let records1 = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records1.push({ key: keyName, data: data });
      });
      //   console.log("records1 :>> ", records1);
      const dbRef2 = ref(dbs, "BookingData");
      onValue(dbRef2, (snapshot) => {
        let records = [];
        snapshot.forEach((childSnapShot) => {
          let keyName = childSnapShot.key;
          let data = childSnapShot.val();
          records.push({ key: keyName, data: data });
        });

        const email = regidata.email;
        // records1.map((row) => {
        //   return row.data.email;
        // });

        let data = records.filter((row) => {
          if (row.data.email === email) {
            return row;
          }
        });
        settabledata(data);
        setfilterdata(data);
        // console.log("ddfkm", data);
        // console.log("email :>> ", data);
      });
    });
  }, []);

  return (
    <>
      <div className="main_div">
        <form action="#">
          <div className="form-input">
            <input
              type="search"
              placeholder="Search..."
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
        {/* <h1 className="heder">User Register History</h1> */}
        <div className="table_outside">
          <Table className="t" hover>
            <thead>
              <tr>
                {/* <th></th> */}
                {/* <th>No.</th> */}
                {/* <th>username</th> */}
                <th>Order No</th>
                <th>Full Name</th>
                {/* <th>Phone Number</th> */}
                {/* <th>Car Id</th> */}
                <th>Car Name</th>
                <th>Starting Location</th>
                <th>Ending Location</th>
                <th>Departure Date</th>
                <th>Return Date</th>
                {/* <th>Departure Time</th> */}
                {/* <th>Other Details</th> */}
                {/* <th>Payment by</th> */}
                {/* <th>Policy click</th> */}
                <th>Booking Date</th>
                <th>Total Payment</th>
                {/* <th>Booking Time</th> */}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tabledata?.length !== 0 ? (
                tabledata.map((row, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{row.data.orderno}</td>
                      <td className="name1">
                        {row.data.firstname} {row.data.lastname}
                      </td>
                      <td className="name1">{row.data.carname}</td>
                      <td className="name1">{row.data.deliverylocation}</td>
                      <td className="name1">{row.data.pickuplocation}</td>
                      <td className="name1">{row.data.deliverydate}</td>
                      <td className="name1">{row.data.returndate}</td>
                      {/* <td className="name1">
                        {moment(row.data.journeytime, "hh:mm A").format("LT")}
                      </td> */}
                      {/* <td className="name1">{row.data.checkboxclick}</td> */}

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
                            <div className=" del">
                              <MdDelete
                                // username={row.data.currenttime}
                                // record={row.data}
                                onClick={() => {
                                  Delete(row);
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
                  <td className="nodatafound">No Booking Found</td>
                </div>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Bookinghistory_under;
