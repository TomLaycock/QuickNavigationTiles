DROP PROCEDURE IF EXISTS [dbo].[usp_InsertSession]

CREATE PROCEDURE [dbo].[usp_InsertSession]
    @SessionId UNIQUEIDENTIFIER,
    @UserId UNIQUEIDENTIFIER,
    @UserDeviceId UNIQUEIDENTIFIER,
    @CreationDate DATETIME,
    @ExpiryDate DATETIME,
    @Active BIT
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO [QuickNavigationTiles].[dbo].[UserSessions] VALUES (@SessionId, @UserId, @UserDeviceId, @CreationDate, @ExpiryDate, @Active)
END