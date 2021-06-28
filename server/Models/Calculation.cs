using System;

namespace server
{
    public class Calculation
    {
        public string calcID { get; set; }
        public double input1 { get; set; }
        public double input2 { get; set; }
        public string calc_type { get; set; }
        public double result { get; set; }

        public void CalcProcess()
        {
            double res_num = 0;
            switch (calc_type)
            {
                case "+":
                    res_num = Add();
                    break;
                case "-":
                    res_num = Subtract();
                    break;
                case "*":
                    res_num = Multiply();
                    break;
                case "/":
                    res_num = Division();
                    break;
                default:
                    res_num = 0;
                    break;
            }

            result = res_num;
        }

        // Add two double and returns the sum  
        public double Add()
        {
            return input1 + input2;
        }

        // Multiply two double and retuns the result  
        public double Multiply()
        {
            return input1 * input2;
        }
        //Subtract two double and retuns the result
        public double Subtract()
        {
            return input1 - input2;
        }

        //Division on two double variables.  
        public double Division()
        {
            return Math.Round(input1 / input2, 2);
        }
    }
}
