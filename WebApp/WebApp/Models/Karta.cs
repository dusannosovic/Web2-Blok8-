using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Karta
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public TipKar TipKarte {get;set;}
        public DateTime DatumIzdavanja { get; set; }
        //public float Cena { get; set; }

        public virtual Stavka Stavka { get; set; }

    }
}