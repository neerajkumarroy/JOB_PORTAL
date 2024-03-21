import React from "react";

const InputForm = ({
  htmlFrom,
  lableText,
  type,
  name,
  value,
  handleChange,
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={htmlFrom} className="form-label">
          {lableText}
        </label>
        <input
          type={type}
          className="form-control"
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default InputForm;
