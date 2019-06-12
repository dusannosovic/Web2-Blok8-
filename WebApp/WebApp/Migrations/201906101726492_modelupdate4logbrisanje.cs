namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modelupdate4logbrisanje : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Linijas", "IsDelete", c => c.Boolean(nullable: false));
            AddColumn("dbo.Polascis", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Stanicas", "IsDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Stanicas", "IsDeleted");
            DropColumn("dbo.Polascis", "IsDeleted");
            DropColumn("dbo.Linijas", "IsDelete");
            DropColumn("dbo.AspNetUsers", "IsDeleted");
        }
    }
}
