import React from "react";

const Input = ({
  type,
  label,
  placeholder,
  icon,
  value,
  name,
  onKeyDown,
  errors,
  onIconClick,
  isRequired,
  onChange,
  disabled,
  minDate,
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
            min={
              type === "date"
                ? minDate
                  ? new Date(minDate).toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0]
                : null
            }
          />

          {icon && (
            <div className="icon-alignment">
              <img
                onClick={() => {
                  onIconClick && onIconClick();
                }}
                src={icon}
                alt="icon"
              />
            </div>
          )}
        </div>
        {errors && <span className="error">{errors}</span>}
      </div>
    </React.Fragment>
  );
};

export default Input;
