using QuickNavigationTiles.Models.ValueTypes;

namespace QuickNavigationTiles.Models.QuickNavProfile
{
    public class QuickNavProfile
    {
        public ProfileId? ProfileId { get; set; }
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public UserId? CreatorId { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsPublic { get; set; }
        public List<QuickNavSection> Sections { get; set; } = new List<QuickNavSection>();
    }
}
