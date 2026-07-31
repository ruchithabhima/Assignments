import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Users = () => {
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [monthly_budget, setMonthlyBudget] = useState("");
  const [preferredCurrency, setPreferredCurrency] = useState("INR");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  const editUser = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };
  const limit = 5;
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/users?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");

      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/users/${editId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            role,
            monthly_budget: monthly_budget,
            preferred_currency: preferredCurrency,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update user");

        setTimeout(() => {
          setError("");
        }, 3000);

        return;
      }

      setSuccess("User updated successfully");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      await fetchUsers();

      setEditId(null);
      setName("");
      setRole("");
      setMonthlyBudget("");
      setPreferredCurrency("INR");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };
  const handleEdit = (user) => {
    setEditId(user.id);

    setName(user.name);
    setRole(user.role);
    setMonthlyBudget(user.monthly_budget);
    setPreferredCurrency(user.preferred_currency);
  };
  const handleDelete = async (id) => {
    console.log("Deleting user:", id);
    console.log(`http://localhost:3000/api/users/${id}`);
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();

    setSuccess("User Deleted Successfully");
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };
  const handleCancel = () => {
    setEditId(null);

    setName("");
    setRole("");
    setMonthlyBudget("");
    setPreferredCurrency("");
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
        <div className="users-page ">
          {editId && (
            <div className="income-form-card">
              <div className="card-header">
                <FaEdit className="header-icon" />
                <h2>Edit User</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    Name <span>*</span>
                  </label>

                  <div className="input-wrapper1">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Role <span>*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    Monthly Budget <span>*</span>
                  </label>
                  <div className="input-wrapper1">
                    <input
                      type="number"
                      value={monthly_budget}
                      onChange={(e) => setMonthlyBudget(e.target.value)}
                      placeholder="Enter your Budget"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Preferred Currency <span>*</span>
                  </label>
                  <select
                    value={preferredCurrency}
                    onChange={(e) => setPreferredCurrency(e.target.value)}
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="form-buttons">
                  <button className="update-btn" type="submit">
                    Update User
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                {success && <p className="success-message">{success}</p>}
              </form>
            </div>
          )}
          <div className="income-records-card">
            <div className="card-header">
              <FaUsers className="header-icon " />
              <h2>All Users</h2>
            </div>

            <table className="income-table">
              <thead>
                <tr>
                  <th className="display text-center">S.No</th>
                  <th className="text-center"> Name</th>
                  <th className="text-center">Role</th>
                  <th className="display text-center">Joined on</th>
                  <th className="text-center">
                    Monthly
                    <br /> Budget
                  </th>
                  <th className="display text-center">Currency</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="display text-center">
                      {(page - 1) * limit + index + 1}
                    </td>

                    <td className="text-center">{user.name}</td>
                    <td className="text-center">{user.role}</td>
                    <td className="display text-center">
                      {new Date(user.joined_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </td>
                    <td className="text-center">
                      {Number(user.monthly_budget)}
                    </td>
                    <td className="display text-center">
                      {user.preferred_currency}
                    </td>
                    <td className="d-flex flex-column flex-md-row justify-content-center align-item-center gap-2">
                      <button className="edit-btn">
                        <FaEdit onClick={() => handleEdit(user)} />
                      </button>

                      <button className="delete-btn">
                        <FaTrash onClick={() => handleDelete(user.id)} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           
              <div className="pagination-container">
                <div className="pagination ">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index + 1)}
                      className={page === index + 1 ? "active-page" : ""}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
