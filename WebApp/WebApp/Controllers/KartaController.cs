using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
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

                kartaTemp = new Karta() { Cena = karta.Cena, DatumIzdavanja = DateTime.Now, TipKarte = karta.TipKarte, VrstaPutnika = karta.VrstaPutnika, Korisnik = karta.Username, Stavka = tempStavka, PayPalId = karta.PayId };
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
                kartaTemp = new Karta() { Cena = karta.Cena, DatumIzdavanja = DateTime.Now, TipKarte = karta.TipKarte, VrstaPutnika = karta.VrstaPutnika, Stavka = tempStavka, PayPalId = karta.PayId };
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("cardservicebus@gmail.com");
                message.To.Add(new MailAddress(karta.Email));
                message.Subject = "Hvala sto ste kupili kartu";
                message.Body = $"KARTA {Environment.NewLine} Cena: {karta.Cena} {Environment.NewLine} Datum izdavanja: {kartaTemp.DatumIzdavanja} {Environment.NewLine} Tip Karte: {kartaTemp.TipKarte} {Environment.NewLine} Vrsta popusta: {karta.VrstaPutnika}";
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
        [HttpGet]
        [Route("api/Karta/Validate")]
        public string Validate(int ID)
        {
            StringBuilder result = new StringBuilder("");

            Karta karta = _unitOfWork.Kartas.GetAll().FirstOrDefault(k => k.Id == ID);
            if (karta == null)
            {
                result.Append("Karta je nepostojeca.");
                return result.ToString();
            }
            else if (!ProveriKartu(karta))
            {
                result.Append("Karta je nevazeca.");
            }
            else
            {
                result.Append("Karta je vazeca.");
            }

            result.Append($"ID:{ID};");
            result.Append($"Datum i vreme izdavanja:{karta.DatumIzdavanja.ToString()};");
            result.Append($"Korisnik na koga se odnosi: {karta.Korisnik};");
            result.Append($"Tip karte: {karta.TipKarte.ToString()};");
            result.Append($"Vrsta karte: {karta.VrstaPutnika.ToString()};");
            result.Append($"Cena: {karta.Cena.ToString()}");

            return result.ToString();
        }
        private bool ProveriKartu(Karta karta)
        {
            bool res = true;
            switch (karta.TipKarte)
            {
                case "Vremenska":
                    if ((DateTime.Now - karta.DatumIzdavanja).TotalMinutes > 60)
                    {
                        res = false;
                    }
                    break;
                case "Dnevna":
                    if (karta.DatumIzdavanja.Day != DateTime.Now.Day)
                    {
                        res = false;
                    }
                    break;
                case "Mesecna":
                    if (karta.DatumIzdavanja.Month != DateTime.Now.Month)
                    {
                        res = false;
                    }
                    break;
                case "Godisnja":
                    if (karta.DatumIzdavanja.Year != DateTime.Now.Year)
                    {
                        res = false;
                    }
                    break;
                default:
                    break;
            }

            return res;
        }

        // DELETE: api/Karta/5
        [HttpDelete]
        public void Delete(int id)
        {
            
        }
    }
}
