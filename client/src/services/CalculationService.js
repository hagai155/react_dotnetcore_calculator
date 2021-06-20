import configData from "../config.json";
const axios = require("axios");

//get all calchistory from server
export const Getcalchistory = async () => {
  try {
    const response = await axios.get(
      `${configData.SERVER_URL}/calculation/getcalchistory`
    );

    return {
      data: response.data,
    };
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

//insert new Calculation to the server
export const InsertNewCalculation = async (
  param_val1,
  param_val2,
  param_calc_type
) => {
  try {
    const response = await axios.post(
      `${configData.SERVER_URL}/calculation/InsertCalc`,
      {
        input1: param_val1,
        input2: param_val2,
        calc_type: param_calc_type,
      }
    );

    return {
      data: response.data,
    };
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

//remove Calculation from server
export const RemoveCalculation = async (param_calcID) => {
  try {
    const response = await axios.delete(
      `${configData.SERVER_URL}/calculation/DeleteCalc`,
      { data: { calcID: param_calcID } }
    );

    return {
      data: response.data,
    };
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

//edit Calculation
export const EditCalculation = async (
  param_calcID,
  param_input1,
  param_input2,
  param_calc_type
) => {
  try {
    //console.log(param_calc_type)
    const response = await axios.put(
      `${configData.SERVER_URL}/calculation/EditCalc`,
      {
        calcID: param_calcID,
        input1: param_input1,
        input2: param_input2,
        calc_type: param_calc_type,
      }
    );

    return {
      data: response.data,
    };
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
