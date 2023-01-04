using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnsoogningAPI.Models
{
    public class TrackAdmin
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public virtual Userdb UpdatedBy { get; set; }
        public Question? Question { get; set; }
        public Category? Category { get; set; }

    }
}
