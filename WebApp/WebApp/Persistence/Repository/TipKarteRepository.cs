using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TipKarteRepository : Repository<TipKarte, string>, ITipKarteRepository
    {
        public TipKarteRepository(DbContext context) : base(context)
        {
        }
    }
}