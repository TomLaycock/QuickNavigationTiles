DROP PROCEDURE IF EXISTS [dbo].[usp_InvalidateUserSession]

CREATE PROCEDURE [dbo].[usp_InvalidateUserSession]
    @UserId UNIQUEIDENTIFIER,
    @UserDeviceId UNIQUEIDENTIFIER,
    @SessionId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [QuickNavigationTiles].[dbo].[UserSessions] SET Active = 0 WHERE UserId = @UserId AND UserDeviceId = @UserDeviceId AND SessionId = @SessionId
END