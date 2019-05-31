using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using WebApp.Models;
using System.Data.Entity;

namespace WebApp.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> Products { get; set; }

        public DbSet<Cenovnik> Cenovniks { get; set; }

        public DbSet<Karta> Kartas { get; set; }

        public DbSet<Linija> Linijas { get; set; }

        public DbSet<Polasci> Polascis { get; set; }

        public DbSet<Stanica> Stanicas { get; set; }
        public DbSet<Stavka> Stavkas { get; set; }

        public DbSet<TipKarte> TipKartes { get; set; }

        public DbSet<Vozilo> Vozilos { get; set; }
        public DbSet<VrstaPutnika> VrstaPutnikas { get; set; }

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}