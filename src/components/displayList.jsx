import React, { useState, useEffect } from "react";
import { DisplayForm } from "./displayForm";
import myFirebaseDB from "../components/firebase";
import { Button } from "reactstrap";

export const Contact = () => {
  var [phonebookEntry, setPhonebookEntry] = useState({});
  var [contactId, setcontactId] = useState("");

  useEffect(() => {
    myFirebaseDB.child("phonebookEntry").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setPhonebookEntry({
          ...snapshot.val(),
        });
      } else {
        setPhonebookEntry({});
      }
    });
  }, []);

  const handleContactDetails = (obj) => {
    console.log("My Received Obj:", obj);
    if (contactId === "") {
      myFirebaseDB.child("phonebookEntry").push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setcontactId("");
        }
      });
    } else {
      myFirebaseDB.child(`phonebookEntry/${contactId}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setcontactId("");
        }
      });
    }
  };

  const removeContactDetails = (id) => {
    const val = window.confirm("Delete Current Phonebook Entry?");
    console.log(val);
    if (val) {
      myFirebaseDB.child(`phonebookEntry/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setcontactId("");
        }
      });
    }
  };

  return (
    <div>
      <div>
        <hr />
        <div style={{ padding: "40px 60px" }}>
          <DisplayForm
            {...{ handleContactDetails, contactId, phonebookEntry }}
          />
        </div>
        <br />
        <hr />
        <div style={{ margin: "30px 120px" }}>
          <h2 style={{ backgroundColor: "lightcyan", padding: "5px" }}>
            My Phonebook List
          </h2>
          <hr />
          <table style={{ padding: "5px" }}>
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    background: "orange",
                  }}
                >
                  <strong>Contact Name</strong>
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    background: "green",
                    color: "white",
                  }}
                >
                  <strong>Contact Number</strong>
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    background: "yellow",
                  }}
                >
                  <strong>Email</strong>
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    background: "pink",
                  }}
                >
                  <strong>Contact Type</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(phonebookEntry).map((id) => {
                return (
                  <tr key={id}>
                    <td style={{ border: "1px solid black" }}>
                      {phonebookEntry[id].contactName}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {phonebookEntry[id].phone}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {phonebookEntry[id].email}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {phonebookEntry[id].contactType.toUpperCase()}
                    </td>
                    <td style={{ padding: "5px" }}>
                      <a onClick={() => setcontactId(id)}>
                        <Button style={{ background: "green" }}>Edit</Button>
                      </a>
                      &nbsp;
                      <a
                        onClick={() => {
                          removeContactDetails(id);
                        }}
                      >
                        <Button style={{ background: "red" }}>Delete</Button>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Contact;
