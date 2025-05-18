
using api.Settings;

namespace api.Services.Image
{
    public class ImageService : IImageService
    {
        private readonly string imagesPath = Files.ImagesPath;

        public async Task<string?> SaveImageAsync(IFormFile imageFile, string path)
        {
            try
            {
                string workDirPath = Path.Combine(imagesPath, path);
                if (!Directory.Exists(workDirPath))
                {
                    Directory.CreateDirectory(workDirPath);
                }

                var types = imageFile.ContentType.Split('/');
                if (types[0] != "img")
                {
                    return null;
                }

                string imageName = $"{Guid.NewGuid().ToString()}.{types[1]}";
                string imagePath = Path.Combine(workDirPath, imageName);
                
                using(var stream = File.Create(imagePath))
                {
                    await imageFile.CopyToAsync(stream);
                }

                return imageName;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
