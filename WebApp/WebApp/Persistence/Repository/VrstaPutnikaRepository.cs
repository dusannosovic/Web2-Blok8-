using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class VrstaPutnikaRepository : Repository<VrstaPutnika, string>, IVrstaPutnikaRepository
    {
        public VrstaPutnikaRepository(DbContext context) : base(context)
        {
        }
    }
}