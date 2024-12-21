using QuickNavigationTiles.Models.ValueTypes;

namespace QuickNavigationTiles.Models.QuickNavProfile
{
    public class QuickNavGroup
    {
        public GroupId? GroupId { get; set; }
        public ProfileId? ProfileId { get; set; }
        public SubSectionId? SubSectionId { get; set; }
        public string? Name { get; set; }
        public int IndexOrder { get; set; }
        public List<QuickNavLink> Links { get; set; } = new List<QuickNavLink>();
    }
}
