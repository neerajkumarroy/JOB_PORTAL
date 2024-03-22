import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputForm from "../components/shared/InputForm.js";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/featuers/alertSlice.js";
import Spinner from "../components/shared/Spinner.js";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //redux state
  const { loading } = useSelector((state) => state.alerts);
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastname,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register SuccessFully...!");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalide Form Details Please Try Again");
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

export default Register;
