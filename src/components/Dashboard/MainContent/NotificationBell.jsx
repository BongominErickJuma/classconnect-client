import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { notificationService } from "../../../Services/api";
import { formatDistanceToNow } from "date-fns";

const NotificationBell = () => {
  const { user } = useCurrentUser();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleMarkRead = async (notification_id) => {
    try {
      const res = await notificationService.openNotification(notification_id);
      if (res?.status === 200) {
        setNotifications((prev) =>
          prev.map((notif) => (notif.notification_id === notification_id ? { ...notif, read: true } : notif))
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notificationService.getAllNotifications(user.user_id);
        if (res) {
          setNotifications(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.user_id) fetchNotifications();
  }, [notifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative profile-btn">
        <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 p-1flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded-md z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b ">
            <p className="font-semibold text-gray-700">Notifications {notifications.length}</p>
            <p>double-click on a notification to mark as read</p>
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No new notifications</div>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.notification_id}
                  onDoubleClick={() => handleMarkRead(notification.notification_id)}
                  className={`px-4 py-2 text-sm border-b hover:bg-gray-100 cursor-pointer ${
                    !notification.read ? "bg-blue-50 font-medium" : "text-gray-700"
                  }`}
                >
                  <p>{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
