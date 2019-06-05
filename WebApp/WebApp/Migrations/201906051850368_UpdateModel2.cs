namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateModel2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Polascis", "VremePolaska", c => c.Time(nullable: false, precision: 7));
            DropColumn("dbo.Polascis", "Peron");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Polascis", "Peron", c => c.Int(nullable: false));
            AlterColumn("dbo.Polascis", "VremePolaska", c => c.DateTime(nullable: false));
        }
    }
}
