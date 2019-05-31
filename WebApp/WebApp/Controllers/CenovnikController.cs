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
    public class CenovnikController : ApiController
    {
        // GET: api/Cenovnik
        IUnitOfWork _unitOfWork;
        private DbContext _context;

        public CenovnikController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
        public IEnumerable<Cenovnik> Get()
        {
            return _unitOfWork.Cenovniks.GetAll();
        }

        // GET: api/Cenovnik/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Cenovnik
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Cenovnik/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Cenovnik/5
        public void Delete(int id)
        {
        }
    }
}
