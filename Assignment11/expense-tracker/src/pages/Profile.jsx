import React from "react";
import "../styles/ProfileStyles.css";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaGlobe,
  FaCamera,
  FaPen,
  FaTrash,
  FaChevronRight,
} from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { MdOutlineCurrencyRupee, MdCurrencyRupee } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    monthlyBudget: "",
    currency: "INR",
  });
  const savedProfile = localStorage.getItem("profile");

  const [profileExists, setProfileExists] = useState(
    savedProfile ? true : false,
  );
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile.fullName.trim() === "") {
      setErrors({
        fullName: "Name is required",
      });
      return;
    }

    if (profile.monthlyBudget === "") {
      setErrors({ monthlyBudget: "Please Enter Your Budget" });
      return;
    }
    localStorage.setItem("profile", JSON.stringify(profile));
   

    alert("Profile Updated Successfully");
  };
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?",
    );

    if (confirmDelete) {
      localStorage.removeItem("profile");

      setProfile({
        fullName: "",
        monthlyBudget: "",
        currency: "INR",
      });

      setProfileExists(false);
     
    }
  };
  return (
    <>
      <div className="profilecontainer d-flex flex-column gap-3">
        <div className="welcome-card shadow">
          <div>
            <h2 className="welcome-card-head">Manage Your Profile</h2>
            <p>keep your information updated for Personalized Experience</p>
          </div>
        </div>
        <div className="profile-layout d-flex align-items-start gap-3">
          <div className="profile-card shadow">
            <h2 className="welcome-card-head">Profile Information</h2>

            <div className="profile-header">
              <div className="avatar-wrapper">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="profile"
                  className="avatar"
                />

                <button className="camera-btn">
                  <FaCamera />
                </button>
              </div>

             
                <h3 className="welcome-card-head">{profile.fullName}</h3>
               
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>

                <div className="input-wrapper">
                  <FaUser />
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    
                  />
                </div>
                {errors.fullName && (
                  <p className="error">
                    <FaCircleExclamation className="error-icon" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Monthly Budget</label>

                <div className="input-wrapper">
                  <MdCurrencyRupee />
                  <input
                    type="number"
                    name="monthlyBudget"
                    value={profile.monthlyBudget}
                    onChange={handleChange}
                   
                  />
                </div>
                {errors.monthlyBudget && (
                  <p className="error">
                    <FaCircleExclamation className="error-icon" />
                    {errors.monthlyBudget}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Preferred Currency</label>

                <div className="input-wrapper">
                  <FaGlobe />
                  <select
                    name="currency"
                    value={profile.currency}
                    onChange={handleChange}
                   
                  >
                    <option>INR (Indian Rupee)</option>
                    <option>USD (US Dollar)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Profile;
