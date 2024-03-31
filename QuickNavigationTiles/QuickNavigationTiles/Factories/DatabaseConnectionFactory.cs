using Microsoft.Data.SqlClient;
using QuickNavigationTiles.Factories.Interfaces;
using System.Data;

namespace QuickNavigationTiles.Factories
{
    public class DatabaseConnectionFactory : IDatabaseConnectionFactory
    {
        private static string connectionString = "Data Source=localhost,1433;Initial Catalog=QuickNavigationTiles;User id=SA;Password=local*sql*123;TrustServerCertificate=true";

        public IDbConnection GetConnection()
        {
            return new SqlConnection(connectionString);
        }
    }
}
