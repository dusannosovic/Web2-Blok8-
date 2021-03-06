﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IKartaRepository Kartas { get; set; }

        ICenovnikRepository Cenovniks { get; set; }

        ILinijaRepository Linijas { get; set; }

        IStanicaRepository Stanicas { get; set; }

        IPolasciRepository Polascis { get; set; }

        ITipKarteRepository TipKartes { get; set; }

        IVrstaPutnikaRepository VrstaPutnikas { get; set; }

        IStavkaRepository Stavkas { get; set; }
        int Complete();
    }
}
