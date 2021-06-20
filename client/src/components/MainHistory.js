import React from "react";

export const MainHistory = ({
  calculatorHistoryList,
  handleOnDeleteclick,
  handleOnEditclick,
  editItemId,
}) => {
  return (
    <div>
      <h3>calculation history</h3>
      <div>
        {calculatorHistoryList &&
          calculatorHistoryList.map((item) => (
            <div key={item.calcID}>
              <div className="calculatorHistoryListItem">
                {` ${item.input1} ${item.calc_type} ${item.input2} = ${item.result}`}
                &nbsp;
                <button
                  onClick={(event) =>
                    handleOnDeleteclick({
                      param_calcID: item.calcID,
                    })
                  }
                >
                  X
                </button>
                &nbsp;
                <button
                  onClick={(event) =>
                    handleOnEditclick({
                      param_input1: item.input1,
                      param_calc_type: item.calc_type,
                      param_input2: item.input2,
                      param_calcID: item.calcID,
                      param_res_display: item.result,
                    })
                  }
                >
                  {"=>"}
                </button>
                {editItemId === item.calcID ? " edit mode" : ""}
              </div>
            </div>
          ))}

        <div>{calculatorHistoryList.length === 0 && "no history"}</div>
      </div>
    </div>
  );
};
