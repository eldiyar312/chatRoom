--
-- File generated with SQLiteStudio v3.4.4 on вс апр. 30 05:11:02 2023
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: messages
CREATE TABLE IF NOT EXISTS messages (_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, user_name TEXT (255), message TEXT NOT NULL, room_id TEXT (36) REFERENCES rooms (_id) NOT NULL);

-- Table: rooms
CREATE TABLE IF NOT EXISTS rooms (_id TEXT (36) NOT NULL PRIMARY KEY UNIQUE, name TEXT (255));

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
