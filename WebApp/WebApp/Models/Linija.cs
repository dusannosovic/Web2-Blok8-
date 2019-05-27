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


    }
}