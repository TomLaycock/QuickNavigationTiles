DROP PROCEDURE IF EXISTS [dbo].[usp_RegisterUser]

CREATE PROCEDURE [dbo].[usp_RegisterUser]
    @UserId UNIQUEIDENTIFIER,
    @Username NVARCHAR(100),
    @Password NVARCHAR(100),
    @Salt NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [QuickNavigationTiles].[dbo].[Users] VALUES (@UserId, @Username, @Password, @Salt, GETUTCDATE())
END