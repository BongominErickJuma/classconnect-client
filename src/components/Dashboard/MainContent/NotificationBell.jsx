import React, { useEffect, useState, useRef } from "react";
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

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-lg transition-all duration-200"
        title="Notifications"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-[var(--color-error)] text-white text-xs font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center leading-none transform translate-x-1 -translate-y-1">
            {unreadCount > 10 ? "10+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[var(--color-background)] shadow-2xl border border-[var(--color-border)] rounded-xl z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
            <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
              <span>Notifications</span>
              <span className="bg-[var(--color-primary)] text-white text-xs px-2 py-1 rounded-full">
                {notifications.length}
              </span>
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Double-click to mark as read</p>
          </div>

          <div className="max-h-80 overflow-y-auto custom-scroll">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-[var(--color-surface)] rounded-full flex items-center justify-center mx-auto mb-3">
                  🔔
                </div>
                <p className="text-[var(--color-text-secondary)]">No new notifications</p>
              </div>
            ) : (
              <ul className="divide-y divide-[var(--color-border)]">
                {notifications.map((notification) => (
                  <li
                    key={notification.notification_id}
                    onDoubleClick={() => handleMarkRead(notification.notification_id)}
                    className={`p-4 hover:bg-[var(--color-surface)]/50 cursor-pointer transition-colors ${
                      !notification.read ? "bg-[var(--color-primary)]/5 border-l-4 border-[var(--color-primary)]" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          !notification.read ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
