DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(4) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT  NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(20) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
   	("Slide Spray", "Brass Accessories", 1.99, 5),
   ("Trombone Slide Grease", "Brass Accessories", 7.99, 28),
    ("Piston Valve Lubricant", "Brass Accessories", 9.99, 25),
    ("Key and Rotor Oil", "Brass Accessories", 6.50, 13),
    ("Slide Grease", "Brass Accessories", 2.60, 30),
    ("Sshhmute Flugel Horn Practice Mute", "Mutes", 90.50, 3),
    ("PopStart French Horn Mute Non-Transposing", "Mutes", 260.00, 25),
    ("Straight Mute for Trumpet/Cornet", "Mutes", 60.00, 75),
    ("Plunger Mute for Trombones", "Mutes", 80.00, 2),
    ("Harmon Trumpet Wow Wow Mute", "Mutes", 58.99, 22),
    ("Harmon Trombone Wow Wow Mute", "Mutes", 93.50, 4),
    ("Carlton Trumpet Mouthpiece 7C", "Mouthpieces", 32.99, 29),
    ("carlton Trombone Mouthpiece 12C", "Mouthpieces", 39.99, 28),
    ("Carlton French Horn Mouthpiece 11", "Mouthpieces", 32.99, 30),
    ("Bach Tuba Mouthpiece 18", "Mouthpieces", 110.00, 5),
    ("Bach Cornet Mouthpiece 3C", "Mouthpieces", 69.99, 6),
    ("MTS Products ABS case for large Tuba", "Cases", 999.99, 1),
    ("Protect Trumpet Contoured Pro Pac Case", "Cases", 170.00, 18),
    ("Marcus Bonna Cases French Horn Flight Case", "Cases", 799.00, 1),
    ("Bam Cases Classic Trombone Case", "Cases", 360.00, 2);

    CREATE TABLE departments (
    department_id INT(2) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    overhead_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_id)
);
 
INSERT INTO departments(department_name, overhead_costs)
VALUES("Brass Accessories", 150000),
("Mutes", 100000),
("Mouthpieces", 250000),
("Cases", 1000000);

ALTER TABLE products ADD COLUMN product_sales DOUBLE(10,2) DEFAULT 0.00 AFTER stock_quantity;

SELECT * FROM products;
SELECT * FROM departments;