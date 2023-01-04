using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AnsoogningAPI.Models
{
    public class CategoryQuestion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryQuestionId { get; set; }
        public virtual Question Question { get; set; }
        public virtual Category Category { get; set; }
        [Required]
        public int QueueNumber { get; set; }
    }
}
