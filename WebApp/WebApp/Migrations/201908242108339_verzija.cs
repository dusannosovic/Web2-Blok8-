namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class verzija : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Linijas", "Verzija", c => c.Int(nullable: false));
            AddColumn("dbo.Stanicas", "Verzija", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Stanicas", "Verzija");
            DropColumn("dbo.Linijas", "Verzija");
        }
    }
}
