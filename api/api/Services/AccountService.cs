using api.Controllers;
using api.Dto;
using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<AccountService> _logger;

        public AccountService(UserManager<AppUser> userManager, ILogger<AccountService> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<ServiceResponse> LoginAsync(LoginDto dto)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.NormalizedUserName == dto.UserName.ToUpper()
                || u.NormalizedEmail == dto.UserName.ToUpper());

            if (user == null)
            {
                return ServiceResponse.GetError("Incorrect login");
            }

            var passResult = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (user == null)
            {
                return ServiceResponse.GetError("Incorrect password");
            }

            var userDto = new UserDto { UserName = user.UserName, Email = user.Email };
            return ServiceResponse.GetSuccess("Login success", userDto);
        }

        public async Task<ServiceResponse> RegisterAsync(RegisterDto dto)
        {
            var user = new AppUser { UserName = dto.UserName, Email = dto.Email };
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Constants.RoleUser);
                return ServiceResponse.GetSuccess("Register success");
            }
            else
            {
                return ServiceResponse.GetError(result.Errors.First().Description);
            }
        }
    }
}
