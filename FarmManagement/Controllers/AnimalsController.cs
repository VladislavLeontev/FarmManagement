using FarmManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FarmManagement.Controllers
{
	// I could've used DTOs for communication. But since the whole app is so simple, I decided to use the db model directly.
	// Otherwise it would be wise not to expose the db model directly.

	[ApiController]
	[Route("api/[controller]")]
	public class AnimalsController : ControllerBase
	{
		private readonly AppDbContext _db;

		public AnimalsController(AppDbContext db)
		{
			_db = db;
		}

		[HttpGet]
		public async Task<IActionResult> GetAsync()
		{
			var list = await _db.Animals.ToListAsync();
			return Ok(list);
		}

		[HttpGet("{name}")]
		public async Task<IActionResult> GetAsync(string name)
		{
			var animal = await _db.Animals.FindAsync(name);
			if (animal == null)
			{
				return NotFound();
			}

			return Ok(animal);
		}

		[HttpPost]
		public async Task<IActionResult> PostAsync(Animal animal)
		{
			var exists = await _db.Animals.AnyAsync(a => a.Name == animal.Name);
			if (exists)
			{
				return Conflict();
			}

			_db.Animals.Add(animal);
			await _db.SaveChangesAsync();
			return CreatedAtAction(nameof(GetAsync), new { name = animal.Name }, animal);
		}

		[HttpDelete("{name}")]
		public async Task<IActionResult> DeleteAsync(string name)
		{
			var animal = _db.Animals.Find(name);
			if (animal == null)
			{
				return Ok();
			}

			_db.Animals.Remove(animal);
			await _db.SaveChangesAsync();
			return Ok();
		}
	}
}
