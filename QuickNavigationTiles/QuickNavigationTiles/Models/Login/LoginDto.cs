﻿namespace QuickNavigationTiles.Models.Login
{
    public class LoginDto
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
    }
}
