import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPanel.css";
import { FiUsers, FiCalendar, FiActivity, FiTrendingUp, FiEdit, FiLogOut, FiArrowLeft } from "react-icons/fi";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("members");
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [progress, setProgress] = useState({});
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Please log in to access the admin panel");
      return;
    }

    const fetchData = async () => {
      try {
        const [usersResponse, trainersResponse, activitiesResponse] = await Promise.all([
          axios.get("https://authentication-backend-kbui.onrender.com/api/user/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://authentication-backend-kbui.onrender.com/api/user/trainers", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://authentication-backend-kbui.onrender.com/api/user/admin/activities", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setUsers(usersResponse.data);
        setTrainers(trainersResponse.data);
        setActivities(activitiesResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading data");
      }
    };
    fetchData();
  }, [token]);

  const assignTrainer = async (userId, trainerId) => {
    try {
      const confirm = window.confirm(trainerId ? "Assign this trainer?" : "Remove the current trainer?");
      if (!confirm) return;

      const response = await axios.put(
        `https://authentication-backend-kbui.onrender.com/api/user/admin/users/${userId}/assign-trainer`,
        { trainerId: trainerId || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u._id === userId ? response.data : u)));
      if (trainerId) {
        setTrainers(trainers.map((t) => (t._id === trainerId ? { ...t, assignedUsersCount: t.assignedUsersCount + 1 } : t)));
      } else if (response.data.trainer === null) {
        const prevTrainerId = users.find((u) => u._id === userId).trainer?._id;
        setTrainers(trainers.map((t) => (t._id === prevTrainerId ? { ...t, assignedUsersCount: t.assignedUsersCount - 1 } : t)));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error assigning trainer");
    }
  };

  const updateMembership = async (userId, status, plan) => {
    try {
      const response = await axios.put(
        `https://authentication-backend-kbui.onrender.com/api/user/admin/users/${userId}/membership`,
        { status, plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u._id === userId ? response.data : u)));
    } catch (err) {
      setError(err.response?.data?.message || "Error updating membership");
    }
  };

  const addActivity = async (userId, type, workout) => {
    try {
      const response = await axios.post(
        `https://authentication-backend-kbui.onrender.com/api/user/admin/users/${userId}/activity`,
        { userId, type, workout },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActivities([...activities, response.data]);
      setProgress((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] || []), response.data],
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Error adding activity");
    }
  };

  const viewProgress = async (userId) => {
    try {
      const response = await axios.get(`https://authentication-backend-kbui.onrender.com/api/user/admin/users/${userId}/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProgress((prev) => ({ ...prev, [userId]: response.data }));
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching progress");
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      contact: user.contact || "",
      fitnessGoals: user.fitnessGoals || "",
      workoutPreferences: user.workoutPreferences || "",
      bodyMeasurements: {
        weight: user.bodyMeasurements?.weight || "",
        height: user.bodyMeasurements?.height || "",
        bmi: user.bodyMeasurements?.bmi || "",
        muscleMass: user.bodyMeasurements?.muscleMass || "",
      },
    });
  };

  const handleEditChange = (e) => {
    if (e.target.name.startsWith("bodyMeasurements.")) {
      const field = e.target.name.split(".")[1];
      setEditForm({
        ...editForm,
        bodyMeasurements: { ...editForm.bodyMeasurements, [field]: e.target.value },
      });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  const saveEdit = async (userId) => {
    try {
      const response = await axios.put(
        `https://authentication-backend-kbui.onrender.com/api/user/admin/users/${userId}/details`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u._id === userId ? response.data : u)));
      setEditingUserId(null);
      setEditForm({});
    } catch (err) {
      setError(err.response?.data?.message || "Error saving user details");
    }
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditForm({});
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/home");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "attendance":
        return (
          <div className="adm-tab-content">
            <div className="adm-header-with-actions">
              <h2>Attendance</h2>
              <div className="adm-search-filter">
                <input
                  type="text"
                  placeholder="Search attendance..."
                  className="adm-search-input"
                  onChange={(e) => {
                    const filtered = activities.filter((a) =>
                      users.find((u) => u._id === a.userId)?.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setActivities(filtered);
                  }}
                />
              </div>
            </div>
            <div className="adm-activity-list">
              {activities.filter((a) => a.type === "attendance").length > 0 ? (
                activities
                  .filter((a) => a.type === "attendance")
                  .map((activity, index) => (
                    <div key={index} className="adm-activity-card">
                      <div className="adm-user-avatar">
                        {users.find((u) => u._id === activity.userId)?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div className="adm-activity-details">
                        <span className="adm-activity-user">
                          {users.find((u) => u._id === activity.userId)?.name || "Unknown User"}
                        </span>
                        <span className="adm-activity-date">
                          {new Date(activity.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="adm-no-data">No attendance records found</p>
              )}
            </div>
            <div className="adm-action-box">
              <h3>Mark Attendance</h3>
              <div className="adm-action-controls">
                <select className="adm-select-input" id="attendance-user-select">
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <button
                  className="adm-btn adm-btn-primary"
                  onClick={() => {
                    const userId = document.querySelector("#attendance-user-select").value;
                    addActivity(userId, "attendance");
                  }}
                >
                  <FiCalendar /> Mark
                </button>
              </div>
            </div>
          </div>
        );

      case "members":
        return (
          <div className="adm-tab-content">
            <div className="adm-header-with-actions">
              <div className="adm-header-with-count">
                <h2>Members</h2>
                <span className="adm-count-badge">{users.length}</span>
              </div>
              <div className="adm-search-filter">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="adm-search-input"
                  onChange={(e) => {
                    const filtered = users.filter((u) =>
                      u.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      u.email.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    setUsers(filtered);
                  }}
                />
              </div>
            </div>
            <div className="adm-table-container">
              <table className="adm-data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Membership</th>
                    <th>Trainer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="adm-member-row">
                      <td>
                        <div className="adm-user-info">
                          <div className="adm-user-avatar">
                            {user.name ? user.name[0].toUpperCase() : "?"}
                          </div>
                          <div className="adm-user-details">
                            <span className="adm-user-name">{user.name}</span>
                            <span className="adm-user-email">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="adm-membership-info">
                          <span className={`adm-status-badge ${user.membership.status}`}>
                            {user.membership.status}
                          </span>
                          <span className="adm-plan-name">{user.membership.plan}</span>
                          <span className="adm-expiry-date">
                            {user.membership.expiry
                              ? `Expires: ${new Date(user.membership.expiry).toLocaleDateString()}`
                              : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td>
                        {trainers.length > 0 ? (
                          <select
                            className="adm-select-input adm-trainer-select"
                            value={user.trainer?._id || ""}
                            onChange={(e) => assignTrainer(user._id, e.target.value)}
                          >
                            <option value="">No Trainer</option>
                            {trainers.map((t) => (
                              <option key={t._id} value={t._id}>
                                {t.name} ({t.specialty})
                              </option>
                            ))}
                          </select>
                        ) : (
                          "No trainers"
                        )}
                      </td>
                      <td>
                        <div className="adm-action-buttons">
                          <button
                            className="adm-btn adm-btn-success"
                            title="Renew Membership"
                            onClick={() => updateMembership(user._id, "active", user.membership.plan)}
                          >
                            <FiCalendar />
                          </button>
                          <button
                            className="adm-btn adm-btn-danger"
                            title="Cancel Membership"
                            onClick={() => updateMembership(user._id, "inactive", user.membership.plan)}
                          >
                            <FiActivity />
                          </button>
                          {user.trainer && (
                            <button
                              className="adm-btn adm-btn-outline"
                              title="Remove Trainer"
                              onClick={() => assignTrainer(user._id, null)}
                            >
                              <FiUsers />
                            </button>
                          )}
                          <button
                            className="adm-btn adm-btn-secondary"
                            title="Edit Details"
                            onClick={() => startEditing(user)}
                          >
                            <FiEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "workouts":
        return (
          <div className="adm-tab-content">
            <div className="adm-header-with-actions">
              <h2>Workouts</h2>
              <div className="adm-search-filter">
                <input
                  type="text"
                  placeholder="Search workouts..."
                  className="adm-search-input"
                  onChange={(e) => {
                    const filtered = activities.filter((a) =>
                      (a.type === "workout" && a.workout.toLowerCase().includes(e.target.value.toLowerCase())) ||
                      users.find((u) => u._id === a.userId)?.name.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    setActivities(filtered);
                  }}
                />
              </div>
            </div>
            <div className="adm-activity-list">
              {activities.filter((a) => a.type === "workout").length > 0 ? (
                activities
                  .filter((a) => a.type === "workout")
                  .map((activity, index) => (
                    <div key={index} className="adm-activity-card">
                      <div className="adm-user-avatar">
                        {users.find((u) => u._id === activity.userId)?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div className="adm-activity-details">
                        <span className="adm-activity-user">
                          {users.find((u) => u._id === activity.userId)?.name || "Unknown User"}
                        </span>
                        <span className="adm-activity-workout">{activity.workout}</span>
                        <span className="adm-activity-date">
                          {new Date(activity.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="adm-no-data">No workouts recorded</p>
              )}
            </div>
            <div className="adm-action-box">
              <h3>Add Workout</h3>
              <div className="adm-action-controls">
                <select className="adm-select-input" id="workout-user-select">
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Workout Name"
                  className="adm-text-input"
                  id="workout-name-input"
                />
                <button
                  className="adm-btn adm-btn-primary"
                  onClick={() => {
                    const userId = document.querySelector("#workout-user-select").value;
                    const workout = document.querySelector("#workout-name-input").value;
                    if (workout) addActivity(userId, "workout", workout);
                  }}
                >
                  <FiActivity /> Add
                </button>
              </div>
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="adm-tab-content">
            <div className="adm-header-with-actions">
              <h2>Progress</h2>
              <div className="adm-search-filter">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="adm-search-input"
                  onChange={(e) => {
                    const filtered = users.filter((u) =>
                      u.name.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    setUsers(filtered);
                  }}
                />
              </div>
            </div>
            <div className="adm-progress-cards">
              {users.map((user) => (
                <div key={user._id} className="adm-progress-card">
                  <div className="adm-progress-header">
                    <div className="adm-user-avatar">
                      {user.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <h3>{user.name}</h3>
                  </div>
                  <button
                    className="adm-btn adm-btn-secondary"
                    onClick={() => viewProgress(user._id)}
                  >
                    <FiTrendingUp /> Load Progress
                  </button>
                  <div className="adm-progress-data">
                    {progress[user._id] ? (
                      progress[user._id].length > 0 ? (
                        <div className="adm-progress-activities">
                          {progress[user._id].map((activity, index) => (
                            <div key={index} className="adm-progress-activity">
                              <span className={`adm-activity-type ${activity.type}`}>
                                {activity.type === "workout" ? activity.workout : "Attendance"}
                              </span>
                              <span className="adm-activity-date">
                                {new Date(activity.date).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="adm-no-data">No progress recorded</p>
                      )
                    ) : (
                      <p className="adm-instruction">Click "Load Progress" to view</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "editUserDetails":
        return (
          <div className="adm-tab-content">
            <h2>Edit User Details</h2>
            <select
              className="adm-select-input adm-user-select"
              onChange={(e) => {
                const selectedUser = users.find((u) => u._id === e.target.value);
                if (selectedUser) startEditing(selectedUser);
              }}
            >
              <option value="">Select a User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>

            {editingUserId && (
              <div className="adm-edit-form">
                <div className="adm-edit-header">
                  <div className="adm-user-avatar">
                    {editForm.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <h3>{editForm.name}</h3>
                </div>
                <div className="adm-form-grid">
                  <div className="adm-form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="adm-text-input"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="adm-text-input"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>Contact</label>
                    <input
                      type="tel"
                      name="contact"
                      value={editForm.contact}
                      onChange={handleEditChange}
                      className="adm-text-input"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>Fitness Goals</label>
                    <input
                      type="text"
                      name="fitnessGoals"
                      value={editForm.fitnessGoals}
                      onChange={handleEditChange}
                      className="adm-text-input"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>Workout Preferences</label>
                    <input
                      type="text"
                      name="workoutPreferences"
                      value={editForm.workoutPreferences}
                      onChange={handleEditChange}
                      className="adm-text-input"
                    />
                  </div>
                  <div className="adm-form-group adm-form-group-full-width">
                    <label>Body Measurements</label>
                    <div className="adm-measurements-grid">
                      <input
                        type="number"
                        name="bodyMeasurements.weight"
                        value={editForm.bodyMeasurements.weight}
                        onChange={handleEditChange}
                        placeholder="Weight (kg)"
                        className="adm-text-input"
                      />
                      <input
                        type="number"
                        name="bodyMeasurements.height"
                        value={editForm.bodyMeasurements.height}
                        onChange={handleEditChange}
                        placeholder="Height (cm)"
                        className="adm-text-input"
                      />
                      <input
                        type="number"
                        name="bodyMeasurements.bmi"
                        value={editForm.bodyMeasurements.bmi}
                        onChange={handleEditChange}
                        placeholder="BMI"
                        className="adm-text-input"
                      />
                      <input
                        type="number"
                        name="bodyMeasurements.muscleMass"
                        value={editForm.bodyMeasurements.muscleMass}
                        onChange={handleEditChange}
                        placeholder="Muscle Mass (kg)"
                        className="adm-text-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="adm-form-actions">
                  <button
                    className="adm-btn adm-btn-success"
                    onClick={() => saveEdit(editingUserId)}
                  >
                    <FiEdit /> Save
                  </button>
                  <button
                    className="adm-btn adm-btn-outline"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (!token) return <div className="adm-login-required">Please log in to access this page</div>;

  return (
    <div className="adm-admin-panel">
      {/* Sidebar */}
      <div className="adm-sidebar">
        <h1 className="adm-logo">Fitness Admin</h1>
        <nav className="adm-sidebar-nav">
          <button
            className={`adm-nav-item ${activeTab === "members" ? "adm-active" : ""}`}
            onClick={() => setActiveTab("members")}
          >
            <FiUsers className="adm-nav-icon" />
            <span>Members</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === "attendance" ? "adm-active" : ""}`}
            onClick={() => setActiveTab("attendance")}
          >
            <FiCalendar className="adm-nav-icon" />
            <span>Attendance</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === "workouts" ? "adm-active" : ""}`}
            onClick={() => setActiveTab("workouts")}
          >
            <FiActivity className="adm-nav-icon" />
            <span>Workouts</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === "progress" ? "adm-active" : ""}`}
            onClick={() => setActiveTab("progress")}
          >
            <FiTrendingUp className="adm-nav-icon" />
            <span>Progress</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === "editUserDetails" ? "adm-active" : ""}`}
            onClick={() => setActiveTab("editUserDetails")}
          >
            <FiEdit className="adm-nav-icon" />
            <span>Edit User Details</span>
          </button>
        </nav>
        <div className="adm-sidebar-footer">
          <button className="adm-btn adm-btn-outline" onClick={handleBack}>
            <FiArrowLeft className="adm-btn-icon" />
            <span>Back</span>
          </button>
          <button className="adm-btn adm-btn-danger" onClick={handleLogout}>
            <FiLogOut className="adm-btn-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="adm-main-content">
        {error && <div className="adm-error-message">{error}</div>}
        {renderTabContent()}
      </div>
    </div>
  );
}

export default AdminPanel;