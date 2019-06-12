namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatemodelKarta2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Kartas", "Korisnik_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Kartas", new[] { "Korisnik_Id" });
            AddColumn("dbo.Kartas", "Korisnik", c => c.String());
            DropColumn("dbo.Kartas", "Korisnik_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Kartas", "Korisnik_Id", c => c.String(maxLength: 128));
            DropColumn("dbo.Kartas", "Korisnik");
            CreateIndex("dbo.Kartas", "Korisnik_Id");
            AddForeignKey("dbo.Kartas", "Korisnik_Id", "dbo.AspNetUsers", "Id");
        }
    }
}
