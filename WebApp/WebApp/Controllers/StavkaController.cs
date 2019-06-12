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
    public class StavkaController : ApiController
    {
        IUnitOfWork _unitOfWork;
        private DbContext _context;

        public StavkaController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
            // GET: api/Stavka
        public IEnumerable<StavkaBinding> Get()
        {
            List<StavkaBinding> stavBin = new List<StavkaBinding>();
            Cenovnik cen =_unitOfWork.Cenovniks.GetAll().Last(s => s.Valid == true);
            foreach (Stavka stav in cen.Stavka)
            {
                stavBin.Add(new StavkaBinding() { Id = stav.Id, Cena = stav.TipKarte.Cena * stav.VrstaPutnika.Koeficijent, TipKarte = stav.TipKarte.Tip, TipPopusta = stav.VrstaPutnika.Naziv });
            }
            return stavBin.AsEnumerable();
        }
    }
}
