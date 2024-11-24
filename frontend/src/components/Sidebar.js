
import React from "react";
import { FaHome, FaClipboardList, FaEnvelope, FaBell, FaCog } from "react-icons/fa"; // Icons from react-icons
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Suasana Kopi</h1>
        <p>Sabtu, 23 nov 2024</p>
      </div>
      <nav className="sidebar-menu">
        <ul>
          <li>
            <FaHome className="menu-icon" />
            <span>Home</span>
          </li>
          <li>
            <FaClipboardList className="menu-icon" />
            <span>Orders</span>
          </li>
          <li>
            <FaEnvelope className="menu-icon" />
            <span>Inbox</span>
          </li>
          <li>
            <FaBell className="menu-icon" />
            <span>Notifications</span>
          </li>
          <li>
            <FaCog className="menu-icon" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
