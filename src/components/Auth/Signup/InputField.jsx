// src/components/auth/Signup/InputField.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const InputField = ({ label, name, type, value, onChange, icon, placeholder, isValid, validationMessage, onBlur }) => (
  <div className="relative mb-4">
    <label className="block mb-2 text-sm font-medium">{label}</label>
    <div className="relative">
      <FontAwesomeIcon icon={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full p-3 pl-10 rounded-lg font-normal border ${
          validationMessage ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        required
      />
      {isValid && value && (
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
        />
      )}
    </div>
    {validationMessage && <p className="text-xs mt-1 text-red-500">{validationMessage}</p>}
  </div>
);

export default InputField;
