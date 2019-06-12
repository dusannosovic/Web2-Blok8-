using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class KartaController : ApiController
    {
        IUnitOfWork _unitOfWork;
        private DbContext _context;
        private ApplicationUserManager UserManager;


        public KartaController(IUnitOfWork unitOfWork, DbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            //UserManager = userManager;
        }


        [Route("api/Karta")]
        [HttpGet]
        public IEnumerable<KartaBinding> GetKarta(string username)
        {
            List<KartaBinding> kartas = new List<KartaBinding>();
            foreach (Karta karta in _unitOfWork.Kartas.GetAll())
            {
                if (username == karta.Korisnik) {
                    kartas.Add(new KartaBinding() {TipKarte = karta.TipKarte, VrstaPutnika = karta.VrstaPutnika, Cena = karta.Cena, Username = karta.Korisnik});
                }
                //linijas.Add(new PolazakBinding() { Dan = lin.Dan,VremePolaska = lin.VremePolaska.ToString() });
            }
            //return _unitOfWork.Linijas.GetAll();
            return kartas.AsEnumerable();
        }
        [Route("api/Karta")]
        [HttpPost]
        public IHttpActionResult PostKarta(KartaBinding karta)
        {
            Stavka tempStavka = null;
            Karta kartaTemp = null;
            //var req = HttpContext.Current.Request;
            if (karta.Username != null)
            {

                foreach (Stavka stavka in _unitOfWork.Cenovniks.GetAll().Last(s => s.Valid == true).Stavka)
                {
                    if (stavka.TipKarte.Tip == karta.TipKarte && stavka.VrstaPutnika.Naziv == karta.VrstaPutnika)
                    {
                        tempStavka = stavka;
                    }
                }

                kartaTemp = new Karta() { Cena = karta.Cena, DatumIzdavanja = DateTime.Now, TipKarte = karta.TipKarte, VrstaPutnika = karta.VrstaPutnika, Korisnik = karta.Username, Stavka = tempStavka };
            }
            else
            {

                foreach (Stavka stavka in _unitOfWork.Cenovniks.GetAll().Last(s => s.Valid == true).Stavka)
                {
                    if (stavka.TipKarte.Tip == karta.TipKarte && stavka.VrstaPutnika.Naziv == karta.VrstaPutnika)
                    {
                        tempStavka = stavka;
                    }
                }
                kartaTemp = new Karta() { Cena = karta.Cena, DatumIzdavanja = DateTime.Now, TipKarte = karta.TipKarte, VrstaPutnika = karta.VrstaPutnika, Stavka = tempStavka };
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("cardservicebus@gmail.com");
                message.To.Add(new MailAddress(karta.Email));
                message.Subject = "Upravo ste kupili kartu";
                //message.IsBodyHtml = true; //to make message body as html  
                //message.Body = htmlString;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("cardservicebus@gmail.com", "Web2Blok8");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
     

             _unitOfWork.Kartas.Add(kartaTemp);
            _unitOfWork.Complete();
            return CreatedAtRoute("DefaultApi", new { id =kartaTemp.Id }, karta);
            //return null;

        }


        // DELETE: api/Karta/5
        [HttpDelete]
        public void Delete(int id)
        {
            
        }
    }
}
