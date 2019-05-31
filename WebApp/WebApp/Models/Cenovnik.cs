using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Cenovnik
    {
        public int Id { get; set; }

        public DateTime StartTime{get;set;}

        public DateTime EndDate { get; set; }

        public virtual ICollection<Stavka> Stavka { get; set; }
    }
}