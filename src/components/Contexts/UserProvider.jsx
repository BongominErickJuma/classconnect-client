import React, { createContext, useState, useEffect } from "react";
import { getImageUrl, userService } from "../../Services/api"; // Ensure userService is exported from this file
import { useNavigate } from "react-router-dom";

// 1. Create the context
const UserContext = createContext();

// 2. Create the provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userService.getMe();
        const currentUser = fetchedUser.data.user;

        currentUser.profile_photo = getImageUrl(currentUser.profile_photo);

        setUser(currentUser);
      } catch (err) {
        setError(err.response?.data?.message || "You are not logged in");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
