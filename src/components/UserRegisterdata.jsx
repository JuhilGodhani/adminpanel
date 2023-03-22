import React, { useState, Fragment, useEffect } from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { ref, onValue } from "firebase/database";
import { Row, Col, Table } from "reactstrap";
import "../Style/contactdata.css";
import Bookinghistory from "../Pages/Bookinghistory";
import { MdDelete } from "react-icons/md";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";
import img from "../Images/no data found.jpg";

import { ErrorToast, SuccessToast } from "../helper/Toast";

// export class RegisterData extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       tableData: [],
//       filterdatas: [],
//       query: "",
//     };
//   }
//   getAllData(props) {
//     console.log("row", props);
//     return { id: props.data.time };
//   }

//   delete(row) {
//     const dbref = ref(dbs);
//     // console.log("first");
//     const record = this.getAllData(row);
//     // console.log("record", record);
//     const address = "UserRegisterData/" + record.id;
//     // console.log("dsf", address);
//     get(child(dbref, address)).then((snapshot) => {
//       if (snapshot.exists()) {
//         remove(ref(dbs, address));
//         SuccessToast("Row Deleted Successfully");
//       } else {
//         ErrorToast("can't delete,user does not exists ");
//       }
//     });
//   }

//   hendalsearch(e) {
//     const getsearch = e.target.value;
//     // console.log("juhil", getsearch);

//     if (getsearch) {
//       // const getsearch = e.target.value;
//       const searchdata = this.state.tableData.filter((item) => {
//         // console.log("item", item);
//         return (
//           item.data.firstname.toLowerCase().includes(getsearch) ||
//           item.data.lastname.toLowerCase().includes(getsearch) ||
//           item.data.email.toLowerCase().includes(getsearch) ||
//           item.data.gender.toLowerCase().includes(getsearch) ||
//           item.data.phonenumber.toLowerCase().includes(getsearch) ||
//           item.data.date.toLowerCase().includes(getsearch) ||
//           item.data.time.toLowerCase().includes(getsearch)
//         );
//       });
//       this.setState({ tableData: searchdata });
//     } else {
//       this.setState({ tableData: this.state.filterdatas });
//     }
//     this.setState({ query: getsearch });
//   }

//   componentDidMount() {
//     const dbRef = ref(dbs, "UserRegisterData");

//     onValue(dbRef, (snapshot) => {
//       let records = [];
//       snapshot.forEach((childSnapShot) => {
//         let keyName = childSnapShot.key;
//         let data = childSnapShot.val();
//         records.push({ key: keyName, data: data });
//       });
//       this.setState({ tableData: records, filterdatas: records });
//       localStorage.setItem("registercountdata", records.length);
//     });
//   }

//   render() {
//     return (
//       <>
//         <Routes>
//           <Route path="/bookinghistory" element={<Bookinghistory />}></Route>
//         </Routes>
//         <div className="main_div">
//           <form action="#">
//             <div className="form-input">
//               <input
//                 type="search"
//                 placeholder="Search..."
//                 value={this.state.query}
//                 onChange={(e) => {
//                   // this.setState({ query: e.target.value });
//                   this.hendalsearch(e);
//                 }}
//               />
//               <button type="submit" className="search-btn">
//                 <i className="bx bx-search"></i>
//               </button>
//             </div>
//           </form>
//           {/* <h1 className="heder">User Register History</h1> */}
//           <div className="table_outside">
//             <Table className="t" hover>
//               <thead>
//                 <tr>
//                   {/* <th>No.</th> */}
//                   {/* <th>username</th> */}
//                   <th>Name</th>
//                   <th>Phone number</th>
//                   <th>Gender</th>
//                   <th>Email</th>
//                   {/* <th>Password</th> */}
//                   <th>Created</th>
//                   <th>Time</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {this.state.tableData.map((row, index) => {
//                   return (
//                     <tr key={index + 1}>
//                       {/* <td>{index + 1}</td> */}
//                       <td
//                         className="name1"
//                         role="button"
//                         onClick={() => {
//                           console.log("click");
//                         }}
//                       >
//                         {row.data.firstname} {row.data.lastname}
//                       </td>
//                       <td className="name1">{row.data.phonenumber}</td>
//                       <td>{row.data.gender}</td>
//                       <td>{row.data.email}</td>
//                       {/* <td>{row.data.password}</td> */}
//                       <td className="name1">{row.data.date}</td>
//                       <td className="name1">{row.data.time}</td>
//                       <td>
//                         <Row className="d-flex justify-content-center">
//                           <Col lg="4">
//                             <div className=" del">
//                               <MdDelete
//                                 // username={row.data.currenttime}
//                                 // record={row.data}
//                                 onClick={() => this.delete(row)}
//                               />
//                             </div>
//                           </Col>
//                         </Row>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </Table>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// import React from 'react'

const UserRegisterdata = () => {
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
    const address = "UserRegisterData/" + record.id;
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
          item.data.email.toLowerCase().includes(getsearch) ||
          item.data.gender.toLowerCase().includes(getsearch) ||
          item.data.phonenumber.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch) ||
          item.data.time.toLowerCase().includes(getsearch)
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

  const setlocalstorage = (row) => {
    console.log("rowdsc :>> ", row);
    localStorage.setItem("regidata", JSON.stringify(row.data));
  };

  useEffect(() => {
    const dbRef = ref(dbs, "UserRegisterData");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      settabledata(records);
      setfilterdata(records);
      // this.setState({ tableData: records, filterdatas: records });
      localStorage.setItem("registercountdata", records.length);
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
                {/* <th>No.</th> */}
                {/* <th>username</th> */}
                <th>Name</th>
                <th>Phone number</th>
                <th>Gender</th>
                <th>Email</th>
                {/* <th>Password</th> */}
                <th>Created</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tabledata?.length !== 0 ? (
                tabledata.map((row, index) => {
                  return (
                    <tr key={index + 1}>
                      {/* <td>{index + 1}</td> */}
                      <td
                        className="name1"
                        role="button"
                        onClick={() => {
                          console.log("clicksdvjbhnmd");
                          navigate("/bookinghistory");
                          setlocalstorage(row);
                        }}
                      >
                        {row.data.firstname} {row.data.lastname}
                      </td>
                      <td className="name1">{row.data.phonenumber}</td>
                      <td>{row.data.gender}</td>
                      <td>{row.data.email}</td>
                      {/* <td>{row.data.password}</td> */}
                      <td className="name1">{row.data.date}</td>
                      <td className="name1">{row.data.time}</td>
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
                  <td>No User Found</td>
                </div>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserRegisterdata;
