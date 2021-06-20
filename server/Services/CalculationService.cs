using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;


namespace server.Services
{

    public interface ICalculationService
    {
        IEnumerable<Calculation> GetCalcHistory();

        Calculation InsertNewCalc(Calculation calc_obj);

        bool DeleteCalc(Calculation calc_obj);

        Calculation EditCalc(Calculation calc_obj);

    }

    public class CalculationService : ICalculationService
    {
        private readonly IConfiguration _config;
        public static List<Calculation> global_calc_list = new List<Calculation>();

        public CalculationService(IConfiguration config)
        {
            _config = config;
        }

        public IEnumerable<Calculation> GetCalcHistory()
        {
            try
            {
                return global_calc_list;
            }
            catch (System.Exception)
            {
                throw;
            }
        }


        public Calculation InsertNewCalc(Calculation calc_obj)
        {
            try
            {
                calc_obj.result = CalcProcess(calc_obj);
                calc_obj.calcID = Guid.NewGuid().ToString();
                global_calc_list.Add(calc_obj);

                return calc_obj;
            }
            catch (System.Exception)
            {
                throw;
            }
        }


        public bool DeleteCalc(Calculation calc_obj)
        {
            try
            {
                bool remove_res = false;

                var itemToRemove = global_calc_list.SingleOrDefault(r => r.calcID == calc_obj.calcID);
                if (itemToRemove != null)
                {
                    remove_res = global_calc_list.Remove(itemToRemove);
                }

                return remove_res;
            }
            catch (System.Exception)
            {
                throw;
            }
        }


        public Calculation EditCalc(Calculation calc_obj)
        {
            try
            {
                Calculation itemToEdit = global_calc_list.SingleOrDefault(r => r.calcID == calc_obj.calcID);

                if (itemToEdit != null)
                {
                    itemToEdit.input1 = calc_obj.input1;
                    itemToEdit.input2 = calc_obj.input2;
                    itemToEdit.calc_type = calc_obj.calc_type;
                    itemToEdit.result = CalcProcess(calc_obj);     
                }

                return itemToEdit;
            }
            catch (System.Exception)
            {
                throw;
            }
        }



        private double CalcProcess(Calculation calc_obj)
        {
            double res_num = 0;
            switch (calc_obj.calc_type)
            {
                case "+":
                    res_num = Add(calc_obj.input1, calc_obj.input2);
                    break;
                case "-":
                    res_num = Subtract(calc_obj.input1, calc_obj.input2);
                    break;
                case "*":
                    res_num = Multiply(calc_obj.input1, calc_obj.input2);
                    break;
                case "/":
                    res_num = Division(calc_obj.input1, calc_obj.input2);
                    break;
                default:
                    res_num = 0;
                    break;
            }

            return res_num;
        }

        // Add two double and returns the sum  
        public double Add(double num1, double num2)
        {
            return num1 + num2;
        }

        // Multiply two double and retuns the result  
        public double Multiply(double num1, double num2)
        {
            return num1 * num2;
        }
        public double Subtract(double num1, double num2)
        {
            return num1 - num2;
        }

        //performing Division on two double variables.  
        public double Division(double num1, double num2)
        {
            return Math.Round(num1 / num2, 2);
        }
    }
}
