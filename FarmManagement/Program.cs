using FarmManagement;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
	options
		.UseInMemoryDatabase("FarmManagement")
);



var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();

app
	.UseRouting()
	.UseEndpoints(endpoints =>
	{
		endpoints.MapControllers();
		endpoints.MapDefaultControllerRoute();
	});

if (app.Environment.IsDevelopment())
{
	app.UseHsts();
	app.UseSpa(config =>
	{
		config.UseProxyToSpaDevelopmentServer("http://localhost:4200");
	});
}

await app.RunAsync();


