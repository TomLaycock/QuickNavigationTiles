using QuickNavigationTiles.Models.Device;
using QuickNavigationTiles.Models.Login;
using QuickNavigationTiles.Models.Registration;
using QuickNavigationTiles.Models.Session;
using QuickNavigationTiles.Models.User;

namespace QuickNavigationTiles.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto?> GetUser(Guid userId);

        Task<(bool, Guid)> RegisterUser(RegistrationInputs registrationInputs);

        Task<LoginDto> GetUserLoginInformation(string loginCredential);

        Task<bool> InsertDevice(Guid userId, string userAgent, string ipAddress);

        Task<DeviceInfoDto?> GetOrInsertUserDeviceInfo(Guid userId, string userAgent, string ipAddress);

        Task<SessionDto?> GetActiveSession(Guid userId, Guid deviceId);

        Task<SessionDto?> GetSessionById(Guid sessionId);

        Task<bool> InvalidateAllUserSessionsForDevice(Guid userId, Guid userDeviceId);

        Task<bool> InvalidateUserSession(Guid userId, Guid userDeviceId, Guid sessionId);

        Task<SessionDto?> InsertSession(Guid userId, Guid userDeviceId);
    }
}
