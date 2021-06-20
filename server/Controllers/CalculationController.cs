using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using server.Services;


namespace server.Controllers
{
    [ApiController]

    public class CalculationController : ControllerBase
    {
        private readonly ILogger<CalculationController> _logger;
        private readonly IConfiguration _config;
        private ICalculationService _calculationService;

        public CalculationController(ILogger<CalculationController> logger, IConfiguration configuration, ICalculationService calculationService)
        {
            _logger = logger;
            _config = configuration;
            _calculationService = calculationService;
        }

        //http://localhost:5000/api/Calculation/GetCalcHistory
        [HttpGet("api/[controller]/GetCalcHistory")]
        public IActionResult GetCalcHistory()
        {
            try
            {
                var lst_calculations = _calculationService.GetCalcHistory();
                return Ok(lst_calculations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("api/[controller]/InsertCalc")]
        public IActionResult InsertCalc(Calculation calc_obj)
        {
            try
            {
                var new_calculation_obj = _calculationService.InsertNewCalc(calc_obj);
                return Ok(new_calculation_obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("api/[controller]/DeleteCalc")]
        public IActionResult DeleteCalc(Calculation calc_obj)
        {
            try
            {
                var remove_res = _calculationService.DeleteCalc(calc_obj);

                if (!remove_res)
                {
                    return BadRequest();
                }

                return Ok(calc_obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPut("api/[controller]/EditCalc")]
        public IActionResult EditCalc(Calculation calc_obj)
        {
            try
            {
                Calculation new_Calculation_obj = _calculationService.EditCalc(calc_obj);

                if (new_Calculation_obj== null)
                {
                    return BadRequest();
                }

                return Ok(new_Calculation_obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
