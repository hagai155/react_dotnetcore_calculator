import React from "react";

export const Input = ({
  name,
  type,
  maxLength,
  value,
  onChangeHandler,
  onKeyDownHandler,
  is_required
}) => {
  return (
    <input
      name={name}
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      required={is_required}
    />
  );
};
