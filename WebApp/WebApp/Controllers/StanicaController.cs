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
        public IEnumerable<MarkerInfo> GetStanicas()
        {
            List<MarkerInfo> stanicas = new List<MarkerInfo>();
            foreach(Stanica st in _unitOfWork.Stanicas.GetAll())
            {
                if (!st.IsDeleted) {
                    stanicas.Add(new MarkerInfo() { location = new GeoLocation() { latitude = st.X, longitude = st.Y }, label = st.Adresa, title = st.Naziv, id = st.Id });
                }
            }
            return stanicas.AsEnumerable();
        }
        [Route("api/getstanicaother")]
        [HttpGet]
        public IEnumerable<MarkerInfo> GetStanicaByLin(string linija)
        {
            bool check = false;
            List<MarkerInfo> stanicas = new List<MarkerInfo>();
            foreach (Stanica sta in _unitOfWork.Stanicas.GetAll())
            {
                check = false;
                foreach (Linija li in sta.Linijas)
                {
                    if (li.OznakaLinije == linija)
                    {
                        check = true;
                    }
                }
                if (!check && !sta.IsDeleted)
                    stanicas.Add(new MarkerInfo() { id = sta.Id, location = new GeoLocation() { latitude = sta.X, longitude = sta.Y},label = sta.Adresa, title = sta.Naziv });
            }
            //return _unitOfWork.Linijas.GetAll();
            return stanicas.AsEnumerable();
        }
        [Route("api/getstanicamy")]
        [HttpGet]
        public IEnumerable<MarkerInfo> GetStanicaLin(string linija)
        {
            Linija lin = _unitOfWork.Linijas.GetAll().Single(lins => lins.OznakaLinije == linija);
            List<MarkerInfo> stanicas = new List<MarkerInfo>();
            foreach (Stanica sta in lin.Stanicas)
            {
                if (!sta.IsDeleted) {
                    stanicas.Add(new MarkerInfo() { id = sta.Id, location = new GeoLocation() { latitude = sta.X, longitude = sta.Y }, label = sta.Adresa, title = sta.Naziv });
                }
            }
            return stanicas.AsEnumerable();
        }
        /*
        // GET: api/Stanica/5
        public string Get(int id)
        {
            return "value";
        }*/

        // POST: api/Stanica
        public IHttpActionResult PostStanica(MarkerInfo marker)
        {
            //var req = HttpContext.Current.Request;
            var stanica = new Stanica() { Naziv = marker.title, Adresa = marker.label, X = marker.location.latitude,Y = marker.location.longitude, IsDeleted = false };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _unitOfWork.Stanicas.Add(stanica);
            _unitOfWork.Complete();
            return CreatedAtRoute("DefaultApi", new { id = stanica. Naziv }, stanica);
        }
        [Route("api/updatestanica")]
        [HttpPost]
        public IHttpActionResult UpdateStanica(MarkerInfo marker)
        {
            Stanica stanica = _unitOfWork.Stanicas.GetAll().Single(sta => sta.Id == marker.id);
            if(stanica.Naziv != marker.title)
            {
                stanica.Naziv = marker.title;
            }
            if (stanica.Adresa != marker.label)
            {
                stanica.Adresa = marker.label;
            }
            if (stanica.X != marker.location.latitude)
            {
                stanica.X = marker.location.latitude;
            }
            if (stanica.Y != marker.location.longitude)
            {
                stanica.Y = marker.location.longitude;
            }
            _unitOfWork.Complete();
            return CreatedAtRoute("DefaultApi", new { id = stanica.Id }, stanica);
        }

        // PUT: api/Stanica/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Stanica/5
        [HttpDelete]
        public void Delete(int id)
        {
            Stanica stanica = _unitOfWork.Stanicas.GetAll().Single(sta => sta.Id == id);
            stanica.IsDeleted = true;
            stanica.Linijas.Clear();
            _unitOfWork.Complete();
        }
    }
}
