import React, { useState } from "react";
import InputForm from "../components/shared/InputForm";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
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
              Not a User <Link to="/register">Register</Link>{" "}
            </p>
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
