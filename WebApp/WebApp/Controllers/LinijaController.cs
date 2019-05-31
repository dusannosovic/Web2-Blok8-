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
    public class LinijaController : ApiController
    {
        IUnitOfWork _unitOfWork;
        private DbContext _context;

        public LinijaController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
            // GET: api/Linija
            public IEnumerable<Linija> GetLinijas()
        {
            return _unitOfWork.Linijas.GetAll();
        }

        // GET: api/Linija/5
        /*public string Get(int id)
        {
            return "value";
        }*/

        // POST: api/Linija
        public IHttpActionResult PostLinija()
        {
            var req = HttpContext.Current.Request;
            TipLin tip;
            Enum.TryParse(req.Form["TipLin"],out tip);
            var linija = new Linija() { OznakaLinije = req.Form["OznLin"], TipLinije = tip };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _unitOfWork.Linijas.Add(linija);
            _unitOfWork.Complete();
            return CreatedAtRoute("DefaultApi", new { id = linija.OznakaLinije }, linija);
        }

        // PUT: api/Linija/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Linija/5
        public void Delete(int id)
        {
        }
    }
}
