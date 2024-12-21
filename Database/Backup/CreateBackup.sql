USE [master]

DECLARE @FileName NVARCHAR(MAX) = '/localdockersqlserver_backup/Backup_' + REPLACE(convert(nvarchar(max), GETUTCDATE(), 101), '/', '-') + '_' + REPLACE(CONVERT(nvarchar(50), GETDATE(), 108), ':', '-') + '.bak'
BACKUP DATABASE [QuickNavigationTiles] TO DISK = @FileName WITH FORMAT
INSERT INTO [BackupManagement].[dbo].[Backups] VALUES (@FileName)