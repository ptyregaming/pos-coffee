import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaClipboardList, FaEnvelope, FaBell, FaCog } from "react-icons/fa";
import "../styles/Sidebar.css";
import dayjs from "dayjs";

const currentTime = dayjs().format('DD/MM/YYYY');

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Suasana Kopi</h1>
        <p>{currentTime}</p>
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
            <Link to="/dashboard" className="menu-link">
              <FaCog className="menu-icon" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
