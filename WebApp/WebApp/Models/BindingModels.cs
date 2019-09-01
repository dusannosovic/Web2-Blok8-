using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class MarkerInfo
    {
        public int id { get; set; }
        public string title { get; set; }
        public string label { get; set; }
        public GeoLocation location { get; set; }

        public int Verzija { get; set; }


        
    }
    public class GeoLocation
    {
        public double latitude { get; set; }
        public double longitude { get; set; }
    }
    public class LinijaBinding
    {
        public TipLin TipLinije { get; set; }
        
        public string OznakaLinije { get; set; }

        public int Verzija { get; set; }
    }
    public class PolazakBinding
    {
        public int Id { get; set; }
        public Dan Dan { get; set; }
        public string VremePolaska { get; set; }
    }
    public class StavkaBinding
    {
        public int Id { get; set; }
        public string TipKarte { get; set; }
        public string TipPopusta { get; set; }
        public float Cena { get; set; }
    }
    public class LinijaPolasciBinding
    {
        public LinijaBinding Linija { get; set; }
        public PolazakBinding[] Polasci { get; set; }

        public MarkerInfo[] Stanice { get; set; }
    }
    public class KartaBinding
    {
        public string Username { get; set; }
        public float Cena { get; set; }
        public string VrstaPutnika { get; set; }
        public string TipKarte { get; set; }
        public string Email { get; set; }
        public string PayId { get; set; }
    }
    public class TipKarteBinding
    {
        public string Tip { get; set; }
        public float Cena { get; set; }
    }
    public class ValidateUserBindingModel
    {
        public string Username { get; set; }
        public string Status { get; set; }
    }
}