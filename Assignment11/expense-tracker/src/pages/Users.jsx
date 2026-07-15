import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaUser,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdLock } from "react-icons/md";

const Users = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setUsers(storedUsers);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || password.trim() === "") {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const existingUser = users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase(),
    );

    if (existingUser && editId === null) {
      setError("User already exists");
      return;
    }

    setError("");

    if (editId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editId
          ? {
              ...user,
              name,
              password,
            }
          : user,
      );

      setUsers(updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setEditId(null);

      alert("User Updated Successfully");
    } else {
      const newUser = {
        id: Date.now(),
        name,
        password,
        joinedDate: new Date().toLocaleDateString(),
      };

      const updatedUsers = [...users, newUser];

      setUsers(updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      alert("User Added Successfully");
    }

    setName("");
    setPassword("");
  };
  const handleEdit = (id) => {
    const selectedUser = users.find((user) => user.id === id);

    setName(selectedUser.name);
    setPassword(selectedUser.password);

    setEditId(id);
  };
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);

    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("User Deleted Successfully");
  };
  return (
    <>
      <div className="containercard d-flex flex-column gap-2">
        <div className="welcome-card shadow">
          <div>
            <h2 className="welcome-card-head">User Management </h2>
            <p>Manage all the Registered users</p>
          </div>
        </div>
        <div className="income-page  align-items-start">
          <div className="income-form-card">
            <div className="card-header">
              <FaPlusCircle className="header-icon" />
              <h2>Add New User</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Name <span>*</span>
                </label>

                <div className="input-wrapper1">
                  <div className="pr">
                    <FaUser className="input-icon " />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Password<span>*</span>
                </label>

                <div className="input-wrapper1  position-relative">
                  <div className="pr">
                    <MdLock className="input-icon" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <p className="text-danger">{error}</p>
              <div className="button-group">
                <button className="save-btn" type="submit">
                  {editId ? "Update User" : "+ Add User"}
                </button>
              </div>
            </form>
          </div>

          <div className="income-records-card">
            <div className="card-header">
              <FaUsers className="header-icon " />
              <h2>All Users</h2>
            </div>

            <table className="income-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>Joined on</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>

                    <td>{user.name}</td>

                    <td>{user.joinedDate}</td>

                    <td className="d-flex flex-column justify-content-center align-item-center gap-2">
                      <button className="edit-btn">
                        <FaEdit onClick={() => handleEdit(user.id)} />
                      </button>

                      <button className="delete-btn">
                        <FaTrash onClick={() => handleDelete(user.id)} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
