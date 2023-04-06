import React, { useState, Fragment, useEffect } from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { ref, onValue } from "firebase/database";
import { Row, Col, Table } from "reactstrap";
import "../Style/contactdata.css";
import Bookinghistory from "../Pages/Bookinghistory";
import { MdDelete } from "react-icons/md";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
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
import swal from "sweetalert";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import { color } from "@mui/system";

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
  const [usersele, setUsersele] = useState("");
  const [cardata, setcardata] = useState([]);

  const navigate = useNavigate();

  const handleSele = async (event) => {
    let name = event.target.name;
    let value = event.target.value;
    // console.log(value);

    setUsersele(value);

    if (value === "Male") {
      const scartype = await cardata.filter((row) => {
        if (row.data.gender === "Male") {
          return row;
        }
      });
      settabledata(scartype);
    } else if (value === "Female") {
      const scartype = await cardata.filter((row) => {
        if (row.data.gender === "Female") {
          return row;
        }
      });
      settabledata(scartype);
    } else if (value === "Other") {
      const scartype = await cardata.filter((row) => {
        if (row.data.gender === "Other") {
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

  const getAllData = (props) => {
    console.log("row", props);
    return { id: props.key };
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
        return Delete(row);
        // swal("Poof! Your imaginary file has been deleted!", {
        //   icon: "success",
        // });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
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

    let searchdata;
    // if (usersele) {
    if (usersele && getsearch) {
      searchdata = tabledata.filter((item) => {
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
      let searchdata1 = filterdata.filter((row) => {
        if (
          getsearch === row.data.firstname ||
          getsearch === row.data.lastname ||
          getsearch === row.data.email ||
          getsearch === row.data.gender ||
          getsearch === row.data.phonenumber ||
          getsearch === row.data.time ||
          getsearch === row.data.date
        ) {
          return row;
        }
      });
      setcardata(searchdata1);
    } else if (!getsearch && usersele) {
      console.log("getsearch khali :>> ");

      setcardata(filterdata);
      searchdata = filterdata.filter((row) => {
        if (row.data.gender === usersele) {
          return row;
        }
      });
    } else if (getsearch) {
      searchdata = filterdata.filter((item) => {
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
      setcardata(searchdata);
    } else {
      searchdata = filterdata.filter((item) => {
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
    }
    // } else {
    //   if (getsearch) {
    //     searchdata = filterdata.filter((item) => {
    //       return (
    //         item.data.firstname.toLowerCase().includes(getsearch) ||
    //         item.data.lastname.toLowerCase().includes(getsearch) ||
    //         item.data.email.toLowerCase().includes(getsearch) ||
    //         item.data.gender.toLowerCase().includes(getsearch) ||
    //         item.data.phonenumber.toLowerCase().includes(getsearch) ||
    //         item.data.date.toLowerCase().includes(getsearch) ||
    //         item.data.time.toLowerCase().includes(getsearch)
    //       );
    //     });
    //     setcardata(searchdata);
    //     // this.setState({ cardata: searchdata });
    //   } else {
    //     searchdata = filterdata.filter((row) => {
    //       return row;
    //     });
    //   }
    settabledata(searchdata);
    setquery(getsearch);
    // }
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
      setcardata(records);
      // this.setState({ tableData: records, filterdatas: records });
      localStorage.setItem("registercountdata", records.length);
    });
  }, []);
  return (
    <>
      <div className="main_div">
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
          <Col>
            <FormControl className="selectitem" style={{ width: "60%" }}>
              <InputLabel
                id="demo-simple-select-helper-label"
                style={{ color: "var(--dark)" }}
              >
                Gender
              </InputLabel>
              <Select
                className="selectitem cartype"
                value={usersele}
                name="Gender"
                label="Gender"
                onChange={handleSele}
                style={{ padding: 27, color: "var(--dark)" }}
              >
                <MenuItem value="none">None of these</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col></Col>
        </Row>
        {/* <h1 className="heder">User Register History</h1> */}
        <div className="table_outside">
          <Table className="t" hover>
            <thead>
              <tr>
                {/* <th>No.</th> */}
                {/* <th>username</th> */}
                <th>Image</th>
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
                        // onClick={() => {
                        //   opendescription(row);
                        // }}
                        style={{ cursor: "pointer" }}
                        scope="row"
                      >
                        <img
                          src={row?.data?.userimg}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "20px",
                            width: 50,
                            height: 50,
                            padding: 4,
                            borderRadius: 25,
                            // border: "2px solid var(--dark)",
                            objectFit: "cover",
                            background: "#ffff",
                          }}
                        />
                      </td>
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
    </>
  );
};

export default UserRegisterdata;
