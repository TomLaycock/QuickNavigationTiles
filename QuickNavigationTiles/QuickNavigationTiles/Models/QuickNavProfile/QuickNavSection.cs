using QuickNavigationTiles.Models.ValueTypes;

namespace QuickNavigationTiles.Models.QuickNavProfile
{
    public class QuickNavSection
    {
        public SectionId? SectionId { get; set; }
        public ProfileId? ProfileId { get; set; }
        public string? Name { get; set; }
        public int IndexOrder { get; set; }
        public List<QuickNavSubSection> SubSections { get; set; } = new List<QuickNavSubSection>();
    }
}
