using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Initializer
{
    public static class Seeder
    {
        public static async void Seed(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var userManger = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

            await context.Database.MigrateAsync();

            if (!await roleManager.RoleExistsAsync(Constants.RoleAdmin))
            {
                var adminRole = new AppRole { Name = Constants.RoleAdmin };
                await roleManager.CreateAsync(adminRole);
            }

            if (!await roleManager.RoleExistsAsync(Constants.RoleUser))
            {
                var userRole = new AppRole { Name = Constants.RoleUser };
                await roleManager.CreateAsync(userRole);
            }

            if(await userManger.FindByNameAsync("admin") == null)
            {
                var admin = new AppUser
                {
                    Email = "admin@gmail.com",
                    EmailConfirmed = true,
                    UserName = "admin"
                };

                await userManger.CreateAsync(admin, "qwerty");
                await userManger.AddToRoleAsync(admin, Constants.RoleAdmin);
            }

            if (await userManger.FindByNameAsync("user") == null)
            {
                var user = new AppUser
                {
                    Email = "user@gmail.com",
                    EmailConfirmed = true,
                    UserName = "user"
                };

                await userManger.CreateAsync(user, "qwerty");
                await userManger.AddToRoleAsync(user, Constants.RoleUser);
            }
        }
    }
}
