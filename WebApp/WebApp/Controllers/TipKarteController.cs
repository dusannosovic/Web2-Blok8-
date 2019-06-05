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
    public class TipKarteController : ApiController
    {
        IUnitOfWork _unitOfWork;
        private DbContext _context;
        public TipKarteController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
        // GET: api/TipKarte
        public IEnumerable<TipKarte> GetTipKarte()
        {
            return _unitOfWork.TipKartes.GetAll();
        }

        // POST: api/TipKarte
        /*public IHttpActionResult PostTipKarte()
        {
            var req = HttpContext.Current.Request;
                return CreatedAtRoute("DefaultApi");
                
            }
            
        }*/

        // PUT: api/TipKarte/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TipKarte/5
        public void Delete(int id)
        {
        }
    }
}
