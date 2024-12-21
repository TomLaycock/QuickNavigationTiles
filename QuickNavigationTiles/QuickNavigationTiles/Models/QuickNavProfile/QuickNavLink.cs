using QuickNavigationTiles.Models.ValueTypes;

namespace QuickNavigationTiles.Models.QuickNavProfile
{
    public class QuickNavLink
    {
        public ProfileLinkId? LinkId { get; set; }
        public string? Name { get; set; }
        public string? Url { get; set; }
        public string? ImageUrl { get; set; }
    }
}
