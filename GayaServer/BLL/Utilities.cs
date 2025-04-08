using NCalc;
using System;

namespace BLL
{
    public static class Utilities
    {
        public static string Calculate(string field1, string field2, string script)
        {
            string result = string.Empty;
            string expression;
            try
            {
                bool bothNumbers = double.TryParse(field1, out _) && double.TryParse(field2, out _);
                expression = bothNumbers ? script.Replace("x", field1).Replace("y", field2) :
                    script.Replace("x", $"'{field1}'").Replace("y", $"'{field2}'");
                //Expression expr = new Expression(expression, EvaluateOptions.NoReflection);
                Expression expr = new Expression(expression);
                AddCustomBasicOperations(expr);
                result = expr.Evaluate().ToString();
                var test = typeof(Expression).Assembly.FullName;
            }
            catch (Exception ex)
            {
                result = "not valid";
            }
            return result;
        }

        static void AddCustomBasicOperations(Expression expr)
        {
            expr.EvaluateFunction += (name, args) =>
            {
                switch (name)
                {
                    case "ToUpper":
                        args.Result = args.Parameters[0].Evaluate().ToString().ToUpper();
                        break;
                    case "ToLower":
                        args.Result = args.Parameters[0].Evaluate().ToString().ToLower();
                        break;
                    case "Length":
                        args.Result = args.Parameters[0].Evaluate().ToString().Length;
                        break;
                    case "Sqrt":
                        args.Result = Math.Sqrt(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Sinh":
                        args.Result = Math.Sinh(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Sin":
                        args.Result = Math.Sin(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Arcsin":
                        args.Result = Math.Asin(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Cosh":
                        args.Result = Math.Cosh(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Cos":
                        args.Result = Math.Cos(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Arccos":
                        args.Result = Math.Acos(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Tanh":
                        args.Result = Math.Tanh(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Tan":
                        args.Result = Math.Tan(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Arctan":
                        args.Result = Math.Atan(ConvertToRadians(args.Parameters[0].Evaluate()));
                        break;
                    case "Log":
                        args.Result = Math.Log10(Convert.ToDouble(args.Parameters[0].Evaluate()));
                        break;
                    case "Ln":
                        args.Result = Math.Log(Convert.ToDouble(args.Parameters[0].Evaluate()));
                        break;
                    case "Exp":
                        args.Result = Math.Exp(Convert.ToDouble(args.Parameters[0].Evaluate()));
                        break;
                    case "Abs":
                        args.Result = Math.Abs(Convert.ToDouble(args.Parameters[0].Evaluate()));
                        break;
                    case "Round":
                        args.Result = Math.Round(Convert.ToDouble(args.Parameters[0].Evaluate()));
                        break;
                    case "Min":
                        double x = Convert.ToDouble(args.Parameters[0].Evaluate());
                        double y = Convert.ToDouble(args.Parameters[1].Evaluate());
                        args.Result = Math.Min(x, y);
                        break;
                    case "Max":
                        x = Convert.ToDouble(args.Parameters[0].Evaluate());
                        y = Convert.ToDouble(args.Parameters[1].Evaluate());
                        args.Result = Math.Max(x, y);
                        break;
                    case "Power":
                        x = Convert.ToDouble(args.Parameters[0].Evaluate());
                        y = Convert.ToDouble(args.Parameters[1].Evaluate());
                        args.Result = Math.Pow(x, y);
                        break;
                    default:
                        throw new ArgumentException("Unknown function: " + name);
                }
            };
        }

        static double ConvertToRadians(object degrees)
        {
            return Math.PI * Convert.ToDouble(degrees) / 180.0;
        }

        public enum EventType
        {
            OperationExists,
            //OperationNotExists,
            FailedGeneral,
            Success
        }

        public static string GetMessageForEvent(EventType eventMessage)
        {
            switch (eventMessage)
            {
                case EventType.OperationExists:
                    return "failed: operation with such name already exists";
                //case EventType.OperationNotExists:
                //    return "failed: operation with such name does not exists";
                case EventType.FailedGeneral:
                    return "failed: something went wrong";
                case EventType.Success:
                    return "success";
                default:
                    return string.Empty;
            }
        }

        public static string GetHelpInformation()
        {
            return "<b>MANAGE OPERATIONS tab: </b>" +
                "<div style=\"text-align: left\"><p>You can create, update or delete operations that listed" +
                "in <b>CALCULATOR</b> tab, in drop down list.</p>" +
                "<p>Syntax of operation <b>script</b> will be written according to the following rules:</p>" +
                "<p><b>x</b> - First field, <b>y</b> - Second field</p>" +
                "<p>you can use basic operations +(also for strings)-*/, parenthes ()</p>" +
                "<p>and following <b>keywords</b>:</p><p><b>for strings:</b></p>" +
                "<p><b>ToUpper</b> - converts a string to uppercase letters</p>" +
                "<p><b>ToLower</b> - converts a string to lowercase letters</p>" +
                "<p><b>Length</b> - counts string length</p><p><b>for numbers:</b></p>" +
                "<p><b>Sqrt</b> - square root</p><p><b>Sin,Cos,Tan</b> - trigonometric functions</p>" +
                "<p><b>Arcsin,Arccos,Arctan</b> - reversed trigonometric functions</p>" +
                "<p><b>Sinh,Cosh,Tanh</b> - hyperbolic analogs of trigonometric functions</p>" +
                "<p><b>Log</b> - logarithm base 10</p><p><b>Ln</b> - natural logarithm</p>" +
                "<p><b>Exp</b> - exponent</p><p><b>Abs</b> - absolute value</p>" +
                "<p><b>Round</b> - rounds a number</p><p><b>Min,Max</b> - minimum and maximum, respectively</p>" +
                "<p><b>Power</b> - number in degree of anothr number</p>" +
                "<br/><p><b>Examples: </b></p><p>ToUpper(x)+ToLower(y)+Length(x+y)</p>" +
                "<p>Power(x,y)*Ln(Max(x,y))</p></div>";
        }
    }
}
