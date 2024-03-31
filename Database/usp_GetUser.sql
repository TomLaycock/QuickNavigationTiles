DROP PROCEDURE IF EXISTS [dbo].[usp_GetUser]

CREATE PROCEDURE [dbo].[usp_GetUser]
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        UserId,
        Username,
        RegistrationDate
    FROM [QuickNavigationTiles].[dbo].[Users] (NOLOCK)
    WHERE UserId = @UserId
END