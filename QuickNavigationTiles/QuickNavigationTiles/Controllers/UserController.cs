using Microsoft.AspNetCore.Mvc;
using QuickNavigationTiles.Models.Device;
using QuickNavigationTiles.Models.Login;
using QuickNavigationTiles.Models.Registration;
using QuickNavigationTiles.Models.Session;
using QuickNavigationTiles.Services.Interfaces;
using QuickNavigationTiles.Utility.Attributes;
using QuickNavigationTiles.Utility.Password;
using LoginRequest = QuickNavigationTiles.Models.Login.LoginRequest;

namespace QuickNavigationTiles.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBaseWrapper
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(RegistrationInputs registrationRequest)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    (bool success, Guid userId) result = await _userService.RegisterUser(registrationRequest);

                    if (result.success)
                    {
                        await _userService.InsertDevice(result.userId, HttpContext.Request.Headers.UserAgent, HttpContext.Connection.RemoteIpAddress.ToString());

                        return await Login(new LoginRequest() { LoginCredential = registrationRequest.Username, Password = registrationRequest.Password });
                    }
                }
            }
            catch (Exception ex) { }

            return BadRequest();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    LoginDto loginDto = await _userService.GetUserLoginInformation(loginRequest.LoginCredential);

                    string passwordHash = HashGenerator.Compute(loginRequest.Password, loginDto.Salt);

                    if (passwordHash == loginDto.Password)
                    {
                        DeviceInfoDto? deviceInfoDto = await _userService.GetOrInsertUserDeviceInfo(loginDto.UserId, HttpContext.Request.Headers.UserAgent, HttpContext.Connection.RemoteIpAddress.ToString());

                        if (deviceInfoDto != null)
                        {
                            await _userService.InvalidateAllUserSessionsForDevice(loginDto.UserId, deviceInfoDto.UserDeviceId);

                            SessionDto? sessionInfo = await _userService.InsertSession(loginDto.UserId, deviceInfoDto.UserDeviceId);

                            if (sessionInfo != null)
                            {
                                CookieOptions options = new CookieOptions();
                                options.Expires = sessionInfo.ExpiryDate;

                                Response.Cookies.Append("qnt_session_token", sessionInfo.SessionId.ToString(), options);

                                return Ok();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return BadRequest();
        }

        [LoggedIn]
        [HttpPost("[action]")]
        public async Task<IActionResult> Logout()
        {
            if (ModelState.IsValid && CurrentUser != null && DeviceInfo != null)
            {
                try
                {
                    await _userService.InvalidateAllUserSessionsForDevice(CurrentUser.UserId, DeviceInfo.UserDeviceId);

                    Response.Cookies.Delete("qnt_session_token");

                    return Ok();
                }
                catch (Exception ex)
                {

                }
            }

            return BadRequest();
        }

        // Examples for checking if a user is logged into their account
        #region check_logged_in_examples

        [HttpGet("[action]")]
        private async Task<IActionResult> EXAMPLE_CheckLoggedIn()
        {
            try
            {
                if (Request.Cookies.TryGetValue("qnt_session_token", out string? sessionTokenString))
                {
                    if (sessionTokenString != null && Guid.TryParse(sessionTokenString, out Guid sessionToken))
                    {
                        SessionDto? sessionDto = await _userService.GetSessionById(sessionToken);

                        if (sessionDto != null)
                        {
                            DeviceInfoDto? deviceInfoDto = await _userService.GetOrInsertUserDeviceInfo(sessionDto.UserId, HttpContext.Request.Headers.UserAgent, HttpContext.Connection.RemoteIpAddress.ToString());

                            if (deviceInfoDto != null)
                            {
                                if (sessionDto.UserDeviceId == deviceInfoDto.UserDeviceId)
                                {
                                    return Ok();
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return BadRequest();
        }

        [LoggedIn]
        [HttpGet("[action]")]
        private async Task<IActionResult> EXAMPLE_CheckLoggedIn_Attribute()
        {
            return Ok();
        }

        #endregion
    }
}
