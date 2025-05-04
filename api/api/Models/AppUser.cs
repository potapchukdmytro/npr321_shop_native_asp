using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; } = [];
        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; } = [];
        public virtual ICollection<IdentityUserToken<string>> Tokens { get; set; } = [];
        public virtual ICollection<AppUserRole> UserRoles { get; set; } = [];
    }
}
