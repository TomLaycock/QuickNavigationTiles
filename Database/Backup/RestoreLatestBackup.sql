USE [master]

DECLARE @FileName NVARCHAR(MAX) = (SELECT TOP(1) BackupData FROM [BackupManagement].[dbo].[Backups] (NOLOCK) ORDER BY BackupID DESC)
RESTORE DATABASE [QuickNavigationTiles] FROM DISK = @FileName WITH REPLACE