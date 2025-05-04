using api.Dto;
using api.Models;
using api.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<AccountController> _logger;

        public AccountController(UserManager<AppUser> userManager, ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDto dto)
        {
            _logger.LogInformation($"Request data - login: {dto.UserName}. password: {dto.Password}");

            if (string.IsNullOrEmpty(dto.Password) || string.IsNullOrEmpty(dto.UserName))
            {
                return BadRequest("Login or password is empty");
            }

            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.NormalizedUserName == dto.UserName.ToUpper()
                || u.NormalizedEmail == dto.UserName.ToUpper());

            if (user == null) 
            {
                _logger.LogInformation($"User null");
                return BadRequest("Incorrect login");
            }

            var passResult = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (user == null)
            {
                _logger.LogInformation($"Incorrect password");
                return BadRequest("Incorrect password");
            }

            var userDto = new UserDto { UserName = user.UserName, Email = user.Email };
            return Ok(userDto);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Password) 
                || string.IsNullOrEmpty(dto.Email)
                || string.IsNullOrEmpty(dto.UserName))
            {
                return BadRequest("Empty field");
            }

            var user = new AppUser { UserName = dto.UserName, Email = dto.Email };
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Constants.RoleUser);
                return Ok("Register success");
            }
            else
            {
                return BadRequest(result.Errors.First().Description);
            }
        }
    }
}
