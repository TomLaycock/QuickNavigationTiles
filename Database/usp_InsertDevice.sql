DROP PROCEDURE IF EXISTS [dbo].[usp_InsertDevice]

CREATE PROCEDURE [dbo].[usp_InsertDevice]
    @UserDeviceId UNIQUEIDENTIFIER,
    @UserId UNIQUEIDENTIFIER,
    @UserAgent NVARCHAR(100),
    @IpAddress NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [QuickNavigationTiles].[dbo].[UserDevices] VALUES (@UserDeviceId, @UserId, @UserAgent, @IpAddress)
END