import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserProvider";

const useCurrentUser = () => {
  const context = useContext(UserContext);

  if (!context) return <p>current Person used outside context</p>;

  return context;
};

export default useCurrentUser;
