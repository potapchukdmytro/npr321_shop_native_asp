using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Category
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        [MaxLength(255)]
        public required string Name { get; set; }
        [MaxLength(255)]
        public string? Image { get; set; }
    }
}
