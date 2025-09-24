ALTER TABLE services ADD COLUMN price DECIMAL(10,2);

-- Update existing services with sample prices
UPDATE services SET price = 1500.00 WHERE name = 'Wedding Photography';
UPDATE services SET price = 800.00 WHERE name = 'Event Photography';
UPDATE services SET price = 300.00 WHERE name = 'Studio Sessions';