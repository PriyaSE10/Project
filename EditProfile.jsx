import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { useFormik } from "formik";
import { ValidationForm } from "./ValidationForm";
import IntrestItem from "./IntrestItem";

function EditProfile() {
  const [newValue, setNewValue] = useState();
  const [intrestValue, setIntrestValue] = useState([]);
  const [calValue, setCalValue] = useState();

  const clearArray = () => {
    setIntrestValue([]);
  };
  const handleChangeCal = (e) => {
    const { name, value } = e.target;
    setCalValue({ ...calValue, [name]: value });
  };

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 18);

  const minDateString = minDate.toISOString().slice(0, 10);

  function onChange(event) {
    setNewValue(event.target.value);
    console.log(setNewValue);
  }

  const initialValues = {
    name: "Charlie",
    email: "charlie@gmail.com",
    contact: "9971877676",
    date: "08-01-1979",
    hobbies: "Add multiple interests comma ( , ) separated",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationForm,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  console.log(values);
  return (
    <div className="Container">
      <div className="modals">
        <div className="modal-Container">
          <h1>Edit Charlie's profile</h1>
          <div className="content-item">
            <div className="image-Section">
              <img src="./images/image.png" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="main-text">
                <div className="label-1">
                  <label>What should we call you?</label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    // placeholder="Charlie"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name}</span>
                  )}
                </div>
                <div className="label-2">
                  <label>What's your email address?</label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    // placeholder="charlie@gmail.com"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email}</span>
                  )}
                </div>
                <div className="label-3">
                  <label>On which number can we contact you?</label>
                  <br />
                  <input
                    type="number"
                    name="contact"
                    // placeholder="9971 87 7676"
                    value={values.contact}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.contact && (
                    <span style={{ color: "red" }}>{errors.contact}</span>
                  )}
                </div>
                <div className="label-4">
                  <label>When can we wish a happy birthday?</label>
                  <br />
                  <input
                    type="date"
                    name="date"
                    // placeholder="08-01-1979"
                    value={values.date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    max={minDateString}
                  />
                </div>
                <div>
                  {
                    <IntrestItem
                      intrestValue={intrestValue}
                      setIntrestValue={setIntrestValue}
                    />
                  }
                </div>
                <div className="label-5">
                  <label>Please let us know if you have some interests</label>
                  <br />

                  <input
                    type="text"
                    name="hobbies"
                    // placeholder="Add multiple interests comma ( , ) separated"
                    value={intrestValue.join(", ")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.hobbies && <span>{errors.hobbies}</span>}
                </div>
                <div className="Button">
                  <button type="Submit" className="first-btn">
                    Save
                  </button>
                  <button
                    type="cancel"
                    className="second-btn"
                    onClick={clearArray}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
