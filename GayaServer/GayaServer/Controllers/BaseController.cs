using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace GayaServer.Controllers
{
    public class BaseController : ApiController
    {
        #region Local functions

        public BadRequestErrorMessageResult GetBadRequest(string message)
        {
            return BadRequest(Utilities.GetMessageForEvent(Utilities.EventType.FailedGeneral)
                    + "\r\n" + message);
        }

        #endregion
    }
}
