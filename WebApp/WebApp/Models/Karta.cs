using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Karta
    {
        public int Id { get; set; }
        public string TipKarte {get;set;}
        public string VrstaPutnika { get; set; }
        public DateTime DatumIzdavanja { get; set; }
        public float Cena { get; set; }

        public virtual Stavka Stavka { get; set; }
        public string Korisnik { get; set; }

        public string PayPalId { get; set; }


    }
}