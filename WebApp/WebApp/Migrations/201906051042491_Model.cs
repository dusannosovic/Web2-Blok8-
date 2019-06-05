namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Model : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cenovniks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Valid = c.Boolean(nullable: false),
                        StartTime = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Stavkas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Cena = c.Single(nullable: false),
                        Cenovnik_Id = c.Int(),
                        TipKarte_Tip = c.String(maxLength: 128),
                        VrstaPutnika_Naziv = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cenovniks", t => t.Cenovnik_Id)
                .ForeignKey("dbo.TipKartes", t => t.TipKarte_Tip)
                .ForeignKey("dbo.VrstaPutnikas", t => t.VrstaPutnika_Naziv)
                .Index(t => t.Cenovnik_Id)
                .Index(t => t.TipKarte_Tip)
                .Index(t => t.VrstaPutnika_Naziv);
            
            CreateTable(
                "dbo.Kartas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Ime = c.String(),
                        Prezime = c.String(),
                        TipKarte = c.Int(nullable: false),
                        DatumIzdavanja = c.DateTime(nullable: false),
                        Stavka_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Stavkas", t => t.Stavka_Id)
                .Index(t => t.Stavka_Id);
            
            CreateTable(
                "dbo.TipKartes",
                c => new
                    {
                        Tip = c.String(nullable: false, maxLength: 128),
                        Cena = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Tip);
            
            CreateTable(
                "dbo.VrstaPutnikas",
                c => new
                    {
                        Naziv = c.String(nullable: false, maxLength: 128),
                        Koeficijent = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Naziv);
            
            CreateTable(
                "dbo.Linijas",
                c => new
                    {
                        OznakaLinije = c.String(nullable: false, maxLength: 128),
                        TipLinije = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.OznakaLinije);
            
            CreateTable(
                "dbo.Polascis",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Dan = c.Int(nullable: false),
                        VremePolaska = c.DateTime(nullable: false),
                        Peron = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Stanicas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Naziv = c.String(),
                        X = c.Double(nullable: false),
                        Y = c.Double(nullable: false),
                        Adresa = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Voziloes",
                c => new
                    {
                        Registracija = c.String(nullable: false, maxLength: 128),
                        BrojMesta = c.Int(nullable: false),
                        Linija_OznakaLinije = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Registracija)
                .ForeignKey("dbo.Linijas", t => t.Linija_OznakaLinije)
                .Index(t => t.Linija_OznakaLinije);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PolasciLinijas",
                c => new
                    {
                        Polasci_Id = c.Int(nullable: false),
                        Linija_OznakaLinije = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Polasci_Id, t.Linija_OznakaLinije })
                .ForeignKey("dbo.Polascis", t => t.Polasci_Id, cascadeDelete: true)
                .ForeignKey("dbo.Linijas", t => t.Linija_OznakaLinije, cascadeDelete: true)
                .Index(t => t.Polasci_Id)
                .Index(t => t.Linija_OznakaLinije);
            
            CreateTable(
                "dbo.StanicaLinijas",
                c => new
                    {
                        Stanica_Id = c.Int(nullable: false),
                        Linija_OznakaLinije = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Stanica_Id, t.Linija_OznakaLinije })
                .ForeignKey("dbo.Stanicas", t => t.Stanica_Id, cascadeDelete: true)
                .ForeignKey("dbo.Linijas", t => t.Linija_OznakaLinije, cascadeDelete: true)
                .Index(t => t.Stanica_Id)
                .Index(t => t.Linija_OznakaLinije);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Voziloes", "Linija_OznakaLinije", "dbo.Linijas");
            DropForeignKey("dbo.StanicaLinijas", "Linija_OznakaLinije", "dbo.Linijas");
            DropForeignKey("dbo.StanicaLinijas", "Stanica_Id", "dbo.Stanicas");
            DropForeignKey("dbo.PolasciLinijas", "Linija_OznakaLinije", "dbo.Linijas");
            DropForeignKey("dbo.PolasciLinijas", "Polasci_Id", "dbo.Polascis");
            DropForeignKey("dbo.Stavkas", "VrstaPutnika_Naziv", "dbo.VrstaPutnikas");
            DropForeignKey("dbo.Stavkas", "TipKarte_Tip", "dbo.TipKartes");
            DropForeignKey("dbo.Kartas", "Stavka_Id", "dbo.Stavkas");
            DropForeignKey("dbo.Stavkas", "Cenovnik_Id", "dbo.Cenovniks");
            DropIndex("dbo.StanicaLinijas", new[] { "Linija_OznakaLinije" });
            DropIndex("dbo.StanicaLinijas", new[] { "Stanica_Id" });
            DropIndex("dbo.PolasciLinijas", new[] { "Linija_OznakaLinije" });
            DropIndex("dbo.PolasciLinijas", new[] { "Polasci_Id" });
            DropIndex("dbo.Voziloes", new[] { "Linija_OznakaLinije" });
            DropIndex("dbo.Kartas", new[] { "Stavka_Id" });
            DropIndex("dbo.Stavkas", new[] { "VrstaPutnika_Naziv" });
            DropIndex("dbo.Stavkas", new[] { "TipKarte_Tip" });
            DropIndex("dbo.Stavkas", new[] { "Cenovnik_Id" });
            DropTable("dbo.StanicaLinijas");
            DropTable("dbo.PolasciLinijas");
            DropTable("dbo.Products");
            DropTable("dbo.Voziloes");
            DropTable("dbo.Stanicas");
            DropTable("dbo.Polascis");
            DropTable("dbo.Linijas");
            DropTable("dbo.VrstaPutnikas");
            DropTable("dbo.TipKartes");
            DropTable("dbo.Kartas");
            DropTable("dbo.Stavkas");
            DropTable("dbo.Cenovniks");
        }
    }
}
