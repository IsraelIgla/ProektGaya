using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace GayaServer
{
    public class TrimStringsAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var keys = actionContext.ActionArguments.Keys.ToList();

            foreach (var key in keys)
            {
                var argument = actionContext.ActionArguments[key];

                if (argument is string strArg)
                {
                    actionContext.ActionArguments[key] = strArg?.Trim();
                }
                else if (argument != null)
                {
                    // Optional: trim all string properties inside complex objects
                    var props = argument.GetType().GetProperties()
                        .Where(p => p.PropertyType == typeof(string) && p.CanRead && p.CanWrite);

                    foreach (var prop in props)
                    {
                        var value = (string)prop.GetValue(argument);
                        if (value != null)
                        {
                            prop.SetValue(argument, value.Trim());
                        }
                    }
                }
            }

            base.OnActionExecuting(actionContext);
        }
    }
}