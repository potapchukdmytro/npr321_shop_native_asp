
using api.Models;
using api.Services.Category;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : AppController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ILogger<CategoryController> logger, ICategoryService categoryService) : base(logger)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await _categoryService.GetAllAsync());
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var res = await _categoryService.DeleteAsync(id);
            return res ? Ok() : BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Category model)
        {
            var res = await _categoryService.CreateAsync(model);
            return res ? Ok() : BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Category model)
        {
            var res = await _categoryService.UpdateAsync(model);
            return res ? Ok() : BadRequest();
        }
    }
}
