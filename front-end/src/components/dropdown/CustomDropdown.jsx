import React from "react";
import Select from "react-select";

const CustomDropdown = ({ options, value, onChange }) => {
  return (
    <Select
      options={options}
      placeholder={value}
      onChange={onChange}
      isSearchable={false} // Hide the search input
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: "white",
          borderColor: "#e2e8f0",
          borderRadius: "0.375rem",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#333",
        }),
      }}
    />
  );
};

export default CustomDropdown;
