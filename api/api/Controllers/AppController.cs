using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class AppController : ControllerBase
    {
        private readonly ILogger<AppController> _logger;

        public AppController(ILogger<AppController> logger)
        {
            _logger = logger;
        }

        protected IActionResult GetActionResult(ServiceResponse response)
        {
            if (response.Success)
            {
                _logger.LogInformation($"Response - status: 200; message: {response.Message}");
                return Ok(response);
            }
            else
            {
                _logger.LogInformation($"Response - status: 400; message: {response.Message}");
                return BadRequest(response);
            }
        }
    }
}
