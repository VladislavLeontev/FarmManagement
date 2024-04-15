using FarmManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace FarmManagement
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		public DbSet<Animal> Animals { get; set; }
    }
}
