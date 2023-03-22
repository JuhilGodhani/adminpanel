import React from "react";
import { dbs } from "../userfirebase/userfirebase";
// import { ref, onValue } from "firebase/database";
import { Row, Table } from "reactstrap";
import "../../style/contactdata.css";
import EditUserContact from "./EditUserContact";
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
import { ErrorToast } from "../../helper/Toast";

export className ContactDatas extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }

  getAllData(props) {
    console.log("row", props);
    return { id: props.data.time };
  }

  delete(row) {
    const dbref = ref(dbs);
    // console.log("first");
    const record = this.getAllData(row);
    // console.log("record", record);
    const address = "ContactDatas/" + record.id;
    // console.log("dsf", address);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
      } else {
        ErrorToast("can't delete,user does not exists ");
      }
    });
  }

  componentDidMount() {
    const dbRef = ref(dbs, "ContactDatas");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
      localStorage.setItem("contactdata", records.length);

    });
  }

  render() {
    return (
      <>
        <div classNameName="main_div">
          <h1 classNameName="heder">User Contact Data</h1>
          <Table striped classNameName="t">
            <thead>
              <tr>
                <th>No.</th>
                {/* <th>username</th> */}
                <th>User Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.tableData.map((row, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    {/* <td>{row.data.key}</td> */}
                    <td classNameName="name1">{row.data.yourName}</td>
                    <td>{row.data.email}</td>
                    <td classNameName="name1">{row.data.message}</td>
                    <td classNameName="name1">{row.data.date}</td>
                    <td classNameName="name1">{row.data.time}</td>
                    {/* <td>
                      <EditUserContact
                        username={row.data.yourName}
                        record={row.data}
                      />
                    </td> */}
                    <td>
                      <Row classNameName="d-flex justify-content-center">
                        <div classNameName=" del">
                          <MdDelete
                            // username={row.data.currenttime}
                            // record={row.data}
                            onClick={() => this.delete(row)}
                          />
                        </div>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
