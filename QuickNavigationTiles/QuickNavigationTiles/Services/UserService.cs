using QuickNavigationTiles.Models.Device;
using QuickNavigationTiles.Models.Login;
using QuickNavigationTiles.Models.Registration;
using QuickNavigationTiles.Models.Session;
using QuickNavigationTiles.Models.User;
using QuickNavigationTiles.Repositories.Interfaces;
using QuickNavigationTiles.Services.Interfaces;
using QuickNavigationTiles.Utility.Password;

namespace QuickNavigationTiles.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDto?> GetUser(Guid userId)
        {
            return await _userRepository.GetUser(userId);
        }

        public async Task<(bool, Guid)> RegisterUser(RegistrationInputs registrationInputs)
        {
            if (
                registrationInputs == null ||
                registrationInputs.Username == null ||
                registrationInputs.Password == null
            ) { return (false, Guid.Empty); }

            string passwordSalt = SaltGenerator.Generate();
            string passwordHash = HashGenerator.Compute(registrationInputs.Password, passwordSalt);

            RegistrationRequest registrationRequest = new RegistrationRequest()
            {
                UserId = Guid.NewGuid(),
                Username = registrationInputs.Username,
                Password = passwordHash,
                Salt = passwordSalt
            };

            return (await _userRepository.RegisterUser(registrationRequest), registrationRequest.UserId);
        }

        public async Task<LoginDto> GetUserLoginInformation(string loginCredential)
        {
            return await _userRepository.GetUserLoginInfo(loginCredential);
        }

        public async Task<bool> InsertDevice(Guid userId, string userAgent, string ipAddress)
        {
            DeviceInsertRequest deviceInsertRequest = new DeviceInsertRequest()
            {
                UserDeviceId = Guid.NewGuid(),
                UserId = userId,
                UserAgent = userAgent,
                IpAddress = ipAddress
            };

            return await _userRepository.InsertDevice(deviceInsertRequest);
        }

        public async Task<DeviceInfoDto?> GetOrInsertUserDeviceInfo(Guid userId, string userAgent, string ipAddress)
        {
            DeviceInfoDto? deviceInfoDto = await _userRepository.GetUserDeviceInfo(userId, userAgent, ipAddress);

            if (deviceInfoDto == null)
            {
                DeviceInsertRequest deviceInsertRequest = new DeviceInsertRequest()
                {
                    UserDeviceId = Guid.NewGuid(),
                    UserId = userId,
                    UserAgent = userAgent,
                    IpAddress = ipAddress
                };

                if (await _userRepository.InsertDevice(deviceInsertRequest))
                {
                    deviceInfoDto = new DeviceInfoDto()
                    {
                        UserDeviceId = deviceInsertRequest.UserDeviceId,
                        UserId = userId,
                        UserAgent = userAgent,
                        IpAddress = ipAddress
                    };
                }
            }

            return deviceInfoDto;
        }

        public async Task<SessionDto?> GetActiveSession(Guid userId, Guid deviceId)
        {
            return await _userRepository.GetActiveSession(userId, deviceId);
        }

        public async Task<SessionDto?> GetSessionById(Guid sessionId)
        {
            return await _userRepository.GetSessionById(sessionId);
        }

        public async Task<bool> InvalidateAllUserSessionsForDevice(Guid userId, Guid userDeviceId)
        {
            return await _userRepository.InvalidateAllUserSessionsForDevice(userId, userDeviceId);
        }

        public async Task<bool> InvalidateUserSession(Guid userId, Guid userDeviceId, Guid sessionId)
        {
            return await _userRepository.InvalidateUserSession(userId, userDeviceId, sessionId);
        }

        public async Task<SessionDto?> InsertSession(Guid userId, Guid userDeviceId)
        {
            SessionInsertRequest sessionInsertRequest = new SessionInsertRequest()
            {
                SessionId = Guid.NewGuid(),
                UserId = userId,
                UserDeviceId = userDeviceId,
                CreationDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMinutes(1),
                Active = true
            };

            if (await _userRepository.InsertSession(sessionInsertRequest))
            {
                return new SessionDto()
                {
                    SessionId = sessionInsertRequest.SessionId,
                    UserId = sessionInsertRequest.UserId,
                    UserDeviceId = sessionInsertRequest.UserDeviceId,
                    CreationDate = sessionInsertRequest.CreationDate,
                    ExpiryDate = sessionInsertRequest.ExpiryDate,
                    Active = sessionInsertRequest.Active
                };
            }

            return null;
        }
    }
}
