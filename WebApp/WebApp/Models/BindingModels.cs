using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class MarkerInfo
    {

        GeoLocation location { get; set; }
        string title { get; set; }
        string label { get; set; }
        
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
    }
}