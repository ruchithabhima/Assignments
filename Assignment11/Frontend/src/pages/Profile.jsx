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
const [name, setName] = useState("");
const [joinedDate, setJoinedDate] = useState("");
const [monthlyBudget, setMonthlyBudget] = useState("");
const [preferredCurrency, setPreferredCurrency] = useState("");
const [role, setRole] = useState("");
const [loading, setLoading] = useState(true);
  const [success,setSuccess]=useState("");
const [errors, setErrors] = useState({});
const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/userprofile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message);
      return;
    }

    setName(data.name);
    setJoinedDate(data.joined_date);
    setMonthlyBudget(data.monthly_budget);
    setPreferredCurrency(data.preferred_currency);
    setRole(data.role);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
    fetchProfile();
}, []);
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/userprofile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        monthly_budget: monthlyBudget,
        preferred_currency: preferredCurrency,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    setSuccess("Profile updated successfully");
    fetchProfile(); // Refresh profile data

    setTimeout(() => {
      setSuccess("");
    }, 3000);

  } catch (error) {
    setError("Something went wrong");
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

             
                <h3 className="welcome-card-head">{name}</h3>
               
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>

                <div className="input-wrapper2">
                  <FaUser />
                  <input
                  
                    type="text"
                    name="fullName"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}


                    placeholder="Enter Your Full Name"
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

                <div className="input-wrapper2">
                  <MdCurrencyRupee />
                  <input
                    type="number"
                    name="monthlyBudget"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    placeholder="Enter Monthly Budget"
                   
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

                <div className="input-wrapper2">
                  <FaGlobe />
                  <select className="border"
                    name="currency"
                    value={preferredCurrency}
                    onChange={(e) => setPreferredCurrency(e.target.value)}
                   
                  >
                    <option>INR (Indian Rupee)</option>
                    <option>USD (US Dollar)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="save-btn">
                Save Changes
              </button>
              {success && <p className="success-message">{success}</p>}
            </form>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Profile;
