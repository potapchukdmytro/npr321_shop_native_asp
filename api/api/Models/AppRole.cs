using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppRole : IdentityRole
    {
        public virtual ICollection<AppUserRole> UserRoles { get; set; } = [];
    }
}
