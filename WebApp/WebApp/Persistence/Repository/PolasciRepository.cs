using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PolasciRepository : Repository<Polasci, int>, IPolasciRepository
    {
        public PolasciRepository(DbContext context) : base(context)
        {
        }
    }
}