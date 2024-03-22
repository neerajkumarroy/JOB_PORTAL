import React, { useState } from "react";
import InputForm from "../components/shared/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/featuers/alertSlice";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("'Login SuccessFull...!");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Ivalide Credintial Try Again");

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
              htmlFrom="email"
              lableText={"Email"}
              type={"text"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <InputForm
              htmlFrom="password"
              lableText={"Password"}
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
      )}
    </>
  );
};

export default Login;
