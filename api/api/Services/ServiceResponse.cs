namespace api.Services
{
    public class ServiceResponse
    {
        public string Message { get; set; } = string.Empty;
        public bool Success { get; set; }
        public object? Payload { get; set; }

        public static ServiceResponse GetSuccess(string message, object? payload = null)
        {
            return new ServiceResponse { Message = message, Success = true, Payload = payload };
        }

        public static ServiceResponse GetError(string message, object? payload = null)
        {
            return new ServiceResponse { Message = message, Success = false, Payload = payload };
        }
    }
}
