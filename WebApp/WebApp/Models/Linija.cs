using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Linija
    {
        public TipLin TipLinije { get; set; }
        [Key]
        public string OznakaLinije { get; set; }

        public bool IsDelete { get; set; }

        public virtual ICollection<Stanica> Stanicas { get; set; }
        public virtual ICollection<Polasci> Polascis { get; set; }

        public virtual ICollection<Vozilo> Vozilos { get; set; }
    }
}