using api.Dto;
using api.Models;
using api.Services;
using api.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : AppController
    {
        private readonly IAccountService _accountService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger, IAccountService accountService)
            : base(logger)
        {
            _logger = logger;
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDto dto)
        {
            _logger.LogInformation($"Request data - login: {dto.UserName}. password: {dto.Password}");

            if (string.IsNullOrEmpty(dto.Password) || string.IsNullOrEmpty(dto.UserName))
            {
                string message = "Login or password is empty";
                _logger.LogInformation($"Response - status: 400 - message: {message}");
                return BadRequest(message);
            }

            var response = await _accountService.LoginAsync(dto);
            return GetActionResult(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Password) 
                || string.IsNullOrEmpty(dto.Email)
                || string.IsNullOrEmpty(dto.UserName))
            {
                string message = "Empty field";
                _logger.LogInformation($"Response - status: 400 - message: {message}");
                return BadRequest(message);
            }

            var response = await _accountService.RegisterAsync(dto);
            return GetActionResult(response);
        }
    }
}
