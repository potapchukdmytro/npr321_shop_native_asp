namespace api.Services.Category
{
    public interface ICategoryService
    {
        public Task<List<Models.Category>> GetAllAsync();
        public Task<bool> CreateAsync(Models.Category model);
        public Task<bool> UpdateAsync(Models.Category model);
        public Task<bool> DeleteAsync(string id);
    }
}
