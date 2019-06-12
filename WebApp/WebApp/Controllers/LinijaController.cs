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
                if (!lin.IsDelete)
                {
                    linijas.Add(new LinijaBinding() { OznakaLinije = lin.OznakaLinije, TipLinije = lin.TipLinije });
                }
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
                if(lin.TipLinije.ToString() == linija && !lin.IsDelete)
                    linijas.Add(new LinijaBinding() { OznakaLinije = lin.OznakaLinije, TipLinije = lin.TipLinije });
            }
            //return _unitOfWork.Linijas.GetAll();
            return linijas.AsEnumerable();
        }

        // POST: api/Linija
        public IHttpActionResult PostLinija(LinijaPolasciBinding linijaas)
        {
            bool check = false;
            //var req = HttpContext.Current.Request;
            Linija linija;
            if (_unitOfWork.Linijas.GetAll().Select(l => l.OznakaLinije).Contains(linijaas.Linija.OznakaLinije) && _unitOfWork.Linijas.GetAll().Single(l => l.OznakaLinije == linijaas.Linija.OznakaLinije).IsDelete)
            {
                linija = _unitOfWork.Linijas.GetAll().Single(l => l.OznakaLinije == linijaas.Linija.OznakaLinije);
                linija.IsDelete = false;
                linija.TipLinije = linijaas.Linija.TipLinije;
                check = true;
            }
            else
            {
                linija = new Linija() { OznakaLinije = linijaas.Linija.OznakaLinije, TipLinije = linijaas.Linija.TipLinije, IsDelete = false };
            }

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
            if (!check) {
                _unitOfWork.Linijas.Add(linija);
            }
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
        [HttpDelete]
        public void Delete(string id)
        {
            Linija linija = _unitOfWork.Linijas.GetAll().Single(sta => sta.OznakaLinije == id);
            linija.IsDelete = true;
            linija.Polascis.Clear();
            linija.Stanicas.Clear();
            
            _unitOfWork.Complete();
        }
    }
}
