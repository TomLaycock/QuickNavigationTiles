namespace QuickNavigationTiles.Models.Device
{
    public class DeviceInfoDto
    {
        public Guid UserDeviceId { get; set; }
        public Guid UserId { get; set; }
        public string UserAgent { get; set; }
        public string IpAddress { get; set; }
    }
}
