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
                //insert new Calculation obj. use the Guid to get unique id
                calc_obj.calcID = Guid.NewGuid().ToString();
                calc_obj.CalcProcess();
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
                    itemToEdit.CalcProcess();     
                }

                return itemToEdit;
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
