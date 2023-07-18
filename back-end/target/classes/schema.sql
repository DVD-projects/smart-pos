CREATE TABLE IF NOT EXISTS customer(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(50) NOT NULL ,
    address VARCHAR(100) NOT NULL ,
    contact_number VARCHAR(15) NOT NULL,
    CONSTRAINT uk_contact UNIQUE KEY (contact_number)
);