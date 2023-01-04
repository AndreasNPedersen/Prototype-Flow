using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AnsoogningAPI.Models
{
    public class QuestionAnswer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuestionAnswerId { get; set; }
        [DeleteBehavior(DeleteBehavior.Cascade)]
        public virtual Question Question { get; set; }

        public virtual Answer Answer { get; set; }
    }
}
