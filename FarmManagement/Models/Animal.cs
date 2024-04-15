
using System.ComponentModel.DataAnnotations;

namespace FarmManagement.Models
{
	public class Animal
	{
        [Key]
        public string Name { get; set; }

        public string Type { get; set; }
    }
}
