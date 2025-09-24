const db = require("./database/db");

// Add price column if it doesn't exist
const addPriceColumn = () => {
  const alterQuery = "ALTER TABLE services ADD COLUMN price DECIMAL(10,2)";
  
  db.query(alterQuery, (err, result) => {
    if (err && !err.message.includes("Duplicate column")) {
      console.error("Error adding price column:", err);
      return;
    }
    console.log("Price column added successfully");
    
    // Update existing services with prices
    updatePrices();
  });
};

const updatePrices = () => {
  const updates = [
    { name: 'Wedding Photography', price: 1500.00 },
    { name: 'Event Photography', price: 800.00 },
    { name: 'Studio Sessions', price: 300.00 }
  ];
  
  updates.forEach(service => {
    const updateQuery = "UPDATE services SET price = ? WHERE name = ?";
    db.query(updateQuery, [service.price, service.name], (err, result) => {
      if (err) {
        console.error(`Error updating ${service.name}:`, err);
      } else {
        console.log(`Updated ${service.name} with price $${service.price}`);
      }
    });
  });
  
  setTimeout(() => {
    console.log("All prices updated. Exiting...");
    process.exit(0);
  }, 2000);
};

addPriceColumn();