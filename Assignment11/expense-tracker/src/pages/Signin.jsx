import React from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Signin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignin = () => {
    const user = JSON.parse (localStorage.getItem("user"));
    if (user && user.name === name && user.password === password) {
      navigate("/dashboard");
    } else {
     setError("Invalid Credentials")
    }
  };
  return (
    <div className="container  vh-100 d-flex justify-content-center align-items-center ">
      <div className="row box shadow">
        <div className="col-md-7 leftsection2 d-flex flex-column justify-content-center aign-items-center text-center p-5">
          <h1>Sign In To Your Account</h1>
          <p id="checkforerror2"></p>
          <form onSubmit={handleSignin}>
            <input
              type="text"
               value={name}
                onChange={(e) => setName(e.target.value)}
              className="form-control mt-3"
              placeholder="Enter Your Name"
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
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-bg rounded-pill mt-4 px-5"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-5 rightsection2 d-flex flex-column justify-content-center aign-items-center text-success p-5">
          <h1 className="heading text-center">
            Track
            <br /> Your Expenses
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signin;
