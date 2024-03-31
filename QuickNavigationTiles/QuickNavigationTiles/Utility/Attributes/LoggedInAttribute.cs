using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using QuickNavigationTiles.Controllers;
using QuickNavigationTiles.Models.Device;
using QuickNavigationTiles.Models.Session;
using QuickNavigationTiles.Services.Interfaces;

namespace QuickNavigationTiles.Utility.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
    public class LoggedInAttribute : Attribute, IAsyncActionFilter
    {
        public LoggedInAttribute() { }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            ControllerBaseWrapper controller = (ControllerBaseWrapper)context.Controller;

            if (controller.CurrentUser != null)
            {
                await next();
                return;
            }

            try
            {
                IUserService _userService = context.HttpContext.RequestServices.GetService<IUserService>();

                if (context.HttpContext.Request.Cookies.TryGetValue("qnt_session_token", out string? sessionTokenString))
                {
                    if (sessionTokenString != null && Guid.TryParse(sessionTokenString, out Guid sessionToken))
                    {
                        SessionDto? sessionDto = await _userService.GetSessionById(sessionToken);

                        if (sessionDto != null)
                        {
                            DeviceInfoDto? deviceInfoDto = await _userService.GetOrInsertUserDeviceInfo(sessionDto.UserId, context.HttpContext.Request.Headers.UserAgent, context.HttpContext.Connection.RemoteIpAddress.ToString());

                            if (deviceInfoDto != null)
                            {
                                if (sessionDto.UserDeviceId == deviceInfoDto.UserDeviceId)
                                {
                                    controller.CurrentUser = await _userService.GetUser(sessionDto.UserId);
                                    controller.SessionInfo = sessionDto;
                                    controller.DeviceInfo = deviceInfoDto;

                                    await next();
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }

            context.Result = new StatusCodeResult(403);
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
