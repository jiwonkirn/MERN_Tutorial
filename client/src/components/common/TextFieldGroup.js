import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

function TextFieldGroup({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  handleChange,
  disabled
}) {
  return (
    <div className="form-group">
      <input
        className={classNames("form-control form-control-lg", {
          "is-invalid": error
        })}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {info && <small className="form-text text-muted" />}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.required,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.required,
  onChange: PropTypes.string.required,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProp = {
  type: "text"
};

export default TextFieldGroup;
