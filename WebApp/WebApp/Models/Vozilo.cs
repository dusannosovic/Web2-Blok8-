using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Vozilo
    {
        [Key]
        public string Registracija { get; set; }

        public int BrojMesta { get; set; }

        //public double X { get; set; }
        //public double Y { get; set; }

        public virtual Linija Linija { get; set; }
        
    }
}