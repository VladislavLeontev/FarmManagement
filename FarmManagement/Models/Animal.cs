
using System.ComponentModel.DataAnnotations;

namespace FarmManagement.Models
{
	public class Animal
	{
        [Key]
        public string Name { get; set; }

        public AnimalType AnimalType { get; set; }
    }
}
