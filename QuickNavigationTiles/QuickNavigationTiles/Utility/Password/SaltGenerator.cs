namespace QuickNavigationTiles.Utility.Password
{
    public static class SaltGenerator
    {
        public static string Generate(int length = 8)
        {
            Random random = new Random();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            char[] randomChars = new char[length];
            for (int i = 0; i < randomChars.Length; i++)
            {
                randomChars[i] = chars[random.Next(chars.Length)];
            }

            return new string(randomChars);
        }
    }
}
