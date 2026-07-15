import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import {FaTrash,FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/SettingsStyles.css";
const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChangePassword = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const selectedUser = users.find((user) => user.id === currentUser.id);
    console.log("User:", users);
    console.log("Stored Password:", currentUser?.password);
    console.log("Current Password:", currentPassword);
    if (currentUser.password !== currentPassword) {
      setError("Current password is incorrect");

      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const updatedUser = users.map((user) =>
      user.id === currentUser.id
        ? {
            ...user,
            password: newPassword,
          }
        : user,
    );
    const updatedCurrentUser = {
      ...currentUser,
      password: newPassword,
    };
    localStorage.setItem("users", JSON.stringify(updatedUser));
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    setSuccess("Password updated successfully");
    setTimeout(() => {
      setSuccess("");
    }, 3000);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <div className="profilecontainer d-flex flex-column gap-3">
        <div className="welcome-card shadow">
          <div>
            <h2 className="welcome-card-head">Manage Your Account Settings</h2>
            <p>Update Your Password for Security</p>
          </div>
        </div>
        <div className="profile-card shadow">
          <h2 className="welcome-card-head">Account Security</h2>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Current Password</label>

              <div className="input-wrapper3 position-relative ">
                <MdLock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required className="password-input"
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper3 position-relative">
                <MdLock />
                <input
                   type={showPassword2 ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  required className="password-input"
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper3 position-relative">
                <MdLock />
                <input
                  type={showPassword3 ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  required className="password-input"
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                  onClick={() => setShowPassword3(!showPassword3)}
                >
                  {showPassword3 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="save-btn">
              Update password
            </button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
