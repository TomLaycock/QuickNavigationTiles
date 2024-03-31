namespace QuickNavigationTiles.Models.Registration
{
    public class RegistrationRequest
    {
        public Guid UserId { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Salt { get; set; }
    }
}
