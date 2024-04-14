using System.Text.Json.Serialization;
using System.Text.Json;
var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
	options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
	app.UseSpa(config =>
	{
		config.UseProxyToSpaDevelopmentServer("http://localhost:4200");
	});
}
app.Run();


[JsonSerializable(typeof(string))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}



