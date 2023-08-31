import React from "react";

const Textarea = ({
  type,
  label,
  placeholder,
  value,
  name,
  onKeyDown,
  errors,
  isRequired,
  onChange,
  disabled,
}) => {
  return (
    <React.Fragment>
      <div className="form">
        <label>
          {label}
          {isRequired && <span className="required">*</span>}
        </label>
        <div className="form-input">
          <input
            type={type ? type : "text"}
            placeholder={placeholder ? placeholder : name}
            value={value}
            onChange={onChange}
            name={name}
            onKeyDown={onKeyDown}
            autoComplete="off"
            className={errors ? "error" : ""}
            disabled={disabled}
          />
        </div>
        {errors && <span className="error">{errors}</span>}
      </div>
    </React.Fragment>
  );
};

export default Textarea;
