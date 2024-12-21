using QuickNavigationTiles.Models.ValueTypes;

namespace QuickNavigationTiles.Models.QuickNavProfile
{
    public class QuickNavSubSection
    {
        public SubSectionId? SubSectionId { get; set; }
        public ProfileId? ProfileId { get; set; }
        public SectionId? SectionId { get; set; }
        public string? Name { get; set; }
        public int SubSectionTypeId { get; set; }
        public int IndexOrder { get; set; }
        public List<QuickNavGroup> Groups { get; set; } = new List<QuickNavGroup>();
    }
}
