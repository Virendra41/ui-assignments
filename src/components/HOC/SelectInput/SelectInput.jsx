import Select from "react-select";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const cutomStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "4px",
    height: "44px",
    padding: "0 4px",
    marginTop: "8px",
    border: "1px solid #f8f8f80f",
    background: "transparent",
    width: "100%",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #4c9b4c",
    },
    "&:focus": {
      border: "1px solid #4c9b4c",
      outline: "none",
    },
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    fontFamily: "Inter, sans-serif",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
  }),
  Input2: (provided) => ({
    ...provided,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    fontFamily: "Inter, sans-serif",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    color: "#fff !important",
  }),
  ValueContainer2: (provided) => ({
    ...provided,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    fontFamily: "Inter, sans-serif",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    color: "#fff !important",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    fontFamily: "Inter, sans-serif",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    color: "#fff !important",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff !important", // Change this to your desired text color
  }),
};

const SelectInput = ({
  onChange,
  options,
  placeholder,
  value,
  errors,
  isdisabled,
  label,
}) => {
  const [optionsList, setOptionsList] = useState(options);

  useEffect(() => {
    setOptionsList(options);
  }, [options]);

  const customFilterOption = (option, inputValue) => {
    const labelWithoutSpaces = option.label.replace(/\s/g, "").toLowerCase();
    const inputValueWithoutSpaces = inputValue.replace(/\s/g, "").toLowerCase();
    return labelWithoutSpaces.includes(inputValueWithoutSpaces);
  };

  return (
    <div className="form">
      <label>{label}</label>
      <Select
        options={[...optionsList] || []}
        onChange={onChange}
        styles={cutomStyles}
        placeholder={placeholder}
        value={value || null}
        isDisabled={isdisabled}
        filterOption={customFilterOption}
      />
      {errors && <span className="error">{errors}</span>}
    </div>
  );
};

SelectInput.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  error: PropTypes.string,
  creatable: PropTypes.bool,
  isdisabled: PropTypes.bool,
};

export default SelectInput;
