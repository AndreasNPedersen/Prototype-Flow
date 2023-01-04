using AnsoogningAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace AnsoogningAPI
{
    /// <summary>
    /// The Database context class
    /// </summary>
    public class DatabaseContext : DbContext
{
        public DbSet<TrackAdmin> TrackAdmins { get; set; }
        public DbSet<QuestionAnswer> QuestionAnswers { get; set; }
        public DbSet<CategoryQuestion> CategoryQuestions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Userdb> Userdbs { get; set; }
        public DbSet<CPR> CPRs { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }
    }
}
