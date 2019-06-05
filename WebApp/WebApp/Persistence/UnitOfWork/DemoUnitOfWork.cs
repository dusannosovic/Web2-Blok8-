using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using Unity;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public class DemoUnitOfWork : IUnitOfWork
    {
        [Dependency]
        public ICenovnikRepository Cenovniks { get; set; }
        [Dependency]
        public IKartaRepository Kartas { get; set; }
        [Dependency]
        public IStanicaRepository Stanicas { get; set; }
        [Dependency]
        public ILinijaRepository Linijas { get; set; }
        [Dependency]
        public IPolasciRepository Polascis { get; set; }
        [Dependency]
        public ITipKarteRepository TipKartes { get; set; }
        [Dependency]
        public IVrstaPutnikaRepository VrstaPutnikas { get; set; }
        [Dependency]
        public IStavkaRepository Stavkas { get; set; }
       
        private readonly DbContext _context;

      
        public DemoUnitOfWork(DbContext context)
        {
            _context = context;
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}