import React from "react";
import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignup = () => {
    if (name.trim === "") {
      setError("Please enter your name");
      return;
    }
    if (password.length < 6) {
      setError("Please enter a stronger password");
      return
    }
    const user = { name, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account Created");
    navigate("/dashboard");
  };
  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center ">
        <div className="row box shadow">
          <div className="col-md-5 leftsection d-flex flex-column justify-content-center aign-items-center text-center">
            <h1>
              Personal <br />
              Expense Tracker
            </h1>

            <a
              href="signin"
              className="btn btn-outline-light rounded-pill px-5 mt-3"
            >
              SIGN IN
            </a>
          </div>

          <div className="col-md-7 rightsection d-flex flex-column justify-content-center aign-items-center text-success p-5">
            <h1 className="size ">Create Account</h1>
            <p id="checkforerror"></p>

            <form onSubmit={handleSignup}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter Your Name"
                mt-3
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mt-3"
                placeholder="Password"
                maxlength="10"
                minlength="6"
              />
              <p className="text-danger">{error}</p>
              <div class="text-center">
                <button
                  type="submit"
                  className="btn btn-bg rounded-pill mt-4 px-5"
                 
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
