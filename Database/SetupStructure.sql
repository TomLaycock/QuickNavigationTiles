DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[ProfileLinks]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[ProfileGroups]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[ProfileSubSections]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[ProfileSections]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[Profiles]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[Links]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[SubSectionTypeConfig]

DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[UserSessions]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[UserSessionRegenTokens]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[UserDevices]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[Users]


CREATE TABLE [QuickNavigationTiles].[dbo].[Users] (
    UserId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    Username NVARCHAR(100) NOT NULL,
    Password NVARCHAR(100) NOT NULL,
    Salt NVARCHAR(100) NOT NULL,
    RegistrationDate DATETIME NOT NULL
)

CREATE TABLE [QuickNavigationTiles].[dbo].[UserDevices] (
    UserDeviceId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    UserAgent NVARCHAR(100) NOT NULL,
    IpAddress NVARCHAR(100) NOT NULL,
    FOREIGN KEY (UserId) REFERENCES [QuickNavigationTiles].[dbo].[Users](UserId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[UserSessions] (
    SessionId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    UserDeviceId UNIQUEIDENTIFIER NOT NULL,
    CreationDate DATETIME NOT NULL,
    ExpiryDate DATETIME NOT NULL,
    Active BIT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES [QuickNavigationTiles].[dbo].[Users](UserId),
    FOREIGN KEY (UserDeviceId) REFERENCES [QuickNavigationTiles].[dbo].[UserDevices](UserDeviceId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[UserSessionRegenTokens] (
    UserSessionRegenTokenId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    UserDeviceId UNIQUEIDENTIFIER NOT NULL,
    CreationDate DATETIME NOT NULL,
    ExpiryDate DATETIME NOT NULL,
    Activated BIT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES [QuickNavigationTiles].[dbo].[Users](UserId),
    FOREIGN KEY (UserDeviceId) REFERENCES [QuickNavigationTiles].[dbo].[UserDevices](UserDeviceId)
)


CREATE TABLE [QuickNavigationTiles].[dbo].[SubSectionTypeConfig] (
    SubSectionTypeId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
)

CREATE TABLE [QuickNavigationTiles].[dbo].[Profiles] (
    ProfileId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    CreatorId UNIQUEIDENTIFIER NOT NULL,
    CreatedDate DATETIME NOT NULL,
    IsPublic BIT NOT NULL,
    FOREIGN KEY (CreatorId) REFERENCES [QuickNavigationTiles].[dbo].[Users](UserId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[ProfileSections] (
    SectionId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    ProfileId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    IndexOrder INT NOT NULL,
    FOREIGN KEY (ProfileId) REFERENCES [QuickNavigationTiles].[dbo].[Profiles](ProfileId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[ProfileSubSections] (
    SubSectionId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    ProfileId UNIQUEIDENTIFIER NOT NULL,
    SectionId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(100),
    SubSectionTypeId INT NOT NULL,
    IndexOrder INT NOT NULL,
    FOREIGN KEY (ProfileId) REFERENCES [QuickNavigationTiles].[dbo].[Profiles](ProfileId),
    FOREIGN KEY (SectionId) REFERENCES [QuickNavigationTiles].[dbo].[ProfileSections](SectionId),
    FOREIGN KEY (SubSectionTypeId) REFERENCES [QuickNavigationTiles].[dbo].[SubSectionTypeConfig](SubSectionTypeId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[ProfileGroups] (
    GroupId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    ProfileId UNIQUEIDENTIFIER NOT NULL,
    SubSectionId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(100),
    IndexOrder INT NOT NULL,
    FOREIGN KEY (ProfileId) REFERENCES [QuickNavigationTiles].[dbo].[Profiles](ProfileId),
    FOREIGN KEY (SubSectionId) REFERENCES [QuickNavigationTiles].[dbo].[ProfileSubSections](SubSectionId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[Links] (
    LinkId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    Name NVARCHAR(100),
    Url NVARCHAR(400)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[ProfileLinks] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProfileId UNIQUEIDENTIFIER NOT NULL,
    GroupId UNIQUEIDENTIFIER NOT NULL,
    LinkId UNIQUEIDENTIFIER NOT NULL,
    IndexOrder INT NOT NULL,
    FOREIGN KEY (ProfileId) REFERENCES [QuickNavigationTiles].[dbo].[Profiles](ProfileId),
    FOREIGN KEY (GroupId) REFERENCES [QuickNavigationTiles].[dbo].[ProfileGroups](GroupId),
    FOREIGN KEY (LinkId) REFERENCES [QuickNavigationTiles].[dbo].[Links](LinkId)
)