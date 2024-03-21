import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/shared/InputForm.js";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setValues({
  //     ...values,
  //     [e.target.name]: value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name, lastname, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-container">
        <form className="card p-3" onSubmit={handleSubmit}>
          <img
            src="/assets/images/logo/logo.png"
            alt="logo"
            height={150}
            width={350}
          />

          <InputForm
            htmlFrom="name"
            lableText={"Name"}
            type={"text"}
            value={name}
            handleChange={(e) => setName(e.target.value)}
            name="name"
          />
          <InputForm
            htmlFrom="lastname"
            lableText={"lastname"}
            type={"text"}
            value={lastname}
            handleChange={(e) => setLastname(e.target.value)}
            name="lastname"
          />
          <InputForm
            htmlFrom="email"
            lableText={"email"}
            type={"text"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <InputForm
            htmlFrom="password"
            lableText={"password"}
            type={"password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <div className="d-flex justify-content-between">
            <p>
              Already registered <Link to="/login">Login</Link>{" "}
            </p>
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
