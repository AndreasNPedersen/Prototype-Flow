using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnsoogningAPI.Models
{
    public class Answer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AnswerId { get; set; }
        [Required]
        public string TheAnswer { get; set; }
        [Required]
        public string InputType { get; set; }
        //No foreign key because the last question should go to the end / show all
        //selectable in UI from all questions
        public int ToQuestion { get; set; }
        public DateTime CreatedDate { get; set; }

        public DateTime LastModifiedDate { get; set; }
    }
}
