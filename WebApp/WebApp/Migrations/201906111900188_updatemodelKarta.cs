namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatemodelKarta : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Kartas", "VrstaPutnika", c => c.String());
            AlterColumn("dbo.Kartas", "TipKarte", c => c.String());
            DropColumn("dbo.Kartas", "Ime");
            DropColumn("dbo.Kartas", "Prezime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Kartas", "Prezime", c => c.String());
            AddColumn("dbo.Kartas", "Ime", c => c.String());
            AlterColumn("dbo.Kartas", "TipKarte", c => c.Int(nullable: false));
            DropColumn("dbo.Kartas", "VrstaPutnika");
        }
    }
}
