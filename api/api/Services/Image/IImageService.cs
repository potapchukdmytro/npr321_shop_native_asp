﻿namespace api.Services.Image
{
    public interface IImageService
    {
        Task<string?> SaveImageAsync(IFormFile imageFile, string path);
    }
}
