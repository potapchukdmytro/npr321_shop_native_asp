using api.Dto;

namespace api.Services
{
    public interface IAccountService
    {
        Task<ServiceResponse> LoginAsync(LoginDto dto);
        Task<ServiceResponse> RegisterAsync(RegisterDto dto);
    }
}
