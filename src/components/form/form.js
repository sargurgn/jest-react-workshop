import React, { useState } from 'react'
import Alert from '../alert/alert'
import axios from "axios"

export default function Form() {
    
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");

  const handleSubmit = async () => {
    try {
      if (firstName && lastName) {
        const response = await axios.post("http://localhost:8080/user", {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          address: address,
        });
        console.log("response ", response);
        setShowAlert(true);
        setAlertType("alert-success");
      } else {
        setShowAlert(true);
        setAlertType("alert-error");
      }
    } catch (e) {
      setShowAlert(true);
      setAlertType("alert-error");
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setGender("");
    setAddress("");
  };

  return (
    <div className="form">
            {showAlert && <Alert alertType={alertType} />}
            <div className="form-element-div">
                <span className="form-label"><label htmlFor="firstName">First Name</label></span>
                <span><input className="input" data-testid="firstName" id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></span>
            </div>
            <div className="form-element-div">
                <span className="form-label"><label htmlFor="lastName">Last Name</label></span>
                <span><input className="input" data-testid="lastName" id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></span>
            </div>
            <div className="form-element-div">
                <span className="label form-label"><label htmlFor="gender">Gender</label></span>
                <span><select className="input" data-testid="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="None">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select></span>
            </div>
            <div className="form-element-div">
                <span className="form-label"><label htmlFor="address">Address</label></span>
                <span><input className="input" data-testid="address" id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></span>
            </div>
            <div className="form-element-div">
                <input className="button" data-testid="submit" type="submit" value="Submit" onClick={handleSubmit} />
                <input className="button" data-testid="reset" type="reset" value="Reset" onClick={handleReset} />
            </div>
        </div>
  )
}
