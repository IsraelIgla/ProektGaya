using BLL;
using Models;
using System;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GayaServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OperationsController : BaseController
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

        //GET api/Operations
        [HttpGet]
        [Route("api/operations")]
        public IHttpActionResult Operations()
        {
            try
            {
                return Ok(Db.Operations.ToList());
            }
            catch (Exception ex)
            {
                return GetBadRequest(ex.Message);
            }
        }

        //GET api/Operations/Calculate?field1=a&field2=b&operationName=c
        [HttpGet]
        [Route("api/operations/calculate")]
        public IHttpActionResult Calculate(string field1, string field2, string operationName)
        {
            operationName = operationName.Trim();
            Operation operation = Db.Operations.FirstOrDefault(o => o.Name == operationName);
            if (operation == null)
                return NotFound();
            try
            {
                string result = Utilities.Calculate(field1, field2, operation.Script);
                Db.OperationsHystories
                    .Add(new OperationsHystory(operation, field1, field2, result, DateTime.Now));
                Db.SaveChanges();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return GetBadRequest(ex.Message);
            }
        }

        //GET api/Operations/Help
        [HttpGet]
        [Route("api/operations/help")]
        public IHttpActionResult Help()
        {
            try
            {
                return Ok(Utilities.GetHelpInformation());
            }
            catch (Exception ex)
            {
                return GetBadRequest(ex.Message);
            }
        }

        //Post api/Operations/Create?operationName=a&script=s
        [HttpPost]
        [TrimStrings]
        public IHttpActionResult Create(string operationName, string script)
        {
            try
            {
                Operation operation = Db.Operations.FirstOrDefault(o => o.Name == operationName);
                if (operation != null)
                    return BadRequest(Utilities.GetMessageForEvent(Utilities.EventType.OperationExists));
                operation = new Operation { Name = operationName, Script = script };
                Db.Operations.Add(operation);
                Db.SaveChanges();
                return Created("/operations/" + operation.ID, operation.ID);
            }
            catch (Exception ex)
            {
                return GetBadRequest(ex.Message);
            }
        }

        //Put api/Operations/Update?operationOldName=a&operationNewName=b&script=s
        [HttpPut]
        [TrimStrings]
        public IHttpActionResult Update(string operationOldName, string operationNewName, string script)
        {
            try
            {
                Operation operation;
                operation = Db.Operations.FirstOrDefault(o => o.Name == operationOldName);
                if (operation == null)
                    return NotFound();
                if (operationOldName != operationNewName && Db.Operations.Any(o => o.Name == operationNewName))
                    return BadRequest(Utilities.GetMessageForEvent(Utilities.EventType.OperationExists));
                operation.Name = operationNewName;
                operation.Script = script;
                Db.Entry(operation).State = EntityState.Modified;
                Db.SaveChanges();
            }
            catch (Exception ex)
            {
                return GetBadRequest(ex.Message);
            }
            return Ok(Utilities.GetMessageForEvent(Utilities.EventType.Success));
        }

        //Delete api/Operations/Delete?operationName=a
        [HttpDelete]
        public IHttpActionResult Delete(string operationName)
        {
            try
            {
                Operation operation = Db.Operations.FirstOrDefault(o => o.Name == operationName);
                if (operation == null)
                    return NotFound();
                Db.Operations.Remove(operation);
                Db.SaveChanges();
            }
            catch (Exception ex)
            {
                return GetBadRequest(ex.Message);
            }
            return Ok(Utilities.GetMessageForEvent(Utilities.EventType.Success));
        }

        #region Local functions

        #endregion
    }
}
