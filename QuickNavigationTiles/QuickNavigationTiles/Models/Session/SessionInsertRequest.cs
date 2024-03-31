namespace QuickNavigationTiles.Models.Session
{
    public class SessionInsertRequest
    {
        public Guid SessionId { get; set; }
        public Guid UserId { get; set; }
        public Guid UserDeviceId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool Active { get; set; }
    }
}
