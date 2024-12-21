USE [master]

CREATE TABLE [BackupManagement].[dbo].[Backups] (
    BackupID INT IDENTITY(1,1) PRIMARY KEY,
    BackupData NVARCHAR(100)
)