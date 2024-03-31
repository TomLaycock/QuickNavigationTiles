namespace QuickNavigationTiles.Models.User
{
    public class UserDto
    {
        public Guid UserId { get; set; }
        public string? Username { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
