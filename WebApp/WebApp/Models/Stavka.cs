using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Stavka
    {
        public int Id { get; set; }
        public float? Cena { get; set; }
        public virtual ICollection<Karta> Kartas { get; set; }

        public virtual TipKarte TipKarte { get; set; }

        public virtual VrstaPutnika VrstaPutnika { get; set; }

        public virtual Cenovnik Cenovnik { get; set; }



    }
}