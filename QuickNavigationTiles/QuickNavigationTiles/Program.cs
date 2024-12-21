using QuickNavigationTiles.Factories;
using QuickNavigationTiles.Factories.Interfaces;
using QuickNavigationTiles.Repositories;
using QuickNavigationTiles.Repositories.Interfaces;
using QuickNavigationTiles.Services;
using QuickNavigationTiles.Services.Interfaces;

namespace QuickNavigationTiles
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            builder.Host.ConfigureServices((HostBuilderContext context, IServiceCollection services) =>
            {
                services.AddScoped<IDatabaseConnectionFactory, DatabaseConnectionFactory>();
                services.AddScoped<IUserRepository, UserRepository>();
                services.AddScoped<IUserService, UserService>();
            });

            var app = builder.Build();

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseCors("AllowOrigin");

            app.MapControllers();

            app.Run();
        }
    }
}
