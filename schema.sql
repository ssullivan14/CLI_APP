DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,

product_name VARCHAR(100),

department_name VARCHAR(100),

price DECIMAL (10,2) NOT NULL,

stock_quantity INT default 0,

PRIMARY KEY (item_id)
);

