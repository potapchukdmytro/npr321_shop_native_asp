
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Category
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateAsync(Models.Category model)
        {
            model.Id = Guid.NewGuid().ToString();
            await _context.Categories.AddAsync(model);
            var res = await _context.SaveChangesAsync();
            return res != 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var model = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (model != null)
            {
                _context.Categories.Remove(model);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<List<Models.Category>> GetAllAsync()
        {
            return await _context.Categories.AsNoTracking().ToListAsync();
        }

        public async Task<bool> UpdateAsync(Models.Category model)
        {
            _context.Categories.Update(model);
            var res = await _context.SaveChangesAsync();
            return res != 0;
        }
    }
}
