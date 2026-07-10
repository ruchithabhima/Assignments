import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import "../styles/SettingsStyles.css";
const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChangePassword = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User:", user);
    console.log("Stored Password:", user?.password);
    console.log("Current Password:", currentPassword);
    if (user.password !== currentPassword) {
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
    const updatedUser = {
      ...user,
      password: newPassword,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
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

              <div className="input-wrapper3">
                <MdLock />
                <input
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper3">
                <MdLock />
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper3">
                <MdLock />
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
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
