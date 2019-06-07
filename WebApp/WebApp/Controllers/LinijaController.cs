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
        public IEnumerable<LinijaBinding> GetLinijas()
        {
            List<LinijaBinding> linijas = new List<LinijaBinding>();
            foreach (Linija lin in _unitOfWork.Linijas.GetAll())
            {
                linijas.Add(new LinijaBinding() { OznakaLinije = lin.OznakaLinije, TipLinije = lin.TipLinije });
            }
            //return _unitOfWork.Linijas.GetAll();
            return linijas.AsEnumerable();
        }

        // GET: api/Linija/5
        [Route("api/lins")]
        [HttpGet]
        public IEnumerable<LinijaBinding> GetLinija(string linija)
        {
            List<LinijaBinding> linijas = new List<LinijaBinding>();
            foreach (Linija lin in _unitOfWork.Linijas.GetAll())
            {
                if(lin.TipLinije.ToString() == linija)
                    linijas.Add(new LinijaBinding() { OznakaLinije = lin.OznakaLinije, TipLinije = lin.TipLinije });
            }
            //return _unitOfWork.Linijas.GetAll();
            return linijas.AsEnumerable();
        }

        // POST: api/Linija
        public IHttpActionResult PostLinija(LinijaPolasciBinding linijaas)
        {
            var req = HttpContext.Current.Request;

            Linija linija = new Linija() { OznakaLinije = linijaas.Linija.OznakaLinije, TipLinije = linijaas.Linija.TipLinije };
            List<Polasci> listp = new List<Polasci>();
            List<Stanica> lists = new List<Stanica>();
            foreach (PolazakBinding polazak in linijaas.Polasci)
            {
                foreach (Polasci pol in _unitOfWork.Polascis.GetAll())
                {
                    if (pol.Id == polazak.Id)
                    {
                        listp.Add(pol);
                    }
                }
            }
            foreach (MarkerInfo stanica in linijaas.Stanice)
            {
                foreach (Stanica st in _unitOfWork.Stanicas.GetAll())
                {
                    if (st.Id == stanica.id)
                    {
                        lists.Add(st);
                    }
                }
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            linija.Polascis = listp;
            linija.Stanicas = lists;
            _unitOfWork.Linijas.Add(linija);
            _unitOfWork.Complete();
            return CreatedAtRoute("DefaultApi", new { id = linija.OznakaLinije }, linija);
        }
        [Route("api/updatelinija")]
        [HttpPost]
        public IHttpActionResult UpdateLinija(LinijaPolasciBinding linijaas)
        {
            List<Polasci> listp = new List<Polasci>();
            List<Stanica> lists = new List<Stanica>();
            foreach (PolazakBinding polazak in linijaas.Polasci)
            {
                foreach (Polasci pol in _unitOfWork.Polascis.GetAll())
                {
                    if (pol.Id == polazak.Id)
                    {
                        listp.Add(pol);
                    }
                }
            }
            foreach (MarkerInfo stanica in linijaas.Stanice)
            {
                foreach (Stanica st in _unitOfWork.Stanicas.GetAll())
                {
                    if (st.Id == stanica.id)
                    {
                        lists.Add(st);
                    }
                }
            }
            
            Linija linija = _unitOfWork.Linijas.GetAll().Single(ozn => ozn.OznakaLinije == linijaas.Linija.OznakaLinije);
            linija.Polascis.Clear();
            linija.Stanicas.Clear();
            _unitOfWork.Complete();
            linija = _unitOfWork.Linijas.GetAll().Single(ozn => ozn.OznakaLinije == linijaas.Linija.OznakaLinije);
            linija.Polascis = listp;
            linija.Stanicas = lists;
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
