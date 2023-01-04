using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnsoogningAPI.Models
{
    public class CPR
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CPRId { get; set; }
        public string Name { get; set; }
        public string SirName { get;set; }
        public DateTime Birthday { get; set; }
        public string Gender { get; set; }
        public bool GotGardian { get; set; }    
        public DateTime? GuardianStartDate { get; set; }
        public bool AddressProtection { get; set; }
        public DateTime DateForRelocation { get; set; }
        public string Address { get; set; }
        public bool CreditWarning { get; set; }
    }
}
