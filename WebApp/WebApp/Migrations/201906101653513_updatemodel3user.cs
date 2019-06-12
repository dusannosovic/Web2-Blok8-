namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatemodel3user : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Kartas", "Cena", c => c.Single(nullable: false));
            AddColumn("dbo.Kartas", "Korisnik_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.AspNetUsers", "Firstname", c => c.String());
            AddColumn("dbo.AspNetUsers", "Secondname", c => c.String());
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "DateOFBirth", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "UserType", c => c.String());
            AddColumn("dbo.AspNetUsers", "ImgUrl", c => c.String());
            AddColumn("dbo.AspNetUsers", "IsVerified", c => c.Boolean(nullable: false));
            CreateIndex("dbo.Kartas", "Korisnik_Id");
            AddForeignKey("dbo.Kartas", "Korisnik_Id", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Kartas", "Korisnik_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Kartas", new[] { "Korisnik_Id" });
            DropColumn("dbo.AspNetUsers", "IsVerified");
            DropColumn("dbo.AspNetUsers", "ImgUrl");
            DropColumn("dbo.AspNetUsers", "UserType");
            DropColumn("dbo.AspNetUsers", "DateOFBirth");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "Secondname");
            DropColumn("dbo.AspNetUsers", "Firstname");
            DropColumn("dbo.Kartas", "Korisnik_Id");
            DropColumn("dbo.Kartas", "Cena");
        }
    }
}
