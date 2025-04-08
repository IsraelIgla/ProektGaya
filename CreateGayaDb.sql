--1.
CREATE DATABASE GayaDB;

--2.

USE GayaDB;

CREATE TABLE Operations (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL UNIQUE,
    Script NVARCHAR(300) NOT NULL
);

INSERT INTO Operations (Name, Script)
VALUES ('Add', 'x+y'), ('Subtract', 'x-y'), ('Multiply', 'x*y'), ('Divide', 'x/y');

CREATE TABLE OperationsHystory (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Script NVARCHAR(300) NOT NULL,
    Field1 NVARCHAR(50) NOT NULL,
    Field2 NVARCHAR(50) NOT NULL,
    Result NVARCHAR(50) NOT NULL,
    Date datetime
);