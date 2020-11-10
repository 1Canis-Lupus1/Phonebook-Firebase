import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export class DisplayForm extends Component {
  state = {
    entry: {
      contactName: "",
      phone: "",
      email: "",
      contactType: "",
    },
    isTrue: {
      contactName: false,
      phone: false,
      email: false,
      contactType: false,
    },
    errors: {},
  };

  componentDidUpdate(prevProps) {
    if (this.props.contactId !== prevProps.contactId) {
      let { entry } = this.state;
      if (this.props.contactId === "") {
        entry = {
          contactName: "",
          phone: "",
          email: "",
          contactType: "",
        };
      } else {
        entry = {
          contactName: this.props.phonebookEntry[this.props.contactId]
            .contactName,
          phone: this.props.phonebookEntry[this.props.contactId].phone,
          email: this.props.phonebookEntry[this.props.contactId].email,
          contactType: this.props.phonebookEntry[this.props.contactId]
            .contactType,
        };
      }
      this.setState({ entry });
    }
  }

  handleChange = (field, value) => {
    const { entry, isTrue } = this.state;
    entry[field] = value;
    isTrue[field] = true;
    console.log("Field:", field, value);
    this.setState({ entry, isTrue }, () => {
      this.validation();
    });
  };

  validation = () => {
    const { entry, errors, isTrue } = this.state;
    console.log("Entry;", entry);
    Object.keys(entry).forEach((each) => {
      switch (each) {
        case "contactName": {
          if (isTrue.contactName) {
            if (!entry.contactName.trim().length) {
              errors.contactName = "*Field cannot be empty";
            } else {
              delete errors[each];
              isTrue.contactName = false;
            }
          }
          break;
        }
        case "phone": {
          if (isTrue.phone) {
            if (!entry.phone.trim().length) {
              errors.phone = "*Field cannot be empty";
            } else if (
              entry.phone.trim().length &&
              !entry.phone.match(/^[0-9]{10}$/)
            ) {
              errors.phone = "*Length should be 10 digits";
            } else {
              delete errors[each];
              isTrue.phone = false;
            }
          }
          break;
        }
        case "email": {
          if (isTrue.email) {
            if (!entry.email.trim().length) {
              errors.email = "*Field cannot be empty";
            } else if (
              entry.email.trim().length &&
              !entry.email.match(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
              )
            ) {
              errors.email = "*Invalid Email";
            } else {
              delete errors[each];
              isTrue.email = false;
            }
          }
          break;
        }
        case "contactType": {
          console.log("Contact Type:", entry);
          if (isTrue.contactType) {
            if (entry.contactType === "default") {
              errors.contactType = "*Select the contact type";
            } else {
              delete errors[each];
              isTrue.contactType = false;
            }
          }
          break;
        }
      }
    });
    this.setState({ errors });
    console.log("Errors:", errors);
    return Object.keys(errors).length ? errors : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let isTrue = {
      contactName: true,
      phone: true,
      email: true,
      contactType: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      if (!errors) {
        this.props.handleContactDetails(this.state.entry);
        alert("PhoneBook Entry Updated");
        console.log("type:", this.state.entry);
      }
      this.setState({
        entry: {
          contactName: "",
          phone: "",
          email: "",
          contactType: "",
        },
        isTrue: {
          contactName: false,
          phone: false,
          email: false,
          contactType: false,
        },
        errors: {},
      });
    });
  };

  render() {
    const { entry, errors } = this.state;
    {
      console.log("Errors:", this.state.errors);
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup
            style={{
              fontSize: "25px",
              backgroundColor: "orange",
              color: "darkblue",
              padding: "5px",
            }}
          >
            <Label for="contactName">Contact Name</Label>
            <Input
              type="text"
              name="contactName"
              placeholder="Enter Name"
              value={entry.contactName}
              onChange={(e) => this.handleChange("contactName", e.target.value)}
            />
            {errors && <p style={{ color: "red" }}>{errors.contactName}</p>}
          </FormGroup>
          <FormGroup
            style={{
              fontSize: "25px",
              backgroundColor: "green",
              color: "white",
              padding: "5px",
            }}
          >
            <Label for="phone">Contact Number</Label>
            <Input
              type="number"
              name="phone"
              placeholder="Enter Contact Number"
              value={entry.phone}
              onChange={(e) => this.handleChange("phone", e.target.value)}
            />
            {errors && <p style={{ color: "red" }}>{errors.phone}</p>}
          </FormGroup>
          <FormGroup
            style={{
              fontSize: "25px",
              backgroundColor: "yellow",
              color: "darkblue",
              padding: "5px",
            }}
          >
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email Id"
              value={entry.email}
              onChange={(e) => this.handleChange("email", e.target.value)}
            />
            {errors && <p style={{ color: "red" }}>{errors.email}</p>}
          </FormGroup>
          <FormGroup
            style={{
              fontSize: "25px",
              backgroundColor: "pink",
              color: "darkblue",
              padding: "5px",
            }}
          >
            <Label for="contactType">Contact Type</Label>
            <Input
              type="select"
              name="contactType"
              placeholder="Enter contactType"
              value={entry.contactType}
              onChange={(e) => this.handleChange("contactType", e.target.value)}
            >
              <option name="default" value="default">
                Default
              </option>
              <option name="home" value="home">
                Home
              </option>
              <option name="work" value="work">
                Work
              </option>
              <option name="other" value="other">
                Other
              </option>
            </Input>
            {errors && <p style={{ color: "red" }}>{errors.contactType}</p>}
          </FormGroup>
          <Button type="submit" style={{ background: "blue" }}>
            Add Entry
          </Button>
        </Form>
      </div>
    );
  }
}

export default DisplayForm;
