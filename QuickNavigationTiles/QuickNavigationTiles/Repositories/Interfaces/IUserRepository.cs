using QuickNavigationTiles.Models.Device;
using QuickNavigationTiles.Models.Login;
using QuickNavigationTiles.Models.Registration;
using QuickNavigationTiles.Models.Session;
using QuickNavigationTiles.Models.User;

namespace QuickNavigationTiles.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<UserDto?> GetUser(Guid userId);

        Task<bool> RegisterUser(RegistrationRequest request);

        Task<LoginDto> GetUserLoginInfo(string username);

        Task<bool> InsertDevice(DeviceInsertRequest deviceInsertRequest);

        Task<DeviceInfoDto?> GetUserDeviceInfo(Guid userId, string userAgent, string ipAddress);

        Task<SessionDto?> GetActiveSession(Guid userId, Guid deviceId);

        Task<SessionDto?> GetSessionById(Guid sessionId);

        Task<bool> InvalidateAllUserSessionsForDevice(Guid userId, Guid userDeviceId);

        Task<bool> InvalidateUserSession(Guid userId, Guid userDeviceId, Guid sessionId);

        Task<bool> InsertSession(SessionInsertRequest sessionInsertRequest);
    }
}
