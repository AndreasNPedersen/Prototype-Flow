using AnsoogningAPI;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(x => x.AddPolicy("allowall",
    x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));
builder.Services.AddDbContext<DatabaseContext>(opt =>
                opt.UseSqlServer("Server=tcp:coopzealand.database.windows.net,1433;Initial Catalog=Coop;Persist Security Info=False;User ID=coopadmin;Password=!Zealand2022;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"));
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("allowall");
app.UseAuthorization();

app.MapControllers();

app.Run();
