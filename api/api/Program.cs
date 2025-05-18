using api.Data;
using api.Data.Initializer;
using api.Models;
using api.Services;
using api.Services.Category;
using api.Services.Image;
using api.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddControllers();

// Add db context and identity
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("PostgresqlAiven"));
});

builder.Services.AddIdentity<AppUser, AppRole>(opt =>
{
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequiredLength = 6;
    opt.Password.RequireLowercase = false;
    opt.Password.RequireUppercase = false;
    opt.Password.RequireDigit = false;

    opt.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log_.log", rollingInterval: RollingInterval.Hour)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// static files
string rootPath = Path.Combine(builder.Environment.ContentRootPath, "wwwroot");
if(!Directory.Exists(rootPath))
{
    Directory.CreateDirectory(rootPath);
}

string imagesPath = Path.Combine(rootPath, "images");

if(!Directory.Exists(imagesPath))
{
    Directory.CreateDirectory(imagesPath);
    Files.ImagesPath  = imagesPath;
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagesPath),
    RequestPath = "/images"
});

app.Seed();

app.Run();
