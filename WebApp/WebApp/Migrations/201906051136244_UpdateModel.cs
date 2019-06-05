namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Cenovniks", "EndDate", c => c.DateTime());
            AlterColumn("dbo.Stavkas", "Cena", c => c.Single());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Stavkas", "Cena", c => c.Single(nullable: false));
            AlterColumn("dbo.Cenovniks", "EndDate", c => c.DateTime(nullable: false));
        }
    }
}
