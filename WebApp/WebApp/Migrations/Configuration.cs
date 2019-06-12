namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Linq;
    using WebApp.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
        {
            try
            {
                //  This method will be called after migrating to the latest version.

                //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
                //  to avoid creating duplicate seed data.

                if (!context.Roles.Any(r => r.Name == "Admin"))
                {
                    var store = new RoleStore<IdentityRole>(context);
                    var manager = new RoleManager<IdentityRole>(store);
                    var role = new IdentityRole { Name = "Admin" };

                    manager.Create(role);
                }

                if (!context.Roles.Any(r => r.Name == "Controller"))
                {
                    var store = new RoleStore<IdentityRole>(context);
                    var manager = new RoleManager<IdentityRole>(store);
                    var role = new IdentityRole { Name = "Controller" };

                    manager.Create(role);
                }

                if (!context.Roles.Any(r => r.Name == "AppUser"))
                {
                    var store = new RoleStore<IdentityRole>(context);
                    var manager = new RoleManager<IdentityRole>(store);
                    var role = new IdentityRole { Name = "AppUser" };

                    manager.Create(role);
                }

                var userStore = new UserStore<ApplicationUser>(context);
                var userManager = new UserManager<ApplicationUser>(userStore);

                if (!context.Users.Any(u => u.UserName == "admin@yahoo.com"))
                {
                    var user = new ApplicationUser() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!") };
                    userManager.Create(user);
                    userManager.AddToRole(user.Id, "Admin");
                }

                if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
                {
                    var user = new ApplicationUser() { Id = "appu", UserName = "appu@yahoo.com", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!") };
                    userManager.Create(user);
                    userManager.AddToRole(user.Id, "AppUser");
                }
                
                  //Polasci polazak1 = new Polasci() { Dan = 0, VremePolaska = new TimeSpan(12,0,0) };
                  //context.Polascis.Add(polazak1);
                  //Polasci polazak2 = new Polasci() { Dan = 0, VremePolaska = new TimeSpan(13,0,0) };
                  //context.Polascis.Add(polazak2);
                  //Polasci polazak3 = new Polasci() { Dan = 0, VremePolaska = new TimeSpan(14,0,0) };
                  //context.Polascis.Add(polazak3);
                  //Polasci polazak4 = new Polasci() { Dan = 0, VremePolaska = new TimeSpan(15,0,0 )};
                  //context.Polascis.Add(polazak4);
                 /* Linija linija = new Linija() { OznakaLinije = "liniaj3", Polascis = new List<Polasci> { polazak1,polazak2,polazak3,polazak4}, TipLinije = TipLin.Gradska};

                  context.Linijas.Add(linija);
                  context.SaveChanges();*/
                //Cenovnik cenovnik = new Cenovnik() { Valid = true, StartTime = DateTime.Now };
                //context.Cenovniks.Add(cenovnik);
                context.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }
    }
}
