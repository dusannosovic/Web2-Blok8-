using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Polasci
    {
        
        public int Id { get; set; }
        public Dan Dan { get; set; }
        public DateTime VremePolaska { get; set; }
        //[ForeignKey("Linija")]
        //public Linija Linija { get; set; }
        public int Peron { get; set; }
        public virtual ICollection<Linija> Linijas { get; set; }
    }
}
