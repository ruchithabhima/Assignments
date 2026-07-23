import React from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    if (name.trim === "") {
      setError("Please enter your name");
      return;
    }
    if (password.length < 6) {
      setError("Please enter a stronger password");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = {
      id: newId,
      name,
      password,

      joinedDate: new Date().toLocaleDateString(),
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("isAuthenticated", "true");
    setSuccess("Account Created Successfully");
    setTimeout(() => {
      setSuccess("");
    }, 3000);
    navigate("/dashboard");
  };
  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center ">
        <div className="row box ">
          <div className="col-md-5  leftsection d-flex flex-column justify-content-center aign-items-center text-center">
            <h1>
              Personal <br />
              Expense Tracker
            </h1>

            <a
              href="signin"
              className="btn btn-outline-light rounded-pill px-5 mt-3 fontsize"
            >
              SIGN IN
            </a>
          </div>

          <div className="col-md-7 col-12 rightsection d-flex flex-column justify-content-center aign-items-center text-success p-5">
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
                  className="btn btn-bg rounded-pill mt-4 px-5 "
                >
                  SIGN UP
                </button>
                <p className="mt-3 blue d-block d-md-none">
                  Already have an account?
                  <Link to="/signin" className="ms-2 text-decoration-none">
                    Sign In
                  </Link>
                </p>
                 {success && <p className="success-message">{success}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
