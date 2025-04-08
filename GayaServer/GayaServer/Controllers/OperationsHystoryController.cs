using Models;
using System.Linq;
using System.Web.Http;
using System;
using System.Web.Http.Cors;

namespace GayaServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OperationsHystoryController : BaseController
    {
        private static GayaDBEntities db = null;

        public static GayaDBEntities Db
        {
            get
            {
                if (db == null)
                    db = new GayaDBEntities();
                return db;
            }
        }

        //GET api/OperationsHystory/operationsLastHystory?operationName=Add&count=5
        [HttpGet]
        [Route("api/OperationsHystory/operationsLastHystory")]
        public IHttpActionResult OperationsLastHystory(string operationName, int count)
        {
            try
            {
                return Ok(Db.OperationsHystories.OrderByDescending(o => o.Date).Take(count).ToList());
            }
            catch (Exception ex)
            {
                return GetBadRequest(ex.Message);
            }
        }

        //GET api/OperationsHystory/operationsHystoryCount?operationName=Add
        [HttpGet]
        [Route("api/OperationsHystory/operationsHystoryCount")]
        public IHttpActionResult OperationsHystoryCount(string operationName)
        {
            try
            {
                return Ok(Db.OperationsHystories.Count());
            }
            catch (Exception ex)
            {
                return GetBadRequest(ex.Message);
            }
        }
    }
}
