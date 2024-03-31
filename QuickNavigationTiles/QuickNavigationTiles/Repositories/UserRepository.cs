using Dapper;
using QuickNavigationTiles.Factories.Interfaces;
using QuickNavigationTiles.Models.Device;
using QuickNavigationTiles.Models.Login;
using QuickNavigationTiles.Models.Registration;
using QuickNavigationTiles.Models.Session;
using QuickNavigationTiles.Models.User;
using QuickNavigationTiles.Repositories.Interfaces;
using System.Data;

namespace QuickNavigationTiles.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDatabaseConnectionFactory _databaseConnectionFactory;

        public UserRepository(IDatabaseConnectionFactory databaseConnectionFactory)
        {
            _databaseConnectionFactory = databaseConnectionFactory;
        }

        public async Task<UserDto?> GetUser(Guid userId)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("UserId", userId, DbType.Guid, ParameterDirection.Input);

                return await conn.QuerySingleAsync<UserDto>("[QuickNavigationTiles].[dbo].[usp_GetUser]", dynamicParameters, commandTimeout: 30, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<bool> RegisterUser(RegistrationRequest request)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("UserId", request.UserId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("Username", request.Username, DbType.String, ParameterDirection.Input);
                dynamicParameters.Add("Password", request.Password, DbType.String, ParameterDirection.Input);
                dynamicParameters.Add("Salt", request.Salt, DbType.String, ParameterDirection.Input);

                await conn.ExecuteAsync("[QuickNavigationTiles].[dbo].[usp_RegisterUser]", dynamicParameters, commandTimeout: 30, commandType: CommandType.StoredProcedure);
            }

            return true;
        }

        public async Task<LoginDto> GetUserLoginInfo(string username)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                string query = @$"SELECT UserId, Username, Password, Salt FROM [QuickNavigationTiles].[dbo].[Users] (NOLOCK) WHERE Username = '{username}'";

                return await conn.QuerySingleAsync<LoginDto>(query, commandTimeout: 30, commandType: CommandType.Text);
            }
        }

        public async Task<bool> InsertDevice(DeviceInsertRequest deviceInsertRequest)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("UserDeviceId", deviceInsertRequest.UserDeviceId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("UserId", deviceInsertRequest.UserId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("UserAgent", deviceInsertRequest.UserAgent, DbType.String, ParameterDirection.Input);
                dynamicParameters.Add("IpAddress", deviceInsertRequest.IpAddress, DbType.String, ParameterDirection.Input);

                await conn.ExecuteAsync("[QuickNavigationTiles].[dbo].[usp_InsertDevice]", dynamicParameters, commandTimeout: 30, commandType: CommandType.StoredProcedure);
            }

            return true;
        }

        public async Task<DeviceInfoDto?> GetUserDeviceInfo(Guid userId, string userAgent, string ipAddress)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                string query = @$"SELECT UserDeviceId, UserId, UserAgent, IpAddress FROM [QuickNavigationTiles].[dbo].[UserDevices] (NOLOCK) WHERE UserId = '{userId}' AND UserAgent = '{userAgent}' AND IpAddress = '{ipAddress}'";

                return await conn.QuerySingleOrDefaultAsync<DeviceInfoDto>(query, commandTimeout: 30, commandType: CommandType.Text);
            }
        }

        public async Task<SessionDto?> GetActiveSession(Guid userId, Guid deviceId)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                string query = @$"SELECT SessionId, UserId, UserDeviceId, CreatedDate, ExpiryDate, Active FROM [QuickNavigationTiles].[dbo].[UserSessions] (NOLOCK) WHERE UserId = '{userId}' AND UserDeviceId = '{deviceId}'";

                return await conn.QuerySingleOrDefaultAsync<SessionDto>(query, commandTimeout: 30, commandType: CommandType.Text);
            }
        }

        public async Task<SessionDto?> GetSessionById(Guid sessionId)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                string query = @$"SELECT SessionId, UserId, UserDeviceId, CreationDate, ExpiryDate, Active FROM [QuickNavigationTiles].[dbo].[UserSessions] (NOLOCK) WHERE SessionId = '{sessionId}'";

                return await conn.QuerySingleOrDefaultAsync<SessionDto>(query, commandTimeout: 30, commandType: CommandType.Text);
            }
        }

        public async Task<bool> InvalidateAllUserSessionsForDevice(Guid userId, Guid userDeviceId)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("UserId", userId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("UserDeviceId", userDeviceId, DbType.Guid, ParameterDirection.Input);

                await conn.ExecuteAsync("[QuickNavigationTiles].[dbo].[usp_InvalidateAllUserSessionsForDevice]", dynamicParameters, commandTimeout: 30, commandType: CommandType.StoredProcedure);
            }

            return true;
        }

        public async Task<bool> InvalidateUserSession(Guid userId, Guid userDeviceId, Guid sessionId)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("UserId", userId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("UserDeviceId", userDeviceId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("SessionId", sessionId, DbType.Guid, ParameterDirection.Input);

                await conn.ExecuteAsync("[QuickNavigationTiles].[dbo].[usp_InvalidateUserSession]", dynamicParameters, commandTimeout: 30, commandType: CommandType.StoredProcedure);
            }

            return true;
        }

        public async Task<bool> InsertSession(SessionInsertRequest sessionInsertRequest)
        {
            using (IDbConnection conn = _databaseConnectionFactory.GetConnection())
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("SessionId", sessionInsertRequest.SessionId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("UserId", sessionInsertRequest.UserId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("UserDeviceId", sessionInsertRequest.UserDeviceId, DbType.Guid, ParameterDirection.Input);
                dynamicParameters.Add("CreationDate", sessionInsertRequest.CreationDate, DbType.DateTime, ParameterDirection.Input);
                dynamicParameters.Add("ExpiryDate", sessionInsertRequest.ExpiryDate, DbType.DateTime, ParameterDirection.Input);
                dynamicParameters.Add("Active", true, DbType.Boolean, ParameterDirection.Input);

                await conn.ExecuteAsync("[QuickNavigationTiles].[dbo].[usp_InsertSession]", dynamicParameters, commandTimeout: 30, commandType: CommandType.StoredProcedure);
            }

            return true;
        }
    }
}
