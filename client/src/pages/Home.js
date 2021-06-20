import React, { useState, useEffect } from "react";
import { MainCalculator } from "../components/MainCalculator.js";
import { MainHistory } from "../components/MainHistory.js";
import {
  Getcalchistory,
  InsertNewCalculation,
  RemoveCalculation,
  EditCalculation,
} from "../services/CalculationService.js";

function Home() {
  const [calculatorHistoryList, setcalculatorHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [res_display, setRes_display] = useState(false);
  //the edit states
  const [inputValue1_edit, setInputValue1_edit] = useState(0);
  const [inputValue2_edit, setInputValue2_edit] = useState(0);
  const [inputCalcType_edit, setinputCalcType_edit] = useState("+");
  const [calcID_edit, setcalcID_edit] = useState(null);

  //on load - useEffect get the calc history list
  useEffect(() => {
    setIsLoading(true);

    Getcalchistory()
      .then((res) => {
        if (!res) {
          return;
        }

        setcalculatorHistoryList(res.data);
      })
      .then(function () {
        setIsLoading(false);
      });
  }, []);

  //the main '=' button click event
  const onCalcClick = (event_values) => {
    setIsLoading(true);

    //validation: can not divide by 0
    if (event_values.inpt2 === 0 && event_values.calc_type === "/") {
      setRes_display("cannot divide by zero");
      setIsLoading(false);
      return;
    }

    //Checks whether it is entering a new calculation or editing an existing calculation
    if (calcID_edit === null) {
      console.log("in insert new mode");
      InsertNewCalculation(
        event_values.inpt1,
        event_values.inpt2,
        event_values.calc_type
      )
        .then((res) => {
          if (!res) {
            return;
          }
          //insert new item to the list using spread operator (not mutating)
          setcalculatorHistoryList((oldArray) => [...oldArray, res.data]);
          setRes_display(res.data.result);
        })
        .then(function () {
          setIsLoading(false);
        });
    } else {
      console.log("in edit mode");
      EditCalculation(
        calcID_edit,
        event_values.inpt1,
        event_values.inpt2,
        event_values.calc_type
      )
        .then((res) => {
          if (!res) {
            return;
          }

          console.log("edit ok");
          //Edit the item using the 'map' function (create new list)
          setcalculatorHistoryList(
            calculatorHistoryList.map(function (item) {
              if (item.calcID === res.data.calcID) {
                return {
                  ...item,
                  input1: res.data.input1,
                  input2: res.data.input2,
                  calc_type: res.data.calc_type,
                  result: res.data.result,
                };
              } else {
                return item;
              }
            })
          );
        })
        .then(function () {
          setIsLoading(false);
        });
    }
    //reset the edit state
    setInputValue1_edit(0);
    setInputValue2_edit(0);
    setinputCalcType_edit("+");
    setcalcID_edit(null);
    setRes_display("");
  };

  //delete item History List by calcID
  const onDeleteclick = (event_values) => {
    setIsLoading(true);
    //call the RemoveCalculation function in service file
    RemoveCalculation(event_values.param_calcID)
      .then((res) => {
        if (!res) {
          return;
        }
        //remove the item from the list in the state by using 'filter' function
        setcalculatorHistoryList(
          calculatorHistoryList.filter(function (item) {
            return item.calcID !== res.data.calcID;
          })
        );
      })
      .then(function () {
        setIsLoading(false);
      });
  };

  //on edit button click ('=>')
  const onEditclick = (event_values) => {
    setInputValue1_edit(event_values.param_input1);
    setInputValue2_edit(event_values.param_input2);
    setinputCalcType_edit(event_values.param_calc_type);
    setcalcID_edit(event_values.param_calcID);
    setRes_display(event_values.param_res_display);
  };

  return (
    <main>
      <h1>React Calculator</h1>
      <div className="row">
        <div className="column1">
          <MainCalculator
            handleOnclick={onCalcClick}
            result_display={res_display}
            input1prop={inputValue1_edit}
            input2prop={inputValue2_edit}
            inputCalcTypeprop={inputCalcType_edit}
          />
        </div>
        <div className="column2">
          <MainHistory
            calculatorHistoryList={calculatorHistoryList}
            handleOnDeleteclick={onDeleteclick}
            handleOnEditclick={onEditclick}
            editItemId={calcID_edit}
          />
        </div>
      </div>
      <div>{isLoading && "loading data..."}</div>
    </main>
  );
}

export default Home;
