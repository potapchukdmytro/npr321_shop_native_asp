namespace api.Dto
{
    public class CategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public IFormFile? Image { get; set; }
    }
}
