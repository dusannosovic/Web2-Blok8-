using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class StanicaController : ApiController
    {
        IUnitOfWork _unitOfWork;
        private DbContext _context;

        public StanicaController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
            // GET: api/Stanica
        public IEnumerable<Stanica> GetStanicas()
        {
            return _unitOfWork.Stanicas.GetAll();
        }
        /*
        // GET: api/Stanica/5
        public string Get(int id)
        {
            return "value";
        }*/

        // POST: api/Stanica
        public IHttpActionResult PostStanica()
        {
            var req = HttpContext.Current.Request;
            double x;
            double y;
            double.TryParse(req.Form["X"], out x);
            double.TryParse(req.Form["Y"], out y);
            var stanica = new Stanica() { Naziv = req.Form["Naziv"], Adresa = req.Form["Adr"], X = x,Y = y };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _unitOfWork.Stanicas.Add(stanica);
            _unitOfWork.Complete();
            return CreatedAtRoute("DefaultApi", new { id = stanica. Naziv }, stanica);
        }

        // PUT: api/Stanica/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Stanica/5
        public void Delete(int id)
        {
        }
    }
}
