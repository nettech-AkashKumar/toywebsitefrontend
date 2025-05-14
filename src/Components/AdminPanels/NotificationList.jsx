import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNotification, removeNotification } from "../../Redux/notificationSlice";
import { v4 as uuidv4 } from "uuid";
import "../AdminPanels/NotificationList.css"

const NotificationPanel = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const [category, setCategory] = useState("Clients");
  const [filters, setFilters] = useState({ comments: true, followers: true });

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleFilterChange = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  const handleAddNotification = () => {
    dispatch(
      addNotification({
        id: uuidv4(),
        user: "Glenn Greer",
        action: "Commented on",
        content: "Love this so much! What tools do you use to create your 3D illustrations?",
        time: "12h",
      })
    );
  };

  return (
    <div className="notification-panel">
      <h2>Notifications</h2>
      <div className="category-tabs">
        {['Clients', 'Products', 'Sales', 'Withdrawal', 'Admin'].map((cat) => (
          <button key={cat} className={category === cat ? "active" : ""} onClick={() => handleCategoryChange(cat)}>
            {cat}
          </button>
        ))}
      </div>
      
      <div className="notification-list">
        {notifications.map((notif) => (
          <div key={notif.id} className="notification-item">
            <p><strong>{notif.user}</strong> {notif.action} <span className="highlight">Collab.</span> {notif.time}</p>
            <p>"{notif.content}"</p>
            <button onClick={() => dispatch(removeNotification(notif.id))}>Dismiss</button>
          </div>
        ))}
        <button className="load-more">Load More</button>
      </div>
      
      <div className="filter-section">
        <h3>Filter</h3>
        <label>
          <input type="checkbox" checked={filters.comments} onChange={() => handleFilterChange("comments")} /> Comments
        </label>
        <label>
          <input type="checkbox" checked={filters.followers} onChange={() => handleFilterChange("followers")} /> Followers
        </label>
        <button className="add-notif" onClick={handleAddNotification}>Add Notification</button>
      </div>
    </div>
  );
};

export default NotificationPanel;





