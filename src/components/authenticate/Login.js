import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAlert, types, positions } from "react-alert";
import axios from "axios";

function Login() {
  const alert = useAlert();
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    userEmail !== "" && userPassword !== ""
      ? axios
          .post(
            "https://node-invoice.herokuapp.com",
            { email: userEmail, password: userPassword },
            { withCredentials: true }
          )
          .then((res) => handleError(res))
          .catch(function (err) {
            handleError(err.response);
          })
      : alert.show("email/ password cannot be blank", {
          type: types.ERROR,
          position: positions.TOP_CENTER,
          containerStyle: {
            offset: "150px",
            padding: "150px",
          },
        });
  };

  const handleError = (res) => {
    if (res.status === 200) {
      localStorage.setItem("__lt", Date.now());
      history.push("/dashboard");
      window.location.reload();
    } else {
      console.log(res);
    }
  };
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <h1 className="auth__legend">Login</h1>
      <div className="col-md-3 mb-3">
        <label htmlFor="inputEmail1" className="form-label">
          Email
        </label>
      </div>
      <div className="col-md-9">
        <input
          type="email"
          className="form-control"
          id="inputEmail1"
          name="email"
          placeholder="abc@example.com"
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <div className="col-md-3 mb-3">
        <label htmlFor="inputPassword1" className="form-label">
          Password
        </label>
      </div>
      <div className="col-md-9 mb-3">
        <input
          type="password"
          className="form-control"
          id="inputPassword1"
          name="password"
          placeholder="******"
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>
      <div className="col-12 text-center">
        <button type="submit" className="btn btn-success w-50">
          Login
        </button>
      </div>
      <div className="col-md-12">
        <p className="mt-3 mb-2 text-center">
          <span>Forgot password?&nbsp;</span>
          <Link to="/reset">Reset Now</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
