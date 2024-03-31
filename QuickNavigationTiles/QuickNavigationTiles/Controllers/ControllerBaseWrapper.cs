using Microsoft.AspNetCore.Mvc;
using QuickNavigationTiles.Models.Device;
using QuickNavigationTiles.Models.Session;
using QuickNavigationTiles.Models.User;

namespace QuickNavigationTiles.Controllers
{
    public class ControllerBaseWrapper : ControllerBase
    {
        public UserDto? CurrentUser { get; set; } = null;
        public SessionDto? SessionInfo { get; set; } = null;
        public DeviceInfoDto? DeviceInfo { get; set; } = null;
    }
}
