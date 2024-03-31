DROP PROCEDURE IF EXISTS [dbo].[usp_InvalidateAllUserSessionsForDevice]

CREATE PROCEDURE [dbo].[usp_InvalidateAllUserSessionsForDevice]
    @UserId UNIQUEIDENTIFIER,
    @UserDeviceId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [QuickNavigationTiles].[dbo].[UserSessions] SET Active = 0 WHERE UserId = @UserId AND UserDeviceId = @UserDeviceId
END