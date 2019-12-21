drop database if exists litemall;
-- MySQL 5.7以上版本支持此语法 drop user if exists 'litemall'@'localhost';
drop user 'litemall'@'localhost';
-- 支持emoji：需要mysql数据库参数： character_set_server=utf8mb4
create database litemall default character set utf8mb4 collate utf8mb4_unicode_ci;
use litemall;
create user 'litemall'@'localhost' identified by '5418none';
grant all privileges on litemall.* to 'litemall'@'localhost';
flush privileges;
