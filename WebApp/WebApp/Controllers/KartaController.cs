using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class KartaController : ApiController
    {
        IUnitOfWork _unitOfWork;
        private DbContext _context;

        public KartaController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        // GET: api/Karta
        public IEnumerable<Karta> GetKartas()
        {
            return _unitOfWork.Kartas.GetAll();
        }

        // GET: api/Karta/5
        /*public string Get(int id)
        {
            return "value";
        }*/

        // POST: api/Karta
        public void Post([FromBody]string value)
        {

        }

        // PUT: api/Karta/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Karta/5
        public void Delete(int id)
        {
        }
    }
}
