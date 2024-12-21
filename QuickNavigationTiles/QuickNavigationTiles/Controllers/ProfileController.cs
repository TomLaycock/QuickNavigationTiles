using Microsoft.AspNetCore.Mvc;
using QuickNavigationTiles.Models.QuickNavProfile;
using QuickNavigationTiles.Models.ValueTypes;

namespace QuickNavigationTiles.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBaseWrapper
    {
        private readonly ILogger<ProfileController> _logger;

        public ProfileController(ILogger<ProfileController> logger)
        {
            _logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get([FromQuery] ProfileId? profileId)
        {
            QuickNavProfile quickNavProfile = new QuickNavProfile()
            {
                ProfileId = new ProfileId(Guid.NewGuid()),
                Name = "Anime",
                ImageUrl = "test",
                CreatorId = new UserId(Guid.NewGuid()),
                CreationDate = DateTime.Now,
                IsPublic = true
            };

            return Ok(quickNavProfile);
        }
    }
}
