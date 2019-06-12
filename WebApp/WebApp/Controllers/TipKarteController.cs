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
        public IEnumerable<TipKarteBinding> GetTipKarte()
        {
            List<TipKarteBinding> list = new List<TipKarteBinding>();
            foreach(TipKarte tip in _unitOfWork.TipKartes.GetAll())
            {
                list.Add(new TipKarteBinding() { Cena = tip.Cena, Tip = tip.Tip });
            }
            return list.AsEnumerable();
        }
        [HttpPost]
        public IHttpActionResult EditKarta(TipKarteBinding[] tipKartes)
        {
            //var req = HttpContext.Current.Request;
            _unitOfWork.TipKartes.GetAll().Single(c => c.Tip == tipKartes[0].Tip).Cena = tipKartes[0].Cena;
            _unitOfWork.TipKartes.GetAll().Single(c => c.Tip == tipKartes[1].Tip).Cena = tipKartes[1].Cena;
            _unitOfWork.TipKartes.GetAll().Single(c => c.Tip == tipKartes[2].Tip).Cena = tipKartes[2].Cena;
            _unitOfWork.TipKartes.GetAll().Single(c => c.Tip == tipKartes[3].Tip).Cena = tipKartes[3].Cena;
            Cenovnik cen = _unitOfWork.Cenovniks.GetAll().Last(s => s.Valid == true);
            cen.EndDate = DateTime.Now;
            cen.Valid = false;
            Cenovnik cenNew = new Cenovnik() { StartTime = DateTime.Now, Valid = true };
            foreach(TipKarte tip in _unitOfWork.TipKartes.GetAll())
            {
                foreach(VrstaPutnika vrstaPutnika in _unitOfWork.VrstaPutnikas.GetAll())
                {
                    _unitOfWork.Stavkas.Add(new Stavka() { Cena = tip.Cena*vrstaPutnika.Koeficijent, Cenovnik = cenNew, TipKarte = tip, VrstaPutnika = vrstaPutnika});
                }
            }
            _unitOfWork.Complete();
            return CreatedAtRoute("DefaultApi", new { id = tipKartes[0].Tip}, tipKartes);
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
