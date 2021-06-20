import React, { useState, useEffect } from "react";
import { Input } from "./Input.js";

export const MainCalculator = ({
  handleOnclick,
  result_display,
  input1prop,
  input2prop,
  inputCalcTypeprop,
}) => {
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputCalcType, setinputCalcType] = useState("+");

  useEffect(() => {
    setInputValue1(input1prop);
    setInputValue2(input2prop);
    setinputCalcType(inputCalcTypeprop);
  }, [input1prop, input2prop, inputCalcTypeprop]);

  function handleInput1Change(event) {
    setInputValue1(Number(event.target.value));
  }

  function handleInput2Change(event) {
    setInputValue2(Number(event.target.value));
  }

  function handleSelectChange(event) {
    setinputCalcType(event.target.value);
  }
  return (
    <div>
      <form>
        <Input
          name="input1"
          type="number"
          value={inputValue1 ? inputValue1 : 0}
          onChangeHandler={handleInput1Change}
          is_required={true}
        />
        <select
          name="calc_input_type"
          id="calc_input_type"
          onChange={handleSelectChange}
          required
          value={inputCalcType}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="/">/</option>
          <option value="*">*</option>
        </select>
        <Input
          name="input2"
          type="number"
          value={inputValue2 ? inputValue2 : 0}
          onChangeHandler={handleInput2Change}
          is_required={true}
        />
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();

            handleOnclick({
              inpt1: inputValue1,
              inpt2: inputValue2,
              calc_type: inputCalcType,
            });
          }}
        >
          =
        </button>
        &nbsp;
        <span>
          <b>{result_display}</b>
        </span>
      </form>
    </div>
  );
};
