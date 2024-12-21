DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_ProfileLinks]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_ProfileGroups]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_ProfileSubSections]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_ProfileSections]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_Profiles]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_Links]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_SubSectionTypeConfig]

DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_UserSessions]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_UserSessionRegenTokens]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_UserDevices]
DROP TABLE IF EXISTS [QuickNavigationTiles].[dbo].[t_Users]


CREATE TABLE [QuickNavigationTiles].[dbo].[t_Users] (
    UserId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    Username NVARCHAR(100) NOT NULL,
    Password NVARCHAR(100) NOT NULL,
    Salt NVARCHAR(100) NOT NULL,
    RegistrationDate DATETIME NOT NULL
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_UserDevices] (
    UserDeviceId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    UserAgent NVARCHAR(100) NOT NULL,
    IpAddress NVARCHAR(100) NOT NULL,
    FOREIGN KEY (UserId) REFERENCES [QuickNavigationTiles].[dbo].[t_Users](UserId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_UserSessions] (
    SessionId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    UserDeviceId UNIQUEIDENTIFIER NOT NULL,
    CreationDate DATETIME NOT NULL,
    ExpiryDate DATETIME NOT NULL,
    Active BIT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES [QuickNavigationTiles].[dbo].[t_Users](UserId),
    FOREIGN KEY (UserDeviceId) REFERENCES [QuickNavigationTiles].[dbo].[t_UserDevices](UserDeviceId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_UserSessionRegenTokens] (
    UserSessionRegenTokenId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    UserDeviceId UNIQUEIDENTIFIER NOT NULL,
    CreationDate DATETIME NOT NULL,
    ExpiryDate DATETIME NOT NULL,
    Activated BIT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES [QuickNavigationTiles].[dbo].[t_Users](UserId),
    FOREIGN KEY (UserDeviceId) REFERENCES [QuickNavigationTiles].[dbo].[t_UserDevices](UserDeviceId)
)





CREATE TABLE [QuickNavigationTiles].[dbo].[t_SubSectionTypeConfig] (
    SubSectionTypeId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_Profiles] (
    ProfileId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    ImageUrl NVARCHAR(400),
    CreatorId UNIQUEIDENTIFIER NOT NULL,
    CreatedDate DATETIME NOT NULL,
    IsPublic BIT NOT NULL,
    FOREIGN KEY (CreatorId) REFERENCES [QuickNavigationTiles].[dbo].[t_Users](UserId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_ProfileSections] (
    SectionId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    ProfileId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    IndexOrder INT NOT NULL,
    FOREIGN KEY (ProfileId) REFERENCES [QuickNavigationTiles].[dbo].[t_Profiles](ProfileId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_ProfileSubSections] (
    SubSectionId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    ProfileId UNIQUEIDENTIFIER NOT NULL,
    SectionId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(100),
    SubSectionTypeId INT NOT NULL,
    IndexOrder INT NOT NULL,
    FOREIGN KEY (ProfileId) REFERENCES [QuickNavigationTiles].[dbo].[t_Profiles](ProfileId),
    FOREIGN KEY (SectionId) REFERENCES [QuickNavigationTiles].[dbo].[t_ProfileSections](SectionId),
    FOREIGN KEY (SubSectionTypeId) REFERENCES [QuickNavigationTiles].[dbo].[t_SubSectionTypeConfig](SubSectionTypeId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_ProfileGroups] (
    GroupId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    ProfileId UNIQUEIDENTIFIER NOT NULL,
    SubSectionId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(100),
    IndexOrder INT NOT NULL,
    FOREIGN KEY (ProfileId) REFERENCES [QuickNavigationTiles].[dbo].[t_Profiles](ProfileId),
    FOREIGN KEY (SubSectionId) REFERENCES [QuickNavigationTiles].[dbo].[t_ProfileSubSections](SubSectionId)
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_Links] (
    LinkId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    Name NVARCHAR(100),
    Url NVARCHAR(400),
    ImageUrl NVARCHAR(400),
)

CREATE TABLE [QuickNavigationTiles].[dbo].[t_ProfileLinks] (
    ProfileLinkId UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    ProfileId UNIQUEIDENTIFIER NOT NULL,
    GroupId UNIQUEIDENTIFIER NOT NULL,
    LinkId UNIQUEIDENTIFIER NOT NULL,
    IndexOrder INT NOT NULL,
    FOREIGN KEY (ProfileId) REFERENCES [QuickNavigationTiles].[dbo].[t_Profiles](ProfileId),
    FOREIGN KEY (GroupId) REFERENCES [QuickNavigationTiles].[dbo].[t_ProfileGroups](GroupId),
    FOREIGN KEY (LinkId) REFERENCES [QuickNavigationTiles].[dbo].[t_Links](LinkId)
)