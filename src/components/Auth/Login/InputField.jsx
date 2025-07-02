// src/components/auth/Login/InputField.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputField = ({ type, icon, label, placeholder, value, onChange, name }) => (
  <div className="relative">
    <label className="block mb-2 text-sm font-medium">{label}</label>
    <div className="relative">
      <FontAwesomeIcon icon={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 icon" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full p-3 pl-10 rounded-lg font-normal"
      />
    </div>
  </div>
);

export default InputField;
