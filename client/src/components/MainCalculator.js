import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  width: 30%;
`;
const Grid = styled.div`
  background: #aaa;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  padding: 1px;
  max-height: 300px;
`;

const ResultRow = styled.div`
  grid-column: span 4;
  text-align: right;
  font-size: 3em;
  padding: 16px;
  background: #aaa;
  color: #fff;
  height: 50px;
  min-height: 50px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  background: #eef;
`;

const UtilityButton = styled(Button)`
  background: #eee;
`;

const OperatorButton = styled(Button)`
  background: orange;
`;

const Span2Button = styled(Button)`
  grid-column: span 2;
`;

export const MainCalculator = ({
  handleOnclick,
  result_display,
  setRes_display,
  input1prop,
  input2prop,
  inputCalcTypeprop,
}) => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputCalcType, setinputCalcType] = useState("");

  useEffect(() => {
    setInputValue1(input1prop);
    setInputValue2(input2prop);
    setinputCalcType(inputCalcTypeprop);
  }, [input1prop, input2prop, inputCalcTypeprop]);

  function handleClear() {
    setInputValue1("");
    setInputValue2("");
    setinputCalcType("");
    setRes_display("");
  }

  function handleOperator(operator) {
    setinputCalcType(operator);
  }

  function handleNum(num) {
    if (inputCalcType === "") {
      setInputValue1((prevnum) => prevnum.toString() + num.toString());
    } else {
      setInputValue2((prevnum) => prevnum.toString() + num.toString());
    }
  }

  return (
    <div>
      <GridContainer>
        <Grid>
          <ResultRow>
            {(inputValue1 || inputValue2) !== ""
              ? inputValue1 + inputCalcType + inputValue2
              : result_display}
          </ResultRow>
          <UtilityButton onClick={handleClear}>AC</UtilityButton>
          <UtilityButton onClick={handleOperator}>&#177;</UtilityButton>
          <UtilityButton onClick={handleOperator}>%</UtilityButton>

          <OperatorButton onClick={() => handleOperator("/")}>/</OperatorButton>

          <Button onClick={() => handleNum(7)}>7</Button>
          <Button onClick={() => handleNum(8)}>8</Button>
          <Button onClick={() => handleNum(9)}>9</Button>

          <OperatorButton onClick={() => handleOperator("*")}>x</OperatorButton>

          <Button onClick={() => handleNum(4)}>4</Button>
          <Button onClick={() => handleNum(5)}>5</Button>
          <Button onClick={() => handleNum(6)}>6</Button>

          <OperatorButton onClick={() => handleOperator("-")}>-</OperatorButton>

          <Button onClick={() => handleNum(1)}>1</Button>
          <Button onClick={() => handleNum(2)}>2</Button>
          <Button onClick={() => handleNum(3)}>3</Button>

          <OperatorButton onClick={() => handleOperator("+")}>+</OperatorButton>

          <Span2Button onClick={() => handleNum(0)}>0</Span2Button>
          <Button onClick={() => handleNum(".")}>.</Button>

          <OperatorButton
            onClick={(event) => {
              event.preventDefault();
              handleOnclick({
                inpt1: inputValue1,
                inpt2: inputValue2,
                calc_type: inputCalcType,
              });
              setInputValue1("");
              setInputValue2("");
              setinputCalcType("");
            }}
          >
            &#61;
          </OperatorButton>
        </Grid>
      </GridContainer>
    </div>
  );
};
