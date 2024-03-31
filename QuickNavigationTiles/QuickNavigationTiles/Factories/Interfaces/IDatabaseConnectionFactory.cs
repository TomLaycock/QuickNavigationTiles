using System.Data;

namespace QuickNavigationTiles.Factories.Interfaces
{
    public interface IDatabaseConnectionFactory
    {
        IDbConnection GetConnection();
    }
}
